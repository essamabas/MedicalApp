

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator

from rest_framework import serializers
from General.models.Patient import *
from General.models.Physician import *

# -----------------------
#	Model Classes
# -----------------------
# Ref: https://github.com/OCA/vertical-medical/blob/9.0/oemedical_lab/models/oemedical_lab.py
# Create your models here.
TEST_CHOICES = (
    ('Passed', 'Passed'),
    ('Failed', 'Failed'),
    ('Neutral', 'Neutral'),
)

class TestUnit(models.Model):
    unit = models.CharField(_("unit"), max_length=252, blank=False, unique=True)
    code = models.CharField(_("code"), null=True, blank=True, max_length=255, unique=True, help_text="Code Name for the Test Unit")
    info = models.TextField(_("info"), null=True, blank=True)

# Test-Criteria - to define, when LabTest is Passed, Failed, Neutral 
class TestCriteria(models.Model):
    unit = models.CharField(_("unit"), max_length=25, blank=False)
	#ToDo: implement range as expression to set results automatically
    min_allowed = models.DecimalField(_("min_allowed"), max_digits=19, decimal_places=10, blank=False, help_text="Minimum allowed value of Range Criteria for certain Test")
    max_allowed = models.DecimalField(_("max_allowed"), max_digits=19, decimal_places=10, blank=False, help_text="Maximum allowed value of Range Criteria for certain Test")
    info = models.TextField(_("info"), null=True, blank=True)	
    test_unit = models.ForeignKey("TestUnit")
    result = models.CharField(_("result"),max_length=10, choices=TEST_CHOICES, blank=False)

    def _get_result(self):
        return self._result

    def _set_result(self, value):
        if value >= self.min_allowed:
            self.result = TEST_CHOICES['Passed']
        elif value <= self.max_allowed:
            self.result = TEST_CHOICES['Passed']
        else:
            self._result = TEST_CHOICES['Failed']
    _result = property(_get_result, _set_result)

class LabTest(models.Model):
    # model stuff here
    #class Meta:
        #permissions = (
        #    ( "read_car", "Can read Car" ),
        #)
    name = models.CharField(_("name"), max_length=255, blank=False)
    code = models.CharField(_("code"), null=True, blank=True, unique=True, max_length=255, help_text="Code Name for the test")
    info = models.TextField(_("info"), null=True, blank=True)
    price = models.DecimalField(_("price"),max_digits=19, decimal_places=5, validators=[MinValueValidator(0.001)])
    test_criteria = models.ManyToManyField('TestCriteria', blank=True)
    # combine Result - if combination of TestCriteria makes another logic
    result = models.CharField(_("result"),max_length=10, choices=TEST_CHOICES, blank=True)
    # Reference to self - LabTest may include sub-Tests
    sub_tests= models.ManyToManyField('self', blank=True)

    patient= models.ManyToManyField(Patient, blank=False)
    pathologist= models.ManyToManyField(Physician, blank=True, help_text="Pathologists who performed the test",related_name="pathologist")
    requestor= models.ManyToManyField(Physician, blank = False, help_text="Doctor who requested the test",related_name="requestor")
    date_requested = models.DateTimeField(_("date_requested"), blank = True, help_text="The Date on which the test is requested")
    date_analysis = models.DateTimeField(_("date_analysis"), blank = True, help_text="Date of the Analysis")
    # diagnosis comment for the test
    diagnosis = models.TextField(_("diagnosis"), null=True, blank=True)

# -----------------------
#	Serialization Classes
# -----------------------
class LabTestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LabTest
