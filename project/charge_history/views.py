from django.shortcuts import render
from rest_framework import viewsets
from .models import ChargeHistory
from .serializers import ChargeHistorySerializer

class ChargeHistoryViewSet(viewsets.ModelViewSet):
    queryset = ChargeHistory.objects.all()
    serializer_class = ChargeHistorySerializer
# Create your views here.
