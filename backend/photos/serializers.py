from rest_framework import serializers

from .models import Photo, Albom, PhotoCarousel


class AlbomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albom
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    alboms = AlbomSerializer(many=True, read_only=True)

    class Meta:
        model = Photo
        fields = ['image', 'id', 'description', 'alboms']


class PhotoNotSafeMetodSerialaizer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['image', 'id', 'description', 'alboms']

    def validate_albom(self, alboms):
        unique_albom = []
        if not alboms:
            raise serializers.ValidationError(
                'Нужно выбрать хотя бы 1 альбом!'
            )
        for albom in alboms:
            if albom in unique_albom:
                raise serializers.ValidationError(
                    'Альбомы в поле должны быть уникальными, выберете другой.'
                )
            unique_albom.append(albom)
        return alboms

    def create(self, validated_data):
        alboms = validated_data.pop('alboms')
        photo = Photo.objects.create(**validated_data)
        photo.alboms.set(alboms)
        return photo

    def update(self, instance, validated_data):
        alboms = validated_data.pop('alboms')
        instance.alboms.clear()
        instance.alboms.set(alboms)
        super().update(instance, validated_data)
        instance.save()
        return instance


class PhotoCarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoCarousel
        fields = ['id', 'image', 'description']
