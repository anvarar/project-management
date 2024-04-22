from django import forms
from .models import project,todo
from django.contrib.auth.models import User
class addproject(forms.ModelForm):
    class Meta:
        model=project 
        fields=['projecttitle','createddate']
    # def clean_teamlead(self):
    #     teamlead = self.cleaned_data.get('teamlead')
    #     if teamlead:
    #         user_exists = User.objects.filter(username=teamlead).exists()
    #         if not user_exists:
    #             raise forms.ValidationError('The team lead must be a valid username.')
    #     return teamlead
          
class addtodoform(forms.ModelForm):
     class Meta:
         model=todo
         fields='__all__'