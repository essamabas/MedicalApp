from django.shortcuts import render

# Create your views here.
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from authentication.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

class AuthView(APIView):
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        #Source: https://docs.djangoproject.com/en/1.8/topics/auth/default/#django.contrib.auth.authenticate
        username = request.DATA['username']
        password = request.DATA['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return Response(UserSerializer(request.user,context={'request': request}).data)
        else:
            return Response({})

    def delete(self, request, *args, **kwargs):
        logout(request)
        return Response({})

    def get(self, request, format=None):
        content = {
            'user': unicode(request.email),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.password),  # None
        }
        return Response(content)