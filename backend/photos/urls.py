from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from .views import PhotoListView, PhotoCarouselView, AlbomView


router = routers.DefaultRouter()
router.register(r'photos', PhotoListView,)
router.register(r'albom', AlbomView,)
router.register(r'photocarousel', PhotoCarouselView,)

urlpatterns = [
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)