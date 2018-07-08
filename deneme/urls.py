
from django.conf.urls import url,include
from django.contrib import admin
from .views import (
deneme_home,
reset   ,
post,
login,
kategoriIndex,
profil,
Signup,
detay,
deneme_anasayfa

)


urlpatterns = [

#url(r'^HG4_projects/', include('deneme.urls')),

    url(r'^deneme/$', deneme_home),
    url(r'^deneme_anasayfa/$', deneme_anasayfa),
    url(r'^reset/$', reset),
    url(r'^post/$', post),
    url(r'^login_request/$', login),
    url(r'^kategoriIndex/$', kategoriIndex),
    url(r'^profil/$', profil),
    url(r'^Signup/$', Signup),
    url(r'^(?P<id>\d+)/$', detay),
    url(r'^accounts/',include('accounts.urls')),


]