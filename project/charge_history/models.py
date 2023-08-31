from django.db import models
from django.db import models

class ChargeHistory(models.Model):
    user_email = models.EmailField()
    user_password = models.CharField(max_length=128)
    charging_station_name = models.CharField(max_length=100)
    billing = models.DecimalField(max_digits=10, decimal_places=2)
    charging_time = models.IntegerField()
    charging_type = models.CharField(max_length=50)
    datetime = models.DateTimeField()

    def _str_(self):
        return f"{self.user_email} - {self.datetime}"
# Create your models here.
