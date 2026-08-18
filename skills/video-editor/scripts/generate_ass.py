#!/usr/bin/env python3
import sys, json, re

CONTORNO = "&H00202020"
PRETO = "&H00000000"
BRANCO = "&H00FFFFFF"
AMBAR = "&H007AA2C9"

ASS_HEADER = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Line,Avenir Next Medium,50,&HAAFFFFFF,&H000000FF,{CONTORNO},{PRETO},0,0,0,0,100,100,0,0,1,3,1,2,80,80,260,1
Style: Word,Avenir Next Bold,60,{BRANCO},&H000000FF,{CONTORNO},{PRETO},1,0,0,0,100,100,0,0,1,3,1,2,80,80,260,1
Style: Emp,Avenir Next Bold,66,{AMBAR},&H000000FF,{CONTORNO},{PRETO},1,0,0,0,100,100,0,0,1,3,1,2,80,80,260,1
"""

KEYWORDS = {"importante", "segredo", "nunca", "sempre", "agora",
            "cuidado", "atencao", "erro", "dinheiro", "gratis", "tudo",
            "nada", "mais", "certamente", "absolutamente",
            "fundamental", "essencial", "critico", "urgente",
            "profissional", "mercado", "oportunidade"}

def normalize(w):
    return re.sub(r"[^\w]", "", w.lower())

def fmt_time(t):
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    return f"{h:d}:{m:02d}:{s:05.2f}"

def is_emphasized(original_text, words, idx):
    w = words[idx]
    text = original_text.strip(".,!?;:")
    dur = w["end"] - w["start"]
    avg_dur = sum(ww["end"] - ww["start"] for ww in words) / max(len(words), 1)
    if text.isupper() and len(text) > 1:
        return True
    if text[0].isupper() and len(text) > 2:
        return True
    if dur > avg_dur * 1.4:
        return True
    if normalize(text) in KEYWORDS:
        return True
    return False

def group_words(words, max_gap=0.5):
    groups, cur = [], []
    for w in words:
        if cur and w["start"] - cur[-1]["end"] > max_gap:
            groups.append(cur)
            cur = []
        cur.append(w)
    if cur:
        groups.append(cur)
    return groups

def main():
    with open("transcript_remapped.json") as f:
        data = json.load(f)
    words = data["words"]

    groups = group_words(words)
    events = [ASS_HEADER]
    emph_count = 0

    for g in groups:
        gs, ge = g[0]["start"], g[-1]["end"]
        full_text = " ".join(w["word"].upper() for w in g)

        events.append(
            f"Dialogue: 0,{fmt_time(gs)},{fmt_time(ge)},"
            f"Line,,0,0,0,,{full_text}"
        )

        for w in g:
            idx = words.index(w)
            original = w["word"]
            display = original.upper()
            style = "Emp" if is_emphasized(original, words, idx) else "Word"
            events.append(
                f"Dialogue: 1,{fmt_time(w['start'])},{fmt_time(w['end'])},"
                f"{style},,0,0,0,,{display}"
            )
            if style == "Emp":
                emph_count += 1

    with open("subs.ass", "w") as f:
        f.write("\n".join(events))

    n = len(groups)
    print(f"{n} blocos, {len(words)} palavras ({emph_count} enfatizadas) -> subs.ass")

if __name__ == "__main__":
    main()
