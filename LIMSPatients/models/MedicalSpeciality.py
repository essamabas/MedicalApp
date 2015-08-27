
from datetime import datetime
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class MedicalSpeciality(models.Model):
	name = models.CharField(_("name"), max_length=255, blank=False)