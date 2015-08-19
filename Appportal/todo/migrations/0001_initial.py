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
            name='Project',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=60)),
                ('slug', models.SlugField(max_length=60, editable=False)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Projects',
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=140)),
                ('created_date', models.DateField(auto_now=True)),
                ('due_date', models.DateField(null=True, blank=True)),
                ('completed', models.BooleanField(default=None)),
                ('completed_date', models.DateField(null=True, blank=True)),
                ('note', models.TextField(null=True, blank=True)),
                ('priority', models.PositiveIntegerField()),
                ('assigned_to', models.ForeignKey(related_name='todo_assigned_to', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(related_name='todo_created_by', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(to='todo.Project')),
            ],
            options={
                'ordering': ['priority'],
            },
        ),
    ]
