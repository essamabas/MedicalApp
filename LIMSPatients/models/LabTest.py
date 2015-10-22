

from django.db import models
from django.utils.translation import ugettext_lazy as _

# Ref: https://github.com/OCA/vertical-medical/blob/9.0/oemedical_lab/models/oemedical_lab.py
# Create your models here.
class LabTest(models.Model):
    name = models.CharField(_("name"), max_length=255, blank=False)
	code = models.TextField(_("code"), null=True, blank=True, max_length=10, help_text="Code Name for the test")
    general_info = models.TextField(_("General Information"), null=True, blank=True)
    price = models.DecimalField(_("price"),max_digits=19, decimal_places=10)
	
class TestUnit(models.Model):
    unit = models.CharField(_("Unit"), max_length=25, blank=False)
	code = models.TextField(_("code"), null=True, blank=True, max_length=10, help_text="Code Name for the Test Unit")
    

