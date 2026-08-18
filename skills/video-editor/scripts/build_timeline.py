#!/usr/bin/env python3
import sys, json, subprocess

def get_duration(path):
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", path
    ])
    return float(out.decode().strip())

def main():
    video, cuts_file = sys.argv[1], sys.argv[2]
    cuts = json.load(open(cuts_file))
    dur = get_duration(video)

    keep = []
    last = 0.0
    for c in cuts:
        if c["start"] > last:
            keep.append((last, c["start"]))
        last = max(last, c["end"])
    if last < dur:
        keep.append((last, dur))

    timeline = []
    new_t = 0.0
    for s, e in keep:
        length = e - s
        timeline.append({"old_start": s, "old_end": e, "new_start": new_t, "new_end": new_t + length})
        new_t += length

    json.dump({"keep": keep, "timeline": timeline, "new_duration": new_t},
               open("timeline.json", "w"), indent=2)
    print(f"Timeline gerada: {len(keep)} segmentos, duracao final {new_t:.2f}s")

if __name__ == "__main__":
    main()
