# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-13 16:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('deneme', '0011_kategori'),
    ]

    operations = [
        migrations.AddField(
            model_name='postumuz',
            name='kat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='deneme.Kategori', verbose_name='Kategori'),
            preserve_default=False,
        ),
    ]
