from django.contrib.auth.models import User, Group
from rest_framework import serializers
from todo.models import Project, Task


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')