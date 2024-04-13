import sys
from ultralytics import YOLO
import time
import torch
import cv2
import torch.backends.cudnn as cudnn
from PIL import Image
import colorsys
import numpy as np
from collections import defaultdict
import os
import cv2
import numpy as np

def check_overlap(box1, box2):
    half_width1, half_height1 = (box1[2] - box1[0]) / 2, (box1[3] - box1[1]) / 2
    half_width2, half_height2 = (box2[2] - box2[0]) / 2, (box2[3] - box2[1]) / 2
    x1_center, y1_center = box1[0] + half_width1, box1[1] + half_height1
    x2_center, y2_center = box2[0] + half_width2, box2[1] + half_height2
    return (abs(x1_center - x2_center) < (half_width1 + half_width2)) and \
           (abs(y1_center - y2_center) < (half_height1 + half_height2))

def calculate_velocity(prev_center, current_center, time_delta):
    if prev_center is None or current_center is None:
        return (0.0, 0.0)
    return ((current_center[0] - prev_center[0]) / time_delta, (current_center[1] - prev_center[1]) / time_delta)

def are_vectors_not_similar_direction(velocity1, velocity2):
    if velocity1 is None or velocity2 is None:
        return False
    norm_v1 = np.linalg.norm(velocity1)
    norm_v2 = np.linalg.norm(velocity2)
    if norm_v1 == 0 or norm_v2 == 0:
        return False
    cos_angle = np.dot(velocity1, velocity2) / (norm_v1 * norm_v2)
    return not np.isclose(cos_angle, 1, atol=0.1)

if len(sys.argv) != 2:
    print("Usage: python script_name.py <video_path>")
    sys.exit(1)

video_path = sys.argv[1]

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(video_path)
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
output_dir = '../outputs/abruptchange'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
fgModel = cv2.createBackgroundSubtractorMOG2()
kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(3,3))
track_history = defaultdict(lambda: [])
prev_centers = defaultdict(lambda: None)
time_of_last_frame = None
frame_index = 0
max_frames_with_abrupt_change = 30
frames_with_abrupt_change_counter = 0
velocity_threshold = 0

while cap.isOpened() and frames_with_abrupt_change_counter < max_frames_with_abrupt_change:
    success, frame = cap.read()
    current_time = cv2.getTickCount() / cv2.getTickFrequency()
    if time_of_last_frame is None:
        time_of_last_frame = current_time

    if success:
        results = model.track(frame, persist=True, tracker='bytetrack.yaml', classes=[2])

        overlap_detected = False
        if results[0].boxes is not None and hasattr(results[0].boxes, 'id') and results[0].boxes.id is not None:
            boxes = results[0].boxes.xyxy.cpu().numpy()
            track_ids = results[0].boxes.id.int().cpu().tolist()

            for i in range(len(boxes)):
                x_center_i, y_center_i = (boxes[i][0] + boxes[i][2]) / 2, (boxes[i][1] + boxes[i][3]) / 2
                velocity_i = calculate_velocity(prev_centers[track_ids[i]], (x_center_i, y_center_i), current_time - time_of_last_frame)
                prev_centers[track_ids[i]] = (x_center_i, y_center_i)

                for j in range(i + 1, len(boxes)):
                    if check_overlap(boxes[i], boxes[j]):
                        x_center_j, y_center_j = (boxes[j][0] + boxes[j][2]) / 2, (boxes[j][1] + boxes[j][3]) / 2
                        velocity_j = calculate_velocity(prev_centers[track_ids[j]], (x_center_j, y_center_j), current_time - time_of_last_frame)
                        prev_centers[track_ids[j]] = (x_center_j, y_center_j)

                        if are_vectors_not_similar_direction(velocity_i, velocity_j):
                            overlap_detected = True
                            break
                    if overlap_detected:
                      break

            annotated_frame = results[0].plot()

            if overlap_detected:
                image_path = os.path.join(output_dir, f'collision_frame_{frame_index}.jpg')
                cv2.imwrite(image_path, frame)
                frame_index += 1
                frames_with_abrupt_change_counter += 1
                overlap_detected = False
    else:
        break

cap.release()
cv2.destroyAllWindows()
