#!/usr/bin/env bash
set -e
CMD=$1

if [ "$CMD" = "cut" ]; then
  IN=$2; TIMELINE=$3; OUT=$4

  python3 - "$IN" <<'PY'
import json, subprocess, sys
video = sys.argv[1]
keep = json.load(open("timeline.json"))["keep"]

files = []
for i, (s, e) in enumerate(keep):
    out = f"segment_{i:03d}.mp4"
    subprocess.run([
        "ffmpeg", "-y",
        "-ss", str(s), "-to", str(e), "-i", video,
        "-r", "30", "-vsync", "cfr",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18",
        "-c:a", "aac", "-ar", "48000", "-af", "aresample=async=1",
        out
    ])
    files.append(out)

with open("concat_list.txt", "w") as f:
    for fl in files:
        f.write(f"file '{fl}'\n")
PY

  ffmpeg -y -f concat -safe 0 -i concat_list.txt -c copy "$OUT"

elif [ "$CMD" = "mix" ]; then
  IN=$2; ASS=$3; OUT=$4

  ffmpeg -y -i "$IN" \
    -vf "eq=contrast=1.03:saturation=1.08,ass=$ASS" \
    -c:v libx264 -crf 18 -preset medium -r 30 \
    -c:a aac -af "aresample=async=1" \
    "$OUT"

elif [ "$CMD" = "voiceover" ]; then
  VIDEO=$2; VOICEOVER=$3; OUT=$4

  ffmpeg -y -i "$VIDEO" -i "$VOICEOVER" \
    -c:v copy -map 0:v:0 -map 1:a:0 \
    -c:a aac -b:a 192k -shortest \
    "$OUT"
fi
