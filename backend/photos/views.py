from rest_framework import viewsets, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Photo, Albom, PhotoCarousel
from .filters import PhotoFilter
from .serializers import (
    PhotoSerializer,
    PhotoCarouselSerializer,
    PhotoNotSafeMetodSerialaizer,
    AlbomSerializer
)


class PhotoListView(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    filterset_class = PhotoFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return PhotoSerializer
        return PhotoNotSafeMetodSerialaizer


class AlbomView(viewsets.ModelViewSet):
    queryset = Albom.objects.all()
    serializer_class = AlbomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PhotoCarouselView(viewsets.ModelViewSet):
    queryset = PhotoCarousel.objects.all()
    serializer_class = PhotoCarouselSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]