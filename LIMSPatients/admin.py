from django.contrib import admin

# Register your models here.
from .models import *

# Register your models here.
admin.site.register(MedicalPatient)
admin.site.register(InsuranceInstitute)
admin.site.register(MedicalPhysician)
admin.site.register(MedicalSpeciality)