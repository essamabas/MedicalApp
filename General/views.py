from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, DjangoModelPermissions 

from .models import *

class InsuranceInstituteViewSet(viewsets.ModelViewSet):
    queryset = InsuranceInstitute.objects.all()
    serializer_class = InsuranceInstituteSerializer
    permission_classes = (IsAuthenticated,)

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = (DjangoModelPermissions,)

class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = (DjangoModelPermissions,)
    
    """This view is limited for Patient Profiles of the currently authenticated user"""
    def get_queryset(self):
        """return a list of all the Patients for the currently authenticated user."""
        if self.request.user != None:
        	print self.request.user
        	user = self.request.user
        	return Patient.objects.filter(user=user)
        return Null

    #def retrieve(self, request, pk=None):
    #    """return retrieve only the Patient for the currently authenticated user."""
    #    user = self.request.user
    #    return Patient.objects.filter(user=user)

class PhysicianViewSet(viewsets.ModelViewSet):
    queryset = Physician.objects.all()
    serializer_class = PhysicianSerializer
    permission_classes = (IsAuthenticated,)

class MedicalSpecialityViewSet(viewsets.ModelViewSet):
    queryset = MedicalSpeciality.objects.all()
    serializer_class = MedicalSpecialitySerializer
    permission_classes = (IsAuthenticated,)