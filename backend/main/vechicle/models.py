from django.db import models

class Vehicle(models.Model):
    vehicle_name = models.CharField(max_length=100)
    vehicle_number = models.CharField(max_length=50)
    start_point = models.CharField(max_length=100)
    end_point = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    phone_number = models.CharField(max_length=15)

    is_approved = models.BooleanField(default=False)  

    def __str__(self):
        return self.vehicle_name

        