import subprocess
import os
import shutil
import sys

video_path = sys.argv[1]  # Get the video path from the command-line arguments
base_dir = "/home/uday/Desktop/projectTry/BACKEND/inputs_server"
video_path = os.path.join(base_dir, video_path.lstrip('/'))
print("inside run.py")
# Run iteration3.py
subprocess.run(["python","/home/uday/Desktop/projectTry/BACKEND/code/iteration3.py", video_path])
print("this is video path down____________________________________")
print(video_path)
# Run yolov8.py
subprocess.run(["python","/home/uday/Desktop/projectTry/BACKEND/code/yolov8.py"])

# Run inference.py
subprocess.run(["python","/home/uday/Desktop/projectTry/BACKEND/code/inference.py"])
print("run.py crossed inference.py line")
runsDir='/home/uday/Desktop/projectTry/BACKEND/runs'
outputsDir='/home/uday/Desktop/projectTry/BACKEND/outputs'

if os.path.exists(runsDir):
    shutil.rmtree(runsDir)
if os.path.exists(outputsDir):
    shutil.rmtree(outputsDir)
    

