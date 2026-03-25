# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ChargingStation
from .serializers import ChargingStationSerializer

class ChargingStationViewSet(viewsets.ModelViewSet):
    queryset = ChargingStation.objects.all().order_by("-created_at")
    serializer_class = ChargingStationSerializer
    permission_classes = [IsAuthenticated]