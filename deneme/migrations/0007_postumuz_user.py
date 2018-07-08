# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-12 20:34
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('deneme', '0006_auto_20180112_2250'),
    ]

    operations = [
        migrations.AddField(
            model_name='postumuz',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Yazar'),
            preserve_default=False,
        ),
    ]
