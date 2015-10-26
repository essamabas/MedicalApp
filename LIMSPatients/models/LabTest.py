__author__ = 'essam.abas'



from django.db import models
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

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

class TestType(models.Model):
    name = models.CharField(_("name"), max_length=255, blank=False)
    code = models.TextField(_("code"), null=True, blank=True, unique=True, max_length=10, help_text="Code Name for the test")
    info = models.TextField(_("info"), null=True, blank=True)
    price = models.DecimalField(_("price"),max_digits=19, decimal_places=10)
    test_criteria = models.ForeignKey(TestCriteria)
    # combine Result - if combination of TestCriteria makes another logic
    result = models.CharField(_("result"),max_length=10, choices=TEST_CHOICES, blank=True)
    # Reference to self - LabTest may include sub-Tests
    sub_tests= models.ManyToManyField('self',null=True,blank=True)

class TestUnit(models.Model):
    unit = models.CharField(_("unit"), max_length=25, blank=False, unique=True)
    code = models.TextField(_("code"), null=True, blank=True, max_length=10, unique=True, help_text="Code Name for the Test Unit")

# Test-Criteria - to define, when LabTest is Passed, Failed, Neutral 
class TestCriteria(models.Model):
    unit = models.CharField(_("unit"), max_length=25, blank=False)
    range = models.TextField(_("range"), blank=False, max_length=10, help_text="Range Criteria for certain Test")
    info = models.TextField(_("info"), null=True, blank=True)	
    test_criteria = models.ForeignKey(TestUnit)
    result = models.CharField(_("result"),max_length=10, choices=TEST_CHOICES, blank=False)

class LabTest(models.Model):
    name = models.CharField(_("name"), max_length=255, blank=False)
    code = models.TextField(_("code"), null=True, blank=True, unique=True, max_length=10, help_text="Code Name for the test")
    info = models.TextField(_("info"), null=True, blank=True)
    price = models.DecimalField(_("price"),max_digits=19, decimal_places=10)
    test_criteria = models.ForeignKey(TestCriteria)
    # combine Result - if combination of TestCriteria makes another logic
    result = models.CharField(_("result"),max_length=10, choices=TEST_CHOICES, blank=True)
	# diagnosis comment for the test
    diagnosis = models.TextField(_("diagnosis"), null=True, blank=True)
    # Reference to self - LabTest may include sub-Tests
    sub_tests= models.ManyToManyField('self',null=True,blank=True)

class Lab(models.Model):
    patient= models.ManyToManyField('self',null=True,blank=True)
    patient= models.ManyToManyField('self',null=True,blank=True)
	
# -----------------------
#	Serialization Classes
# -----------------------
class LabTestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LabTest
