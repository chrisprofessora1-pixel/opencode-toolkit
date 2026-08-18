#!/usr/bin/env python3
import os, sys, json, argparse, textwrap
import requests

API_KEY_PATH = os.path.expanduser("~/.config/elevenlabs/key")
API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not API_KEY and os.path.exists(API_KEY_PATH):
    API_KEY = open(API_KEY_PATH).read().strip()
BASE = "https://api.elevenlabs.io/v1"

HEADERS = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}

DEFAULT_VOICE = "21m00Tcm4TlvDq8ikWAM"
DEFAULT_MODEL = "eleven_multilingual_v2"

def _load_voices():
    r = requests.get(f"{BASE}/voices", headers=HEADERS)
    r.raise_for_status()
    return {v["name"].lower(): v["voice_id"] for v in r.json()["voices"]}

VOICE_MAP = _load_voices()

def resolve_voice(voice):
    if voice in VOICE_MAP.values():
        return voice
    key = voice.lower()
    if key in VOICE_MAP:
        return VOICE_MAP[key]
    for name, vid in VOICE_MAP.items():
        if key in name:
            return vid
    print(f"Aviso: voz '{voice}' não encontrada. Usando default. Use --list-voices")
    return DEFAULT_VOICE

def list_voices():
    for vid, name in sorted((v, k) for k, v in VOICE_MAP.items()):
        print(f"{vid}  {name}")

def generate(text, voice_id, output, model, stability=None, similarity=None):
    payload = {
        "text": text,
        "model_id": model,
        "voice_settings": {
            "stability": stability or 0.35,
            "similarity_boost": similarity or 0.75,
        }
    }
    url = f"{BASE}/text-to-speech/{voice_id}"
    r = requests.post(url, headers=HEADERS, json=payload, stream=True)
    r.raise_for_status()
    total = 0
    with open(output, "wb") as f:
        for chunk in r.iter_content(chunk_size=4096):
            f.write(chunk)
            total += len(chunk)
    dur = total / 32000
    print(f"TTS OK -> {output} ({dur:.1f}s)")

def main():
    parser = argparse.ArgumentParser(description="ElevenLabs TTS")
    parser.add_argument("--text", help="Texto para falar")
    parser.add_argument("--transcript", help="Arquivo transcript.json (lê o texto inteiro)")
    parser.add_argument("--voice", default=DEFAULT_VOICE, help="ID da voz")
    parser.add_argument("--output", default="voiceover.mp3", help="Arquivo de saída")
    parser.add_argument("--model", default=DEFAULT_MODEL, help="Modelo TTS")
    parser.add_argument("--list-voices", action="store_true", help="Listar vozes disponíveis")
    parser.add_argument("--stability", type=float, default=0.35, help="Estabilidade 0-1")
    parser.add_argument("--similarity", type=float, default=0.75, help="Similaridade 0-1")

    args = parser.parse_args()

    if not API_KEY:
        print("ERRO: Defina ELEVENLABS_API_KEY ou salve a key em ~/.config/elevenlabs/key", file=sys.stderr)
        sys.exit(1)

    if args.list_voices:
        list_voices()
        return

    if args.text:
        text = args.text
    elif args.transcript:
        with open(args.transcript) as f:
            data = json.load(f)
        text = " ".join(w["word"] for w in data["words"])
    else:
        print("ERRO: Forneça --text ou --transcript", file=sys.stderr)
        sys.exit(1)

    voice_id = resolve_voice(args.voice)
    generate(text, voice_id, args.output, args.model, args.stability, args.similarity)

if __name__ == "__main__":
    main()
