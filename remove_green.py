from PIL import Image
import glob
import os

mappings = {
    'designer_green_*.png': r'c:\Users\Segma\Videos\Dolapo Design to MVP\Portfolio\public\assets\designer.png',
    'writer_green_*.png': r'c:\Users\Segma\Videos\Dolapo Design to MVP\Portfolio\public\assets\writer.png',
    'builder_green_*.png': r'c:\Users\Segma\Videos\Dolapo Design to MVP\Portfolio\public\assets\builder.png'
}

base_dir = r"C:\Users\Segma\.gemini\antigravity-ide\brain\583390e5-437d-4d59-a638-e85fcfb83165"

for pattern, out_path in mappings.items():
    matches = glob.glob(os.path.join(base_dir, pattern))
    if not matches:
        print(f"No match for {pattern}")
        continue
    image_path = matches[-1] # take the latest
    try:
        img = Image.open(image_path).convert('RGBA')
        data = img.getdata()
        
        new_data = []
        for r, g, b, a in data:
            if g > 100 and r < g - 40 and b < g - 40:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append((r, g, b, a))
                
        img.putdata(new_data)
        img.save(out_path, 'PNG')
        print(f"Processed {image_path} -> {out_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")
