#!/usr/bin/env python3
import json, subprocess, sys, os, tempfile

SFX_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "sfx")
SFX_ELEVEN = os.path.join(os.path.dirname(__file__), "sfx_eleven.py")

def ensure_sfx(name, duration=0.5):
    path = os.path.join(SFX_DIR, f"{name}.mp3")
    if not os.path.exists(path):
        r = subprocess.run(
            ["python3", SFX_ELEVEN, "--preset", name, "--duration", str(duration)],
            capture_output=True, text=True, timeout=30
        )
        if r.returncode != 0:
            raise RuntimeError(f"Falha ao gerar SFX '{name}': {r.stderr}")
        gen_path = r.stdout.strip().split("\n")[-1]
        subprocess.run(["cp", gen_path, path], check=True)
        print(f"  SFX gerado sob demanda: {name}")
    return path

def build_events(timeline, transcript):
    segs = timeline["timeline"]
    words = transcript["words"]
    events = []

    for i in range(len(segs) - 1):
        cut_t = segs[i]["new_end"]
        gap = segs[i + 1]["new_start"] - cut_t

        if gap < 0.3:
            sound = "click_soft"
            vol = 0.3
        elif gap < 0.8:
            sound = "whoosh"
            vol = 0.5
        else:
            sound = "whoosh_deep"
            vol = 0.6

        events.append((cut_t, sound, vol, "cut"))

    for w in words:
        idx = words.index(w)
        if idx > 0:
            prev_end = words[idx - 1]["end"]
            gap = w["start"] - prev_end
            text = w["word"].strip(".,!?;:")
            if text and text[0].isupper() and len(text) > 2 and gap > 0.3:
                events.append((w["start"] - 0.05, "pop", 0.25, "emphasis"))

    return events

def deduplicate(events, min_gap=0.15):
    if not events:
        return []
    sorted_events = sorted(events, key=lambda e: e[0])
    deduped = [sorted_events[0]]
    for e in sorted_events[1:]:
        if e[0] - deduped[-1][0] >= min_gap:
            deduped.append(e)
    return deduped

def main():
    video = sys.argv[1]
    out = sys.argv[2]

    timeline = json.load(open("timeline.json"))
    transcript = json.load(open("transcript_remapped.json"))

    raw_events = build_events(timeline, transcript)
    events = deduplicate(raw_events)
    n_cuts = sum(1 for e in events if e[3] == "cut")
    n_pops = sum(1 for e in events if e[3] == "emphasis")

    if not events:
        subprocess.run(["cp", video, out])
        print("Nenhum evento SFX detectado")
        return

    extra_inputs = []
    filters = []
    for i, (t, sound, vol, etype) in enumerate(events):
        sfx_path = ensure_sfx(sound, 0.5)
        extra_inputs += ["-i", sfx_path]
        delay_ms = int(max(0, t) * 1000)
        filters.append(f"[{i+1}:a]adelay={delay_ms}|{delay_ms},volume={vol}[s{i}]")

    mix_inputs = "".join(f"[s{i}]" for i in range(len(events)))
    filter_complex = f"[0:a]{mix_inputs}amix=inputs={len(events)+1}:normalize=0[aout]"

    print(f"{n_cuts} whoosh (cortes) + {n_pops} pop (ênfase) -> {out}")

    cmd = ["ffmpeg", "-y", "-i", video] + extra_inputs + [
        "-filter_complex", filter_complex,
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        out
    ]
    subprocess.run(cmd, check=True)

if __name__ == "__main__":
    main()
