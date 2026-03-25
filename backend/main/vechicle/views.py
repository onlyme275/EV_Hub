from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vehicle
from .serializers import VehicleSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    # ✅ Admin approval endpoint
    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        vehicle = self.get_object()
        vehicle.is_approved = True
        vehicle.save()
        return Response({"status": "approved"})