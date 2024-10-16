from django.db import models

class Employee(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.full_name
