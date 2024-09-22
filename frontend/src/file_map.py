import os

def generate_file_map(start_path, max_depth=6, level=0):
    if level > max_depth:
        return
    for root, dirs, files in os.walk(start_path):
        indent = ' ' * 4 * level
        print(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print(f"{subindent}{f}")
        if level < max_depth:
            for d in dirs:
                generate_file_map(os.path.join(root, d), max_depth, level + 1)
        break

start_path = '.'
generate_file_map(start_path)
