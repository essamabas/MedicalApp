from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from LIMSPatients.serializers import *
from LIMSPatients.models import *

class InsuranceInstituteViewSet(viewsets.ModelViewSet):
    queryset = InsuranceInstitute.objects.all()
    serializer_class = InsuranceInstituteSerializer
    permission_classes = (IsAuthenticated,)

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = (IsAuthenticated,)

class PhysicianViewSet(viewsets.ModelViewSet):
    queryset = Physician.objects.all()
    serializer_class = PhysicianSerializer
    permission_classes = (IsAuthenticated,)

class MedicalSpecialityViewSet(viewsets.ModelViewSet):
    queryset = MedicalSpeciality.objects.all()
    serializer_class = MedicalSpecialitySerializer
    permission_classes = (IsAuthenticated,)