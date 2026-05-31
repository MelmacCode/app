#!/usr/bin/env python3
"""
convert-to-webp.py — La Taza Nomada
Convierte todas las imagenes JPG/PNG de public/images/ a WebP.
WebP reduce el tamano de archivo en 25-35% sin perder calidad.

REQUISITOS:
  pip install Pillow

USO:
  python convert-to-webp.py

RESULTADO:
  Crea archivos .webp junto a los originales.
  Ejemplo: product-cafe-caracas.jpg → product-cafe-caracas.webp
"""

from pathlib import Path
from PIL import Image
import sys

# Configuracion
SOURCE_DIR = Path("public/images")
QUALITY = 85
SUPPORTED = (".jpg", ".jpeg", ".png")


def convert_image(src_path: Path) -> Path:
    """Convierte una imagen a WebP y devuelve la ruta destino."""
    dst_path = src_path.with_suffix(".webp")
    
    try:
        img = Image.open(src_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        elif img.mode != "RGB":
            img = img.convert("RGB")
        
        img.save(dst_path, "WEBP", quality=QUALITY, method=6)
        
        src_size = src_path.stat().st_size
        dst_size = dst_path.stat().st_size
        savings = (1 - dst_size / src_size) * 100
        
        print("OK: " + src_path.name + " -> " + dst_path.name + " (" + str(round(savings, 1)) + "% mas pequeno)")
        return dst_path
        
    except Exception as e:
        print("ERROR: " + src_path.name + ": " + str(e))
        return None


def main():
    if not SOURCE_DIR.exists():
        print("ERROR: No existe la carpeta: " + str(SOURCE_DIR))
        print("   Asegurate de ejecutar este script desde la raiz del proyecto.")
        sys.exit(1)
    
    files = [f for f in SOURCE_DIR.iterdir() if f.suffix.lower() in SUPPORTED]
    
    if not files:
        print("AVISO: No se encontraron imagenes " + str(SUPPORTED) + " en " + str(SOURCE_DIR))
        sys.exit(0)
    
    print("Convirtiendo " + str(len(files)) + " imagenes a WebP...")
    print("")
    
    converted = 0
    for file in files:
        if convert_image(file):
            converted += 1
    
    print("")
    print("Listo! " + str(converted) + "/" + str(len(files)) + " imagenes convertidas.")
    print("Revisa la carpeta: " + str(SOURCE_DIR))
    print("")
    print("SIGUIENTE PASO:")
    print("   Actualiza las rutas en src/data/products.ts y src/data/blog.ts")
    print("   Cambia '/images/foto.jpg' -> '/images/foto.webp'")


if __name__ == "__main__":
    main()