

from datetime import datetime
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from .MedicalSpeciality import *

# Create your models here.
class Physician(models.Model):
	# Persoanl Info.
    first_name = models.CharField(_("first_name"), max_length=255, blank=False)
    last_name = models.CharField(_("last_name"), max_length=255, blank=False)
    created_on = models.DateTimeField(_("created on"), auto_now_add=True)
    updated_on = models.DateTimeField(_("updated on"), auto_now=True)
    user = models.OneToOneField(User, primary_key=True)
    active = models.BooleanField(default=True,
                                 help_text="Flag to indicate that the Physician is active. - relative to appointments, etc..")
    specialty = models.ManyToManyField(MedicalSpeciality)

    class Meta(object):
        verbose_name = _('physician')
        verbose_name_plural = _('physicians')
