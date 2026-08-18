---
name: video-editor
description: Edita vídeos automaticamente - remove filler words e silêncios, gera legendas karaoke estéticas, cortes dinâmicos e SFX contextual via ElevenLabs.
---

# Video Editor Skill

## Quando usar
Use quando o usuário pedir para editar, cortar, legendar ou "viralizar"
um vídeo (reels/shorts/tiktok), especialmente com legendas karaoke estéticas
e efeitos sonoros naturais.

## Requisitos
- ffmpeg 7+ (em PATH ou ~/.npm-global/bin/)
- python3 com: openai-whisper, requests
- Avenir Next (fonte nativa macOS, usada nas legendas)

ElevenLabs (obrigatório para SFX):
- API key em ~/.config/elevenlabs/key ou env ELEVENLABS_API_KEY
- Geração de SFX sob demanda via `scripts/sfx_eleven.py`

## Pipeline

WORKDIR: /var/folders/.../T/opencode/video-edit/
PATH: `export PATH="$HOME/.npm-global/bin:$PATH"`

### 1. Transcrever
```
scripts/transcribe.py input.mp4
```
Gera `transcript.json` com timestamps word-level.

### 2. Remover fillers/silêncio
```
scripts/remove_fillers.py transcript.json
```
Gera `cuts.json` com intervalos a remover.

### 3. Construir timeline
```
scripts/build_timeline.py input.mp4 cuts.json
```
Gera `timeline.json` com segmentos mantidos + mapeamento old→new.

### 4. Remapear timestamps
```
scripts/remap_words.py transcript.json timeline.json
```
Gera `transcript_remapped.json` com palavras filtradas/realinhadas.

### 5. Cortar video
```
scripts/render.sh cut input.mp4 timeline.json trimmed.mp4
```

### 6. Gerar legendas karaoke
```
scripts/generate_ass.py
```
Gera `subs.ass` com:
- **Line**: frase completa em Avenir Next Medium 50pt, semi-transparente
- **Word**: palavra atual em Avenir Next Bold 60pt, branco
- **Emp**: palavra enfatizada em Avenir Next Bold 66pt, âmbar (#C9A27A)

### 7. Mix (video + legendas)
```
scripts/render.sh mix trimmed.mp4 subs.ass output.mp4
```

### 8. SFX contextual (ElevenLabs)
```
scripts/add_sfx.py output.mp4 output_final.mp4
```
Gera e posiciona automaticamente:
- **whoosh** em cortes com gap médio (0.3-0.8s)
- **whoosh_deep** em cortes com gap grande (>0.8s)
- **click_soft** em cortes com gap pequeno (<0.3s)
- **pop** sutil antes de palavras enfatizadas

Os SFX são gerados via ElevenLabs Sound Effects API e cacheados em `assets/sfx/`.

### 9. (Opcional) Voiceover com ElevenLabs TTS
```
python3 scripts/tts.py --transcript transcript.json --voice "Matilda" --output voiceover.mp3
bash scripts/render.sh voiceover output_final.mp4 voiceover.mp3 voiceover_final.mp4
```

Vozes recomendadas: `Matilda` (fem profissional), `Alice` (fem britânica),
`Roger` (masc casual), `Mia Maestra` (fem guia calma), `Jessica` (fem calorosa).

## Gerenciamento de SFX
```
scripts/sfx_eleven.py --list-presets   # ver todos os sons disponíveis
scripts/sfx_eleven.py --prewarm        # pré-gerar todos (uso offline)
scripts/sfx_eleven.py --preset whoosh  # gerar um som específico
scripts/sfx_eleven.py --list-cached    # ver cache atual
```

## Regras de edição
- Cortes SECOS (jump cut), sem zoompan, xfade ou crossfade
- FPS: 30 | Audio: 48000 Hz | Vídeo: libx264 crf 18
- Legendas sempre centralizadas no terço inferior
- SFX sutis, não poluentes (volume entre 0.25-0.6)
