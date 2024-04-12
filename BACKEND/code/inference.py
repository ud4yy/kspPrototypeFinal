import torch
import torchvision
from torch import nn
from torchvision.models import vit_b_16
from PIL import Image
import os
import cv2
import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email():
    # Set up the SMTP server
    s = smtplib.SMTP(host='smtp-mail.outlook.com', port=587)
    s.starttls()
    s.login('ksp2024_999@outlook.com', '7899383761Uj.')

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = 'ksp2024_999@outlook.com'
    msg['To'] = 'devajsanghvi15@gmail.com'
    msg['Subject'] = 'Accident spotted'
    msg.attach(MIMEText('An accident was spotted in the video. (this is an automated email)', 'plain'))

    # Send the email
    s.send_message(msg)

    # Close the SMTP server
    s.quit()

# Load the fine-tuned weights
state_dict = torch.load('/home/uday/Desktop/projectTry/BACKEND/weights/pretrained_vit_weights.pth', map_location=torch.device('cpu'))

# Ensure the model architecture is the same as the fine-tuned one
model = vit_b_16(weights=None)
model.heads = nn.Linear(in_features=768, out_features=2)  # Assuming 2 classes as before
model.load_state_dict(state_dict)

# Set the model to evaluation mode
model.eval()
pretrained_vit_weights = torchvision.models.ViT_B_16_Weights.DEFAULT
pretrained_vit_transforms = pretrained_vit_weights.transforms()

# Directory containing images to be checked
image_dir = '/home/uday/Desktop/projectTry/BACKEND/runs/detect/predict/crops/accident/'

# Check if the directory exists
if not os.path.exists(image_dir):
    print("No accidents found.")
    sys.exit()

# Initialize a list to store paths of images with "accident" class
accident_images = []

# Iterate through all images in the directory
for filename in os.listdir(image_dir):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        image_path = os.path.join(image_dir, filename)
        image = Image.open(image_path)
        transformed_image = pretrained_vit_transforms(image).unsqueeze(0)
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        model = model.to(device)
        transformed_image = transformed_image.to(device)

        with torch.no_grad():
            output = model(transformed_image)
            prediction = torch.argmax(output, dim=1)

        class_names = ['no-accident', 'accident']
        predicted_class = class_names[prediction.item()]

        if predicted_class == 'accident':
            accident_images.append(image_path)

# Display all images with "accident" class
if accident_images:
    print("Accident spotted.")
    send_email()
    sys.exit()  # Exit the script

else:
    print("No accidents spotted in any image.")
