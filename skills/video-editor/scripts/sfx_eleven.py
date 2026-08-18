#!/usr/bin/env python3
import os, sys, hashlib, json, subprocess
import requests

API_KEY_PATH = os.path.expanduser("~/.config/elevenlabs/key")
API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not API_KEY and os.path.exists(API_KEY_PATH):
    API_KEY = open(API_KEY_PATH).read().strip()

SFX_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "sfx")
os.makedirs(SFX_DIR, exist_ok=True)

PRESETS = {
    "whoosh":       "A smooth whoosh transition sound",
    "whoosh_fast":  "A quick light whoosh passing by",
    "whoosh_deep":  "A deep cinematic whoosh transition",
    "pop":          "A soft elegant pop sound",
    "pop_high":     "A small bright bubble pop",
    "chime":        "A gentle notification chime",
    "chime_soft":   "A single soft bell tone",
    "impact":       "A deep cinematic impact hit",
    "click":        "A subtle interface mouse click",
    "click_soft":   "A soft button press click",
    "ding":         "A clean notification ding",
    "swell":        "A slow dramatic musical swell",
    "whoosh_up":    "A rising whoosh transition",
}

def cache_path(prompt, dur):
    h = hashlib.md5(f"{prompt}|{dur}".encode()).hexdigest()[:12]
    return os.path.join(SFX_DIR, f"{h}.mp3")

def generate(prompt, duration=0.5, force=False):
    out = cache_path(prompt, duration)
    if os.path.exists(out) and not force:
        return out
    if duration < 0.5:
        raise ValueError(f"duration_seconds must be >= 0.5, got {duration}")
    if not API_KEY:
        raise RuntimeError("ElevenLabs key not configured")
    r = requests.post(
        "https://api.elevenlabs.io/v1/sound-generation",
        headers={"xi-api-key": API_KEY, "Content-Type": "application/json"},
        json={"text": prompt, "duration_seconds": duration},
        stream=True,
        timeout=30,
    )
    r.raise_for_status()
    with open(out, "wb") as f:
        for chunk in r.iter_content(4096):
            f.write(chunk)
    size_kb = os.path.getsize(out) / 1024
    print(f"  SFX gerado: {os.path.basename(out)} ({size_kb:.0f}KB) '{prompt[:50]}'")
    return out

def generate_preset(name, duration=0.5, force=False):
    if name not in PRESETS:
        raise KeyError(f"Preset '{name}' not found. Choices: {', '.join(PRESETS)}")
    return generate(PRESETS[name], duration, force)

def prewarm(force=False):
    presets = [
        ("whoosh", 0.5),
        ("whoosh_deep", 0.7),
        ("pop", 0.5),
        ("chime_soft", 0.5),
        ("click_soft", 0.5),
        ("ding", 0.5),
    ]
    for name, dur in presets:
        try:
            generate_preset(name, dur, force)
        except Exception as e:
            print(f"  ERRO ao gerar '{name}': {e}", file=sys.stderr)

def list_cached():
    for f in sorted(os.listdir(SFX_DIR)):
        if f.endswith(".mp3"):
            path = os.path.join(SFX_DIR, f)
            size = os.path.getsize(path) / 1024
            print(f"{f}  ({size:.0f}KB)")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="ElevenLabs Sound Effects Generator")
    parser.add_argument("--preset", help="Nome do preset de som")
    parser.add_argument("--text", help="Descrição personalizada do som")
    parser.add_argument("--duration", type=float, default=0.5, help="Duração em segundos")
    parser.add_argument("--output", help="Caminho de saída (opcional, default = cache)")
    parser.add_argument("--prewarm", action="store_true", help="Pré-gerar todos os presets")
    parser.add_argument("--list-presets", action="store_true", help="Listar presets disponíveis")
    parser.add_argument("--list-cached", action="store_true", help="Listar sons em cache")
    parser.add_argument("--force", action="store_true", help="Regenerar mesmo se existir")

    args = parser.parse_args()

    if args.list_presets:
        for name, prompt in PRESETS.items():
            print(f"  {name:15s}  {prompt}")
        sys.exit(0)

    if args.list_cached:
        list_cached()
        sys.exit(0)

    if args.prewarm:
        prewarm(args.force)
        sys.exit(0)

    if args.preset:
        path = generate_preset(args.preset, args.duration, args.force)
    elif args.text:
        path = generate(args.text, args.duration, args.force)
    else:
        print("Use --preset, --text, --prewarm, --list-presets ou --list-cached")
        sys.exit(1)

    if args.output:
        subprocess.run(["cp", path, args.output])
        print(f"Copiado para {args.output}")
    else:
        print(path)
