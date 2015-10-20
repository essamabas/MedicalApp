
from datetime import datetime
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from .InsuranceInstitute import *

# Create your models here.
class Patient(models.Model):

    class Meta(object):
        verbose_name = _('patient')
        verbose_name_plural = _('patients')

    # Persoanl Info.
    first_name = models.CharField(_("first name"), max_length=255, blank=False)
    last_name = models.CharField(_("last name"), max_length=255, blank=False)
    created_on = models.DateTimeField(_("created on"), auto_now_add=True)
    updated_on = models.DateTimeField(_("updated on"), auto_now=True)	
    user = models.OneToOneField(User, primary_key=True)
    #user = models.ForeignKey(User, unique=True)
    death_date = models.DateField(_("death date"),
                                  help_text="Death Date of the Patient",
                                  null=True, blank=True)
    birth_date = models.DateField(_("birth date"), blank=False)
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )
    gender = models.CharField(_("gender"),max_length=10, choices=GENDER_CHOICES, blank=False)
    general_info = models.TextField(_("General Information"), null=True, blank=True)
    #medical_center_ids = models.ManyToManyField()
    MARTIAL_CHOICES = (
        ('Single', 'Single'),
        ('Widowed', 'Widowed'),
        ('Divorced', 'Divorced'),
        ('Married', 'Married'),
    )
    marital_status = models.CharField(_("marital_status"),max_length=10, choices=MARTIAL_CHOICES)
    active = models.BooleanField(default=True,
                                 help_text="Flag to indicate that the patient is active. - it can be compared with last activity date, such as: updated_on/death_date/..")

    def _get_age(self):
        today = datetime.now()
        #return today.year - self.birth_date.year - ((today.month, today.day) < (self.birth_date.month, self.birth_date.day))
        return str(today.year - self.birth_date.year) + " Years - " + str(today.month - self.birth_date.month+1) + "  Months - " + str(today.day - self.birth_date.day) + " Days"
    age = property(_get_age)

    def _get_full_name(self):
        "Returns the person's full name."
        return '%s %s' % (self.first_name, self.last_name)
    full_name = property(_get_full_name)

    # Insurance Info.
    insurance_institue = models.ForeignKey(InsuranceInstitute)
    insurance_id = models.CharField(_("insurance_id"),max_length=255, unique=True, blank=False)
