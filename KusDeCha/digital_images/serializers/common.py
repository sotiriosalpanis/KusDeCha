from rest_framework import serializers
from ..models import DigitalImage

class DigitalImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = DigitalImage
        fields = '__all__'