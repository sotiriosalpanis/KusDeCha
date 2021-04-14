from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Institution
from .serializers.common import InstitutionSerializer

class InstitutionListView(APIView):

    def get(self,_request):
        institutions = Institution.objects.all()
        serialized_institutions = InstitutionSerializer(institutions, many=True)
        return Response(serialized_institutions.data, status=status.HTTP_200_OK)

class InstitutionDetailView(APIView):

    def get_institution(self, pk):
        try:
            return Institution.objects.get(pk=pk)
        except Institution.DoesNotExist:
            raise NotFound(detail="Cannot find the institution requested")

    def get(self, _request, pk):
        institution = self.get_institution(pk=pk)
        serialized_institution = InstitutionSerializer(institution)
        return Response(serialized_institution.data, status=status.HTTP_200_OK)
