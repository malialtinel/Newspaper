from django.forms import ModelForm
from django import forms
from .models import Halk_User,Comment,Kategori,Postumuz
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from  django.db import models
from captcha.fields import  ReCaptchaField

from .models import Postumuz,Kategori
class LoginForm(forms.Form):
    username=forms.CharField(label=(u'User Name'))
    password=forms.CharField(label=(u'Password'),widget=forms.PasswordInput(render_value=False))

class RegisterForm(forms.Form):
    username=forms.CharField(label=(u'User Name'))
    password1=forms.CharField(label=(u'Password'),widget=forms.PasswordInput(render_value=False))
    password2=forms.CharField(label=(u'Password Confirm'),widget=forms.PasswordInput(render_value=False))

def clean_password2(self):
    password1=self.cleaned_data.get('password1')
    password2= self.cleaned_data.get('password2')
    if password1 and password2 and password1!=password2:
        raise forms.ValidationError("Parolar Eşleşmiyor")
    return password2
class Meta:
    model=User
    fields=[
        'username',
        'password1',
        'password2'
    ]
#class SignupForm(UserCreationForm):
#    email = forms.EmailField()
#    first_name=forms.CharField()
#     last_name = forms.CharField()
#    username = forms.CharField()
#    password = forms.CharField()
#    class Meta:
#        model = Halk_User
#        fields = (
#            'username',
#            'first_name',
#            'last_name',
#            'email',
#            'password',
#            'email',
#
#       )


def save(self, commit=True):
    user = super(SignupForm, self).save(commit=False)
    user.first_name = self.cleaned_data['first_name']
    user.last_name = self.cleaned_data['last_name']
    user.email = self.cleaned_data['email']
    user.password=self.cleaned_data['password']
    user.username=self.cleaned_data['username']
    if commit:
        user.save()

    return user

class PostForm(forms.ModelForm):
    class Meta:
        model=Postumuz
        fields=[
            'baslik',
            'content',
            'image',
            'kat',

        ]
#class EditProfileForm(UserChangeForm):
#    class Meta:
#        model: Halk_User
#        fields = (
#            'email',
#            'first_name',
#            'last_name'
#            'password',
#            'email',
#        )
class CommentForm(forms.ModelForm):
    captcha=ReCaptchaField()
    class Meta:
        model=Comment
        fields=[
            'name',
            'content',
        ]
class KatForm(forms.ModelForm):

    class Meta:
        model=Kategori
        fields=[
            'katadi',

        ]