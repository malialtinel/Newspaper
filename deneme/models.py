from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class Halk_User(models.Model):
    vatandas=models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,

    )
    def __str__(self):
        return self.vatandas.last_name + ", " + self.vatandas.first_name

class Deneme(models.Model):
    f = models.TextField()

class Postumuz(models.Model):
    user=models.ForeignKey('auth.User',verbose_name='Yazar',related_name='posts')
    kat=models.ForeignKey('Kategori',verbose_name='Kategori',related_name='posts')
    baslik=models.CharField(max_length=120,verbose_name="Başlık")
    content=RichTextField(verbose_name="İçerik")
    tarihi=models.DateTimeField(verbose_name="Yayımlanma Tarihi",auto_now_add=True)
    image=models.FileField(null=True,blank=True)
    def __str__(self):
        return  self.baslik
# Create your models here.
class Comment(models.Model):
    post=models.ForeignKey('Postumuz',on_delete=models.CASCADE,related_name='comments')
    name=models.CharField(max_length=400,verbose_name='isim')
    content=models.TextField(verbose_name='Yorum')

    created_date=models.DateTimeField(auto_now_add=True)
class Kategori(models.Model):
    katadi=models.CharField(max_length=30,verbose_name='kategoriadi')
    def __str__(self):
        return  self.katadi

