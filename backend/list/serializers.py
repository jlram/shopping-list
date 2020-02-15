# list/serializers.py
from rest_framework import serializers
from .models import ListItem


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'is_completed',
        )
        model = ListItem