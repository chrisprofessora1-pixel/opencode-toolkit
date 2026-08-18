#!/usr/bin/env python3
import sys, json, re

FILLERS = {
    "uh", "um", "uhm", "like", "actually", "basically",
    "tipo", "né", "eh", "entao", "então", "assim", "aham"
}

def normalize(w):
    return re.sub(r"[^\wáéíóúãõâêôç]", "", w.lower())

def merge_cuts(cuts, pad=0.03):
    if not cuts:
        return []
    cuts.sort(key=lambda c: c["start"])
    merged = [cuts[0]]
    for c in cuts[1:]:
        last = merged[-1]
        if c["start"] <= last["end"] + pad:
            last["end"] = max(last["end"], c["end"])
        else:
            merged.append(c)
    return merged

def main():
    with open(sys.argv[1]) as f:
        data = json.load(f)
    words = data["words"]
    cuts = []

    for w in words:
        if normalize(w["word"]) in FILLERS:
            cuts.append({"start": w["start"], "end": w["end"]})

    for i in range(len(words) - 1):
        gap_start, gap_end = words[i]["end"], words[i + 1]["start"]
        if gap_end - gap_start > 0.8:
            cuts.append({"start": gap_start + 0.15, "end": gap_end - 0.05})

    cuts = merge_cuts(cuts)

    with open("cuts.json", "w") as f:
        json.dump(cuts, f, indent=2)

    print(f"{len(cuts)} cortes mesclados -> cuts.json")

if __name__ == "__main__":
    main()
