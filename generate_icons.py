from PIL import Image, ImageDraw, ImageFont

def create_icon(size, filename):
    img = Image.new('RGB', (size, size), color='#1e3a8a') # Primary Blue
    d = ImageDraw.Draw(img)
    
    # Draw a simple "E" logo
    # Since we can't easily load fonts without knowing system paths, we'll draw shapes
    # Draw a circle
    d.ellipse([(size*0.1, size*0.1), (size*0.9, size*0.9)], outline="white", width=int(size*0.05))
    
    # Draw "E" roughly
    padding = size * 0.3
    # Vertical line
    d.rectangle([(padding, padding), (padding + size*0.1, size-padding)], fill="white")
    # Top bar
    d.rectangle([(padding, padding), (size-padding, padding + size*0.08)], fill="white")
    # Middle bar
    d.rectangle([(padding, size/2 - size*0.04), (size-padding*1.2, size/2 + size*0.04)], fill="white")
    # Bottom bar
    d.rectangle([(padding, size-padding - size*0.08), (size-padding, size-padding)], fill="white")
    
    img.save(filename)

create_icon(192, 'e:/Reactjs/eleckyo/public/pwa-192x192.png')
create_icon(512, 'e:/Reactjs/eleckyo/public/pwa-512x512.png')
print("Icons created successfully")
