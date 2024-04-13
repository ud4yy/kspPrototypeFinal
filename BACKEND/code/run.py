import subprocess
import os
import shutil
import sys

video_path = sys.argv[1] 
base_dir = "../inputs_server"
video_path = os.path.join(base_dir, video_path.lstrip('/'))
print("inside run.py")

subprocess.run(["python","iteration3.py", video_path])
print("this is video path down____________________________________")
print(video_path)

subprocess.run(["python","yolov8.py"])


subprocess.run(["python","inference.py"])
print("run.py crossed inference.py line")
runsDir='../runs'
outputsDir='../outputs'

if os.path.exists(runsDir):
    shutil.rmtree(runsDir)
if os.path.exists(outputsDir):
    shutil.rmtree(outputsDir)
    

