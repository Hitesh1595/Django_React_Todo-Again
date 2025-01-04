from rest_framework import serializers

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """ Serializers for Todo """

    class Meta:
        model = Todo
        fields = ["id", "title", "description", "completed"]
        read_only_fields = ['id']
