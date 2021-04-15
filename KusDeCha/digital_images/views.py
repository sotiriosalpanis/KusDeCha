from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import DigitalImage
from .serializers.common import DigitalImageSerializer
from .serializers.populated import PopulatedDigitalImageSerializer

class DigitalImageListView(APIView):

    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def get(self,_request):
        digital_images = DigitalImage.objects.all()
        serialized_digital_images = PopulatedDigitalImageSerializer(digital_images, many=True)
        return Response(serialized_digital_images.data, status=status.HTTP_200_OK)

    def post(self,request):
        request.data["creator"] = request.user.id
        digital_image_to_create = DigitalImageSerializer(data=request.data)
        if digital_image_to_create.is_valid():
            digital_image_to_create.save()
            return Response(digital_image_to_create.data, status=status.HTTP_200_OK)
        return Response(digital_image_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
