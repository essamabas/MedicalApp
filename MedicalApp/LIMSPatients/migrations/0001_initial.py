# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='InsuranceInstitue',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=200, verbose_name='name')),
                ('address', models.TextField(null=True, verbose_name='address', blank=True)),
                ('general_info', models.TextField(null=True, verbose_name='General Information', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalPatient',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=255, verbose_name='first_name')),
                ('last_name', models.CharField(max_length=255, verbose_name='last_name')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='created on')),
                ('updated_on', models.DateTimeField(auto_now=True, verbose_name='updated on')),
                ('death_date', models.DateField(null=True, verbose_name='death_date', blank=True)),
                ('birth_date', models.DateField(verbose_name='birth_date')),
                ('gender', models.CharField(max_length=10, verbose_name='gender', choices=[(b'Male', b'Male'), (b'Female', b'Female')])),
                ('general_info', models.TextField(null=True, verbose_name='General Information', blank=True)),
                ('marital_status', models.CharField(max_length=10, verbose_name='marital_status', choices=[(b'Single', b'Single'), (b'Widowed', b'Widowed'), (b'Divorced', b'Divorced'), (b'Married', b'Married')])),
                ('active', models.BooleanField(default=True, help_text=b'Flag to indicate that the patient is active. - it can be compared with last activity date, such as: updated_on/...')),
                ('insurance_id', models.CharField(unique=True, max_length=255, verbose_name='insurance_id')),
                ('insurance_institue', models.ForeignKey(to='LIMSPatients.InsuranceInstitue', unique=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, unique=True)),
            ],
            options={
                'verbose_name': 'medicalpatient',
                'verbose_name_plural': 'medicalpatients',
            },
        ),
    ]
