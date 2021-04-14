from django.urls import path
from .views import InstitutionListView, InstitutionDetailView

urlpatterns = [
    path('',InstitutionListView.as_view()),
    path('<int:pk>/',InstitutionDetailView.as_view())
]