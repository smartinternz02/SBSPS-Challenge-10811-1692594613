from rest_framework import serializers
from .models import ChargeHistory

class ChargeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChargeHistory
        fields = ['user_email', 'user_password', 'charging_station_name', 'billing', 'charging_time', 'charging_type', 'datetime']

