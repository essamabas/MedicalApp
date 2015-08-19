# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('LIMSPatients', '0002_auto_20150818_1426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalpatient',
            name='insurance_id',
            field=models.CharField(unique=True, max_length=255, verbose_name='insurance_id'),
        ),
        migrations.AlterField(
            model_name='medicalpatient',
            name='insurance_institue',
            field=models.ForeignKey(to='LIMSPatients.InsuranceInstitue'),
        ),
    ]
