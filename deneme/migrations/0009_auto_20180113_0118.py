# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-12 22:18
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('deneme', '0008_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postumuz',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL, verbose_name='Yazar'),
        ),
    ]
