# Generated by Django 4.2.17 on 2025-01-08 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='description',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
