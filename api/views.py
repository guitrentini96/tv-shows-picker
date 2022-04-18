from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from .models import *

# Create your views here.


class ShowView(viewsets.ModelViewSet):
    serializer_class = ShowSerializer
    queryset = Show.objects.all()


class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class OptionView(viewsets.ModelViewSet):
    serializer_class = OptionSerializer
    queryset = Option.objects.all()
