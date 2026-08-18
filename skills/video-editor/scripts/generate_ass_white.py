#!/usr/bin/env python3
import sys, json, re

CONTORNO = "&H00202020"
PRETO = "&H00000000"
BRANCO = "&H00FFFFFF"

ASS_HEADER = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Line,Avenir Next Medium,48,&HBBFFFFFF,&H000000FF,{CONTORNO},{PRETO},0,0,0,0,100,100,0,0,1,3,1,2,80,80,260,1
Style: Word,Avenir Next Bold,60,{BRANCO},&H000000FF,{CONTORNO},{PRETO},1,0,0,0,100,100,0,0,1,3,1,2,80,80,260,1
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

def emphasis_score(original_text, words, idx):
    w = words[idx]
    text = original_text.strip(".,!?;:")
    dur = w["end"] - w["start"]
    avg_dur = sum(ww["end"] - ww["start"] for ww in words) / max(len(words), 1)
    score = 0.0
    if text.isupper() and len(text) > 1:
        score += 1.0
    if text[0].isupper() and len(text) > 2:
        score += 0.5
    if dur > avg_dur * 1.4:
        score += 0.8
    if dur > avg_dur * 1.8:
        score += 0.5
    if normalize(text) in KEYWORDS:
        score += 0.7
    if idx > 0 and words[idx]["start"] - words[idx-1]["end"] > 0.3:
        score += 0.3
    return min(score, 2.0)

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
    with open("transcript.json") as f:
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
            score = emphasis_score(original, words, idx)

            if score > 0.3:
                size = int(60 + score * 6)
                size = min(size, 78)
                events.append(
                    f"Dialogue: 1,{fmt_time(w['start'])},{fmt_time(w['end'])},"
                    f"Word,,0,0,0,,{{\\fs{size}}}{display}"
                )
                emph_count += 1
            else:
                events.append(
                    f"Dialogue: 1,{fmt_time(w['start'])},{fmt_time(w['end'])},"
                    f"Word,,0,0,0,,{display}"
                )

    with open("subs.ass", "w") as f:
        f.write("\n".join(events))

    n = len(groups)
    print(f"{n} blocos, {len(words)} palavras ({emph_count} dinâmicas) -> subs.ass")
    print(f"  Fonte: Avenir Next Bold | Branco puro | Tamanho dinâmico 60-78pt")

if __name__ == "__main__":
    main()
