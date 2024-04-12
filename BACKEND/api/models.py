
from django.db import models

class Video(models.Model):
    file = models.FileField(upload_to='')
    locality = models.CharField(max_length=100)
    # Add other fields from your dataset here