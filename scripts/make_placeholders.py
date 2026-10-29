"""Generate neutral placeholder 'photos' so the site builds before real images arrive."""
import random, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

out = Path(sys.argv[1])
out.mkdir(parents=True, exist_ok=True)
font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

palettes = {
    "courtyard-house": [(191,185,175),(168,172,167),(203,196,184)],
    "studio-office": [(178,182,186),(160,165,170),(196,199,201)],
    "hillside-retreat": [(186,178,160),(170,160,142),(205,198,182)],
}
shapes = {"landscape": (2400,1600), "portrait": (1600,2000)}

def draw(name, idx, size, base, seed):
    random.seed(seed)
    w, h = size
    img = Image.new("RGB", size, base)
    d = ImageDraw.Draw(img)
    horizon = int(h * random.uniform(0.55, 0.7))
    sky = tuple(min(255, c + 22) for c in base)
    d.rectangle([0, 0, w, horizon], fill=sky)
    ground = tuple(max(0, c - 18) for c in base)
    d.rectangle([0, horizon, w, h], fill=ground)
    # simple massing blocks
    x = int(w * random.uniform(0.08, 0.2))
    for _ in range(random.randint(2, 4)):
        bw = int(w * random.uniform(0.15, 0.32))
        bh = int(h * random.uniform(0.18, 0.42))
        tone = tuple(max(0, c - random.randint(25, 60)) for c in base)
        d.rectangle([x, horizon - bh, x + bw, horizon], fill=tone)
        # window band
        wy = horizon - int(bh * 0.55)
        d.rectangle([x + int(bw*0.1), wy, x + int(bw*0.9), wy + int(bh*0.16)], fill=tuple(max(0, c - 85) for c in base))
        x += bw + int(w * random.uniform(0.0, 0.05))
        if x > w * 0.85:
            break
    f = ImageFont.truetype(font_path, max(28, w // 60))
    label = f"Placeholder photo · {name.replace('-', ' ')} · {idx}"
    d.text((int(w*0.04), int(h*0.92)), label, fill=(70, 70, 66), font=f)
    img.save(out / f"{name}-{idx}.jpg", quality=82)

for p, pal in palettes.items():
    for i in range(1, 7):
        size = shapes["portrait"] if i in (3, 5) else shapes["landscape"]
        draw(p, i, size, pal[i % 3], hash((p, i)) & 0xffff)
print(sorted(x.name for x in out.iterdir()))
