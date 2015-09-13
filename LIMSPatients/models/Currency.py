
from django.db import models
from django.utils.translation import ugettext_lazy as _
from MedicalApp import settings


# Create your models here.
class Currency(models.Model):
    class Meta(object):
        verbose_name = _('currency')
        verbose_name_plural = _('currencies')
    name = models.CharField(_("name"), max_length=3, default=settings.DEFAULT_CURRENCY_USED)
    info = models.CharField(_("info"), max_length=255, blank=True)

    def _get_exchange_rate(self):
        "Returns the person's full name."
        return '%s %s' % (self.first_name, self.last_name)

