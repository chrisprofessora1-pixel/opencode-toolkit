#!/usr/bin/env python3
import sys, json

def remap_time(old_t, timeline):
    for seg in timeline:
        if seg["old_start"] <= old_t <= seg["old_end"]:
            return seg["new_start"] + (old_t - seg["old_start"])
    return None

def main():
    transcript_path, timeline_path = sys.argv[1], sys.argv[2]
    transcript = json.load(open(transcript_path))
    timeline = json.load(open(timeline_path))["timeline"]

    remapped = []
    for w in transcript["words"]:
        new_start = remap_time(w["start"], timeline)
        new_end = remap_time(w["end"], timeline)
        if new_start is None or new_end is None:
            continue
        remapped.append({"word": w["word"], "start": new_start, "end": new_end})

    json.dump({"words": remapped}, open("transcript_remapped.json", "w"), indent=2)
    print(f"{len(remapped)} palavras remapeadas -> transcript_remapped.json")

if __name__ == "__main__":
    main()
