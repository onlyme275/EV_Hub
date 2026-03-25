# models.py
from django.db import models

class ChargingStation(models.Model):

    ROLE_CHOICE = (
        ("AC", "AC_Charge"),
        ("DC", "DC_Charge"),
    )

    place = models.CharField(max_length=100)
    price = models.FloatField()
    charger_type = models.CharField(max_length=10, choices=ROLE_CHOICE)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.place