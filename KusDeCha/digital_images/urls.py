from django.urls import path
from .views import DigitalImageListView, DigitalImageDetailView

urlpatterns = [
    path('',DigitalImageListView.as_view()),
    path('<int:pk>/',DigitalImageDetailView.as_view())
]