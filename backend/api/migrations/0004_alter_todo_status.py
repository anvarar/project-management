# Generated by Django 5.0.1 on 2024-04-22 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_project_todo_delete_addrequest_delete_addtask_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='status',
            field=models.CharField(max_length=255),
        ),
    ]
