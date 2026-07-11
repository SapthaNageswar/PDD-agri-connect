import os
import re

java_dir = r"c:\AgriConnect ppd\android\app\src\main\java\com\agriconnect\app"
layout_dir = r"c:\AgriConnect ppd\android\app\src\main\res\layout"

# Ensure layout directory exists
os.makedirs(layout_dir, exist_ok=True)

# Regex patterns
layout_pattern = re.compile(r"\bR\.layout\.([a-zA-Z0-9_]+)\b")
id_pattern = re.compile(r"\bR\.id\.([a-zA-Z0-9_]+)\b")

# Find layouts and the IDs referenced in the same Java file
layout_to_ids = {}

for root, _, files in os.walk(java_dir):
    for file in files:
        if file.endswith(".java"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            
            layouts = layout_pattern.findall(content)
            ids = id_pattern.findall(content)
            
            for l in layouts:
                if l not in layout_to_ids:
                    layout_to_ids[l] = set()
                layout_to_ids[l].update(ids)

# Print what we found
print(f"Found {len(layout_to_ids)} layouts to generate stubs for:")
for l, ids in layout_to_ids.items():
    print(f"  {l}.xml with {len(ids)} IDs")

def get_widget_type(id_name):
    id_lower = id_name.lower()
    if id_lower.startswith("btn_") or id_lower == "btn":
        return "Button"
    elif id_lower.startswith("tv_") or id_lower == "tv":
        return "TextView"
    elif id_lower.startswith("et_") or id_lower == "et":
        return "EditText"
    elif id_lower.startswith("rv_") or id_lower == "rv":
        return "androidx.recyclerview.widget.RecyclerView"
    elif id_lower.startswith("iv_") or id_lower == "iv":
        return "ImageView"
    elif id_lower.startswith("layout_") or id_lower == "layout":
        return "LinearLayout"
    elif id_lower.startswith("rg_") or id_lower == "rg":
        return "RadioGroup"
    elif id_lower.startswith("rb_") or id_lower == "rb":
        return "RadioButton"
    elif id_lower.startswith("spinner_") or id_lower == "spinner":
        return "Spinner"
    elif id_lower.startswith("progress_bar") or id_lower == "progress":
        return "ProgressBar"
    elif id_lower.startswith("card_") or id_lower == "card":
        return "androidx.cardview.widget.CardView"
    else:
        return "View"

# Generate XML layouts
for layout_name, ids in layout_to_ids.items():
    if layout_name == "activity_main":
        # Don't overwrite the main capacitor entry layout if it exists
        if os.path.exists(os.path.join(layout_dir, "activity_main.xml")):
            print("Skipping activity_main.xml to avoid overwriting Capacitor configuration")
            continue
            
    xml_content = ['<?xml version="1.0" encoding="utf-8"?>',
                   '<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"',
                   '    android:layout_width="match_parent"',
                   '    android:layout_height="match_parent"',
                   '    android:orientation="vertical"',
                   '    android:padding="16dp">',
                   '']
    
    # Sort IDs for clean generation
    for id_name in sorted(list(ids)):
        widget = get_widget_type(id_name)
        xml_content.append(f'    <{widget}')
        xml_content.append(f'        android:id="@+id/{id_name}"')
        xml_content.append('        android:layout_width="match_parent"')
        xml_content.append('        android:layout_height="wrap_content" />')
        xml_content.append('')
        
    xml_content.append('</LinearLayout>')
    
    output_path = os.path.join(layout_dir, f"{layout_name}.xml")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_content))
    print(f"Generated {output_path}")

print("Done generating layout stubs!")
