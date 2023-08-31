from django.urls import path
from .views import predict_distance

urlpatterns = [
    path('predict_distance/', predict_distance, name='predict_distance'),
]