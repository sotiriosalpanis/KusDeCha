from digital_images.serializers.common import DigitalImageSerializer
from jwt_auth.serializers.common import UserSerializer
from ..serializers.common import ScrapbookSerializer

class PopulatedScrapbookSerializer(ScrapbookSerializer):
    digital_images = DigitalImageSerializer(many=True)
    creator = UserSerializer()