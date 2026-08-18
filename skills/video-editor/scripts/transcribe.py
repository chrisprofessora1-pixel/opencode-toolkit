#!/usr/bin/env python3
import sys, json
import whisper

def main():
    input_path = sys.argv[1]
    model = whisper.load_model("small")
    result = model.transcribe(input_path, word_timestamps=True)

    words = []
    for seg in result["segments"]:
        for w in seg.get("words", []):
            words.append({
                "word": w["word"].strip(),
                "start": w["start"],
                "end": w["end"]
            })

    with open("transcript.json", "w") as f:
        json.dump({"segments": result["segments"], "words": words}, f, indent=2)

    print(f"Transcrição salva: transcript.json ({len(words)} palavras)")

if __name__ == "__main__":
    main()
