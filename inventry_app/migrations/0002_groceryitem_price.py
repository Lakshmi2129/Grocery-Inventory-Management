# Generated by Django 4.2 on 2023-12-26 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventry_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='groceryitem',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]