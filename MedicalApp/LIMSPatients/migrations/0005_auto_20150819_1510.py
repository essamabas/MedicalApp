# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('LIMSPatients', '0004_insuranceinstitue_insurance_institue_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalPhysician',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=255, verbose_name='first_name')),
                ('last_name', models.CharField(max_length=255, verbose_name='last_name')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='created on')),
                ('updated_on', models.DateTimeField(auto_now=True, verbose_name='updated on')),
                ('active', models.BooleanField(default=True, help_text=b'Flag to indicate that the Physician is active. - relative to appointments, etc..')),
            ],
            options={
                'verbose_name': 'medicalphysician',
                'verbose_name_plural': 'medicalphysicians',
            },
        ),
        migrations.CreateModel(
            name='MedicalSpeciality',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name='name')),
            ],
        ),
        migrations.AlterField(
            model_name='medicalpatient',
            name='active',
            field=models.BooleanField(default=True, help_text=b'Flag to indicate that the patient is active. - it can be compared with last activity date, such as: updated_on/death_date/..'),
        ),
        migrations.AlterField(
            model_name='medicalpatient',
            name='birth_date',
            field=models.DateField(verbose_name='birth date'),
        ),
        migrations.AlterField(
            model_name='medicalpatient',
            name='death_date',
            field=models.DateField(help_text=b'Death Date of the Patient', null=True, verbose_name='death date', blank=True),
        ),
        migrations.AlterField(
            model_name='medicalpatient',
            name='first_name',
            field=models.CharField(max_length=255, verbose_name='first name'),
        ),
        migrations.AlterField(
            model_name='medicalpatient',
            name='last_name',
            field=models.CharField(max_length=255, verbose_name='last name'),
        ),
        migrations.AddField(
            model_name='medicalphysician',
            name='specialty',
            field=models.ManyToManyField(to='LIMSPatients.MedicalSpeciality'),
        ),
        migrations.AddField(
            model_name='medicalphysician',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, unique=True),
        ),
    ]
