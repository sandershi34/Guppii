from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=16)
    password_hash = models.CharField(max_length=24)
    user_token = models.CharField(max_length=64)
