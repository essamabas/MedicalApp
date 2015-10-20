from django.contrib.auth.models import User, Group
from rest_framework import serializers
from LIMSPatients.models import *

class InsuranceInstituteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = InsuranceInstitute

class PatientSerializer(serializers.HyperlinkedModelSerializer):
    #full_name = serializers.Field('full_name')
    #full_name = serializers.Field(source='Patient.full_name')
    #user = serializers.HyperlinkedRelatedField(
    #        many=False,
    #        read_only=True,
    #        view_name='user-detail'
    #    )    
    age = serializers.SerializerMethodField()
    class Meta:
        model = Patient

    def get_age(self, obj):
            return str(obj.age)

class PhysicianSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Physician

class MedicalSpecialitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MedicalSpeciality