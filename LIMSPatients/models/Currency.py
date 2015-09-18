
from django.db import models
from django.utils.translation import ugettext_lazy as _
from MedicalApp import settings
import requests

# Create your models here.
class Currency(models.Model):
    class Meta(object):
        verbose_name = _('currency')
        verbose_name_plural = _('currencies')
    name = models.CharField(_("name"), max_length=3, default=settings.DEFAULT_CURRENCY_USED, unique=True)
    info = models.CharField(_("info"), max_length=255, blank=True)

    def _get_exchange_rate(self):
        "Returns the person's full name."
        r = requests.get('http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("USDEUR")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys')
        #if(r.status_code==200):
            #r.content
        return '%s %s' % (self.first_name, self.last_name)

