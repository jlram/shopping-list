# todos/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListItems.as_view()),
    path('<int:pk>/', views.DetailItem.as_view()),
]