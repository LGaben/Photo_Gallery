from django.contrib import admin

from .models import Photo, Albom, PhotoCarousel


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('name', 'image', 'user', 'description')
    list_filter = ('name', 'image', 'user')
    search_fields = ('name', 'image', 'user', 'description')



@admin.register(Albom)
class AlbomAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
    list_filter = ('name', 'user')
    search_fields = ('name', 'user')



@admin.register(PhotoCarousel)
class PhotoCarouselAdmin(admin.ModelAdmin):
    list_display = ('user', 'image', 'description')
    list_filter = ('user', 'image')
    search_fields = ('user', 'description')
