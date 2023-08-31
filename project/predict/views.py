from django.shortcuts import render
from django.http import JsonResponse
from .ml_modules import model
import joblib

def predict_distance(request):
    if request.method == 'POST' or request.method == 'GET':
        battery_percentage = float(request.GET.get('battery_percentage', 0))

        # Load the trained model
        loaded_model = joblib.load('linear_regression_model.pkl')

        # Predict distance based on battery percentage
        predicted_distance = loaded_model.predict([[battery_percentage]])[0]
        return JsonResponse({'predicted_distance': predicted_distance})
    else:
        return JsonResponse({'error': 'Invalid request method'})
# Create your views here.
