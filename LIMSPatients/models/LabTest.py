
from django.db import models
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class LabTest(models.Model):
    name = models.CharField(_("name"), max_length=255, blank=False)
    price = models.DecimalField(_("price"),max_digits=19, decimal_places=10)
