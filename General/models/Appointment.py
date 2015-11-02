
from django.db import models
from django.utils.translation import ugettext_lazy as _
from General.models import Patient

URGENCY_CHOICES = (
    ('Low', 'Low'),
    ('Medium', 'Medium'),
    ('High', 'High'),
)

# Appointments can be initiated: Initial Appointment - created by draft
# Confirm:  means that the appointment will be held in time - with any delay expectations
# Wating:   means that the patient has arrived - the duration of this status - can be used to imporve services
# Done:     means that the appointment has ended successfully 
# Canceled: means that the patient/ or pathologist has canceled the appointment
STATE_CHOICES = (
    ('Initial', 'Initial'),
    ('Confirm', 'Confirm'),
    ('Wating', 'Wating'),
    ('Done', 'Done'),
    ('Canceled', 'Canceled'),
)

# Create your models here.
class Appointment(models.Model):
    class Meta(object):
        verbose_name = _('appointment')
        verbose_name_plural = _('appointments')
    name = models.CharField(_("name"), max_length=255, blank=False)
    code = models.CharField(_("code"), null=True, blank=True, max_length=255, help_text="Code Name for the test")
    comments = models.TextField(_("comments"), null=True, blank=True)
    urgency = models.CharField(_("urgency"),max_length=10, choices=URGENCY_CHOICES, blank=True, default = 'Low')
    state = models.CharField(_("state"),max_length=10, choices=STATE_CHOICES, blank=True, default = 'Initial')
    created_on = models.DateTimeField(_("created on"), auto_now_add=True)
    updated_on = models.DateTimeField(_("updated on"), auto_now=True)
    start_time = models.DateTimeField(_("start_time"), blank = False)
    duration = models.FloatField(_("duration"), blank = False)
	#
    patient= models.ForeignKey('Patient', blank=True, help_text="Choose the Patient")
    pathologist= models.ManyToManyField('Physician', blank=True, help_text="Pathologists who shall meet the patient",related_name="pathologist")
    requestor= models.ManyToManyField('Physician', blank = False, help_text="Pathologists who requested the appointment",related_name="requestor")

    def _get_exchange_rate(self):
        "Returns the person's full name."
        return True