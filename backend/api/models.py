from django.db import models


class todo(models.Model):
    description=models.CharField(max_length=255)
    status=models.CharField(max_length=255)
    createddate=models.DateField()
    updateddate=models.DateField()
    
# Create your models here.
class project(models.Model):
    projecttitle=models.CharField(max_length=255)
    createddate=models.DateField()
    list_of_todos= models.ForeignKey(todo, related_name='todos', on_delete=models.CASCADE)






