from rest_framework import serializers
from ..models import Scrapbook

class ScapbookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scrapbook
        fields = '__all__'