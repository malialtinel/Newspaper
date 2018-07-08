# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-11 21:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deneme', '0003_postumuz'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postumuz',
            name='baslik',
            field=models.CharField(max_length=120, verbose_name='Başlık'),
        ),
        migrations.AlterField(
            model_name='postumuz',
            name='content',
            field=models.TextField(verbose_name='İçerik'),
        ),
        migrations.AlterField(
            model_name='postumuz',
            name='tarihi',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Yayımlanma Tarihi'),
        ),
    ]
