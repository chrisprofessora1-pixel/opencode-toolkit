#!/usr/bin/env python3
import subprocess, sys, json, re, math

def detect_silence(video, noise_dB=-30, min_dur=0.3):
    r = subprocess.run([
        "ffmpeg", "-i", video, "-af",
        f"silencedetect=noise=-{abs(noise_dB)}dB:d={min_dur}",
        "-f", "null", "-"
    ], capture_output=True, text=True)
    starts, ends = [], []
    for line in r.stderr.split("\n"):
        m = re.search(r"silence_start: ([\d.]+)", line)
        if m: starts.append(float(m.group(1)))
        m = re.search(r"silence_end: ([\d.]+)", line)
        if m: ends.append(float(m.group(1)))
    return starts, ends

def main():
    video = sys.argv[1]
    out = sys.argv[2]

    r = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "csv=p=0", video
    ], capture_output=True, text=True)
    total_dur = float(r.stdout.strip())

    starts, ends = detect_silence(video)
    if not starts:
        subprocess.run(["cp", video, out])
        print(f"Sem silêncio detectado (noise > -30dB, min_dur=0.3s)")
        return

    cut_start = 0.0
    cut_end = total_dur

    if starts[0] < 0.5 and ends:
        cut_start = ends[0]
        print(f"  Silêncio inicial: {starts[0]:.2f}s - {ends[0]:.2f}s")

    if ends and starts and total_dur - starts[-1] < 0.5:
        cut_end = starts[-1]
        print(f"  Silêncio final: {starts[-1]:.2f}s - {total_dur:.2f}s")

    subprocess.run([
        "ffmpeg", "-y", "-ss", str(cut_start), "-to", str(cut_end),
        "-i", video,
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-c:a", "aac", "-b:a", "128k",
        "-r", "30",
        out
    ], check=True)

    new_dur = cut_end - cut_start
    print(f"Trim OK: {total_dur:.1f}s -> {new_dur:.1f}s ({out})")

if __name__ == "__main__":
    main()
