from django.urls import path
from .views import ScrapbookListView, ScrapbookDetailView

urlpatterns = [
    path('',ScrapbookListView.as_view()),
    path('<int:pk>/',ScrapbookDetailView.as_view())
]