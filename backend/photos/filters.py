from django_filters import rest_framework as filters
from django.contrib.auth.models import User

from .models import Photo, Albom


class PhotoFilter(filters.FilterSet):
    user = filters.ModelChoiceFilter(
        queryset=User.objects.all()
    )
    alboms = filters.ModelMultipleChoiceFilter(
        field_name='alboms__name',
        queryset=Albom.objects.all(),
        to_field_name='name',
    )

    class Meta:
        fields = ('user', 'alboms',)
        model = Photo
