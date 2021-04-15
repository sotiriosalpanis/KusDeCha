from django.urls import path
from .views import DigitalImageListView

urlpatterns = [
    path('',DigitalImageListView.as_view())
]