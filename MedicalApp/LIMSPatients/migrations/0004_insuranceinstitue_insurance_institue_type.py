# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('LIMSPatients', '0003_auto_20150818_1427'),
    ]

    operations = [
        migrations.AddField(
            model_name='insuranceinstitue',
            name='insurance_institue_type',
            field=models.CharField(default=b'private', max_length=20, verbose_name='Insurance Type', choices=[(b'state', b'State'), (b'labour_union', b'Labour Union / Syndical'), (b'private', b'Private')]),
        ),
    ]
