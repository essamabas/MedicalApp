from django.contrib import admin

# Register your models here.
from .models import *

# Register your models here.
admin.site.register(Patient)
admin.site.register(InsuranceInstitute)
admin.site.register(Physician)
admin.site.register(MedicalSpeciality)
admin.site.register(TestUnit)
admin.site.register(TestCriteria)
admin.site.register(LabTest)