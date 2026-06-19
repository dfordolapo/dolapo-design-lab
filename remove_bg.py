from PIL import Image
import os
import sys

def remove_background(image_path):
    try:
        img = Image.open(image_path).convert('RGBA')
        data = img.getdata()
        bg_color = data[0] # assuming top-left pixel is background
        
        new_data = []
        for item in data:
            if abs(item[0] - bg_color[0]) < 20 and abs(item[1] - bg_color[1]) < 20 and abs(item[2] - bg_color[2]) < 20:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(image_path, 'PNG')
        print(f"Processed {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

files = [
    'public/assets/designer.png',
    'public/assets/writer.png',
    'public/assets/builder.png'
]

for f in files:
    remove_background(f)
