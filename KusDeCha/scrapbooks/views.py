from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Scrapbook
from .serializers.common import ScrapbookSerializer

class ScrapbookListView(APIView):

    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def get(self,_request):
        scrapbooks = Scrapbook.objects.all()
        serialized_scrapbooks = ScrapbookSerializer(scrapbooks, many=True)
        return Response(serialized_scrapbooks.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["creator"] = request.user.id
        scrapbook_to_create = ScrapbookSerializer(data=request.data)
        if scrapbook_to_create.is_valid():
            scrapbook_to_create.save()
            return Response(scrapbook_to_create.data, status=status.HTTP_200_OK)
        return Response(scrapbook_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ScrapbookDetailView(APIView):

    def get_scrapbook(self, pk):
        try:
            return Scrapbook.objects.get(pk=pk)
        except Scrapbook.DoesNotExist:
            raise NotFound(detail="Cannot find that scrapbook")
    
    def get(self,_request,pk):
        scrapbook = self.get_scrapbook(pk=pk)
        serialized_scrapbook = ScrapbookSerializer(scrapbook)
        return Response(serialized_scrapbook.data, status=status.HTTP_200_OK)

