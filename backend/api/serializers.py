from rest_framework import serializers
from api.models import project,todo

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = project
        fields =['id','projecttitle','createddate']

class TodoSerializer(serializers.ModelSerializer):
     class Meta:
        model = todo
        fields = '__all__'