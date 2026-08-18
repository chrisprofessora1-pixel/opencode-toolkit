#!/usr/bin/env python3
"""Gera efeitos sonoros mais interessantes com ffmpeg."""
import subprocess, os

SFX_DIR = "assets/sfx"
os.makedirs(SFX_DIR, exist_ok=True)

def make_sound(name, desc):
    print(f"Gerando {name}... {desc}")
    subprocess.run(desc, shell=True, check=True)

# Swoosh: sweep de 80->2000Hz + pink noise, fade in/out
make_sound("swoosh.mp3",
    "ffmpeg -y -f lavfi -i \"sine=frequency=80:duration=0.35,afade=t=in:d=0.03,afade=t=out:st=0.28:d=0.07\""
    " -f lavfi -i \"sine=frequency=2000:duration=0.35,afade=t=in:d=0.03,afade=t=out:st=0.3:d=0.05\""
    " -f lavfi -i \"anoisesrc=d=0.35:c=white:a=0.15,lowpass=f=1500,highpass=f=200,afade=t=in:d=0.02,afade=t=out:st=0.3:d=0.05\""
    " -filter_complex \"[0:a][1:a]amix=inputs=2:normalize=0,volume=0.6[a];[a][2:a]amix=inputs=2:normalize=0,volume=0.7[out]\""
    " -map \"[out]\" -b:a 192k assets/sfx/swoosh.mp3"
)

# Pop: estalo curto com corpo (200Hz + 800Hz)
make_sound("pop.mp3",
    "ffmpeg -y -f lavfi -i \"sine=frequency=200:duration=0.1,afade=t=in:d=0.002,afade=t=out:st=0.07:d=0.03\""
    " -f lavfi -i \"sine=frequency=800:duration=0.06,afade=t=in:d=0.001,afade=t=out:st=0.04:d=0.02\""
    " -filter_complex \"[0:a][1:a]amix=inputs=2:normalize=0,volume=0.8[out]\""
    " -map \"[out]\" -b:a 192k assets/sfx/pop.mp3"
)

# Ding: acorde musical (nota + quinta)
make_sound("ding.mp3",
    "ffmpeg -y -f lavfi -i \"sine=frequency=880:duration=0.3,afade=t=in:d=0.005,afade=t=out:st=0.25:d=0.05\""
    " -f lavfi -i \"sine=frequency=1320:duration=0.25,afade=t=in:d=0.005,afade=t=out:st=0.2:d=0.05\""
    " -filter_complex \"[0:a][1:a]amix=inputs=2:normalize=0,volume=0.6[out]\""
    " -map \"[out]\" -b:a 192k assets/sfx/ding.mp3"
)

# Click: estalinho seco (alta frequencia, curtissimo)
make_sound("click.mp3",
    "ffmpeg -y -f lavfi -i \"sine=frequency=3000:duration=0.03,afade=t=in:d=0.001,afade=t=out:st=0.02:d=0.01\""
    " -af \"volume=0.4\" -b:a 192k assets/sfx/click.mp3"
)

# Whoosh up: sweep ascendente mais dramatico
make_sound("whoosh_up.mp3",
    "ffmpeg -y -f lavfi -i \"sine=frequency=150:duration=0.5,afade=t=in:d=0.05,afade=t=out:st=0.4:d=0.1\""
    " -f lavfi -i \"anoisesrc=d=0.5:c=pink:a=0.2,lowpass=f=2000,highpass=f=100,afade=t=in:d=0.05,afade=t=out:st=0.4:d=0.1\""
    " -filter_complex \"[0:a]volume=1.2[a];[1:a]volume=0.4[b];[a][b]amix=inputs=2:normalize=0[out]\""
    " -map \"[out]\" -b:a 192k assets/sfx/whoosh_up.mp3"
)

print("Todos os SFX gerados!")
