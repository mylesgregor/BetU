from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets, permissions
from django.contrib.auth.models import *
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.forms import modelformset_factory, formset_factory
from django.core.exceptions import ValidationError
from django.template.loader import render_to_string
from django.template import RequestContext
from django.http import JsonResponse
from django.core.mail import send_mail
import betU
from django.http import HttpResponse
import itertools
import random

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from betUniversity.models import User, Events, Bets
from betUniversity.serializers import UserSerializer, EventsSerializer, BetsSerializer



@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'PUT'])
def event_list(request):
    if request.method == 'GET':
        events = Events.objects.all()
        serializer = EventsSerializer(events, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        event = Events.objects.get(pk=pk)
    except Events.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventsSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EventsSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)

def handler404(request, exception, template_name="betUniversity/404.html"):
    response = render(request, template_name)
    response.status_code = 404
    return response

def handler500(request, template_name="betUniversity/500.html"):
    response = render(request, template_name)
    response.status_code = 500
    return response

def index(request):
    return HttpResponse("Hello, world. You're at the betU index (homepage).")

def events(request):
    page_title = 'Events'
    url_parameter = request.GET.get("q")
    return render(request, 'betUniveristy/events.html', events)

def profile(request):
    page_title = 'Events'
    url_parameter = request.GET.get("q")
    return render(request, 'betUniveristy/events.html', profile)