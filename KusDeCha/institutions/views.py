from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Institution
from .serializers.common import InstitutionSerializer

class InstitutionListView(APIView):

    def get(self,_request):
        institutions = Institution.objects.all()
        serialized_institutions = InstitutionSerializer(institutions, many=True)
        return Response(serialized_institutions.data, status=status.HTTP_200_OK)
