from institutions.serializers.common import InstitutionSerializer
from jwt_auth.serializers.common import UserSerializer
from ..serializers.common import DigitalImageSerializer

class PopulatedDigitalImageSerializer(DigitalImageSerializer):
    origin_institution = InstitutionSerializer()
    creator = UserSerializer()