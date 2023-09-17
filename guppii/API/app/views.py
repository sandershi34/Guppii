from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from app.serializers import UserSerializer, GroupSerializer
from app.models import User
import bcrypt
import secrets



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]



@api_view(['GET'])
def getData(request):
    return Response({'Hello': 'World'})


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    if not username:
        return Response({'Signup': 'No Username Given'})
    alreadyExists = User.objects.filter(username=username).first()
    if alreadyExists:
        return Response({'Signup': 'Username Already Exists'})
    password = request.data.get('password')
    pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(username=username, password_hash=pw_hash)
    user.save()
    return Response({'Signup': 'Success'})


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    if not username:
        return Response({'Login': 'No Username Given'})
    password = request.data.get('password')
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'Login': 'User Does Not Exist'})
    if not bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        return Response({'Login': 'Username or Password Incorrect'})
    user_token = secrets.token_urlsafe(64)
    user.user_token = user_token
    return Response({'Login': 'Success', 'token': user_token})



