import os
import json

carpetas = ["Ardo/Ardo_base", "Ardo/Ardo_ssj"]
fotos = []

for carpeta in carpetas:
    if os.path.exists(carpeta):
        for archivo in os.listdir(carpeta):
            if archivo.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                fotos.append(f"{carpeta}/{archivo}")
    else:
        print(f"Carpeta no encontrada: {carpeta}")

with open("imagenes.js", "w", encoding="utf-8") as f:
    f.write(f"const ardoImagenes = {json.dumps(fotos, indent=2)};\n")

print(f"¡Listo! Se encontraron {len(fotos)} fotos. El archivo 'imagenes.js' fue actualizado.")
