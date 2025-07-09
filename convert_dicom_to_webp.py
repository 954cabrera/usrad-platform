import os
import pydicom
from PIL import Image

source_dir = "/home/usrad/Documents/mri-dicom"
dest_dir = "/home/usrad/Web Development/usradiology-redund-project/public/mri"
os.makedirs(dest_dir, exist_ok=True)

files = sorted(f for f in os.listdir(source_dir) if f.lower().endswith(".dcm"))

for i, filename in enumerate(files):
    path = os.path.join(source_dir, filename)
    ds = pydicom.dcmread(path)
    arr = ds.pixel_array
    img = Image.fromarray(arr).convert("L")
    out_path = os.path.join(dest_dir, f"brain_{str(i+1).zfill(3)}.webp")
    img.save(out_path, "WEBP")
    print(f"✅ Saved: {out_path}")
