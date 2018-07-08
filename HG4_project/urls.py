"""HG4_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from deneme import views as deneme_views
from django.contrib.auth.views import login,logout
from django.contrib.auth.models import User
from  django.conf.urls.static import static
from  django.conf import settings
urlpatterns = [
    url(r'^$',deneme_views.indexpage),
    url(r'^admin/', admin.site.urls),
    url(r'^(?P<id>\d+)/$', deneme_views.detay),
    url(r'^anasayfa/$', deneme_views.deneme_anasayfa),
    url(r'^reset/$', deneme_views.reset),
    url(r'^post/$', deneme_views.post),
    url(r'^postkat/$', deneme_views.katekle),
    url(r'^(?P<id>\d+)/update/$', deneme_views.post_update),
    url(r'^(?P<id>\d+)/delete/$', deneme_views.post_delete),
    url(r'^(?P<id>\d+)/kategoriIndex/$', deneme_views.kategoriIndex),
  #  url(r'^login/$', login,deneme_views.login_request),
    url(r'^profil/$', deneme_views.profil),
   # url(r'^register/$', deneme_views.register,name='register'),

    url(r'^logout/$',logout,{'template_name':'logout.html'}),
    url(r'^login/$', deneme_views.login_request,name='login'),#login, {'template_name': 'login.html'}),#deneme_views.logout_request),
    #url(r'^accounts/',include('accounts.urls')),
    url(r'^register/$', deneme_views.register_view,name='register'),
    url(r'^profil/edit/$',deneme_views.edit_profil,name='edit_profil'),





   # url('r^post', deneme.views.deneme_anasayfa)
#url(r'^HG4_projects/', include('deneme.urls')),

   # url(r'^deneme/$', deneme.views.deneme_home),

   # url(r'^reset/$', reset),
    #  url(r'^post/$', post),
 #   url(r'^login/$', login),
    #   url(r'^kategoriIndex/$', kategoriIndex),
    #    url(r'^profil/$', profil),
    #   url(r'^Signup/$', Signup),
    #    url(r'^detay/$', detay),
    #  url(r'^deneme/$', include('deneme.views.deneme_home')),
    #url(r'^deneme/$', 'deneme.views.deneme_home')
  #  url(r'^deneme/$', deneme.views.deneme_home, name='deneme'),
]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)