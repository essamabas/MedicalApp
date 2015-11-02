
from datetime import datetime
from django.db import models
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

# Create your models here.
class MedicalSpeciality(models.Model):
	name = models.CharField(_("name"), max_length=255, blank=False)

# -----------------------
#Serialization Class
# -----------------------
class MedicalSpecialitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MedicalSpeciality