# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('LIMSPatients', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalpatient',
            name='insurance_id',
            field=models.CharField(max_length=255, verbose_name='insurance_id'),
        ),
    ]
