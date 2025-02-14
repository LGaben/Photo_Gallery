from django.db import models
from django.contrib.auth.models import User


class Albom(models.Model):
    name = models.CharField(
        max_length=200,
        verbose_name='Название'
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name[:50]


class Photo(models.Model):
    name = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='photos/', blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    alboms = models.ManyToManyField(
        Albom,
        verbose_name='Список альбомов')
    def __str__(self):
        return f"{self.user.username}"


class PhotoCarousel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photos/', blank=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}"
