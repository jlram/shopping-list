from django.shortcuts import render

from rest_framework import generics

from .models import ListItem
from .serializers import ListItemSerializer

class ListItems(generics.ListCreateAPIView):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer