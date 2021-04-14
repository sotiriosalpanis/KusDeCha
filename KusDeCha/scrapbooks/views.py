from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Scrapbook
from .serializers.common import ScapbookSerializer

class ScrapbookListView(APIView):

    def get(self,_request):
        scrapbooks = Scrapbook.objects.all()
        serialized_scrapbooks = ScapbookSerializer(scrapbooks, many=True)
        return Response(serialized_scrapbooks.data, status=status.HTTP_200_OK)

class ScrapbookDetailView(APIView):

    def get_scrapbook(self, pk):
        try:
            return Scrapbook.objects.get(pk=pk)
        except Scrapbook.DoesNotExist:
            raise NotFound(detail="Cannot find that scrapbook")
    
    def get(self,_request,pk):
        scrapbook = self.get_scrapbook(pk=pk)
        serialized_scrapbook = ScapbookSerializer(scrapbook)
        return Response(serialized_scrapbook.data, status=status.HTTP_200_OK)
