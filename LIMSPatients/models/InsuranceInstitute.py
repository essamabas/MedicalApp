
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class InsuranceInstitute(models.Model):
    name = models.CharField(_("name"), max_length=200, unique=True)
    address = models.TextField(_("address"), null=True, blank=True)
    general_info = models.TextField(_("General Information"), null=True, blank=True)
    #medical_center_ids = models.ManyToManyField()
    MARTIAL_CHOICES = (
		('Single', 'Single'),
		('Widowed', 'Widowed'),
		('Divorced', 'Divorced'),
		('Married', 'Married'),		
	)
    insurance_institue_type = models.CharField(_("Insurance Type"),max_length=20, 
											   choices=(
			('state', 'State'),
			('labour_union', 'Labour Union / Syndical'),
			('private', 'Private'),
			), default='private')