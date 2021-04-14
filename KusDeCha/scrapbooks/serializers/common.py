from rest_framework import serializers
from ..models import Scrapbook

class ScrapbookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scrapbook
        fields = '__all__'