import os
import glob
import re
import sys
from ultralytics import YOLO

# Load a model
model = YOLO('../weights/best.pt')  # pretrained YOLOv8n model

def extract_frame_number(file_path):
 
    match = re.search(r"collision_frame_(\d+)", file_path)
    return int(match.group(1)) if match else float('inf')

def classify(image_folder_path):
    if not os.path.exists(image_folder_path):
        print(f"The directory {image_folder_path} does not exist.")
        sys.exit()

    image_files = glob.glob(os.path.join(image_folder_path, '*.jpg')) + glob.glob(os.path.join(image_folder_path, '*.png'))

    sorted_a = sorted(image_files, key=extract_frame_number)
    image_files = sorted_a.copy()

    try:
        if len(image_files) > 10:
            frames_to_process = [image_files[9], image_files[(len(image_files)//2)+1]]
        elif len(image_files) > 3 and len(image_files) <= 10:
            frames_to_process = [image_files[(len(image_files)//2)+1], image_files[(len(image_files)//2)+2], image_files[len(image_files)-1]]
        else:
            frames_to_process = [image_files[0], image_files[1]]
    except IndexError:
        print("No abrupt change found")
        sys.exit()

    for image_path in frames_to_process:
        model.predict(image_path, save=True, conf=0.4, save_crop=True)
print("runnning yolov8")
classify('../outputs/abruptchange')
