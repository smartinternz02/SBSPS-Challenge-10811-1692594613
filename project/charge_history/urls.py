from rest_framework import routers
from .views import ChargeHistoryViewSet
from django.urls import path ,include

router = routers.DefaultRouter()
router.register(r'charge-history', ChargeHistoryViewSet)

urlpatterns = [
    # ... other URL patterns ...
    path('api/', include(router.urls)),
]