from __future__ import  unicode_literals
from django.http import HttpResponse
from django.shortcuts import render,redirect,get_object_or_404,HttpResponseRedirect
from .models import Halk_User
from django.http.response import  HttpResponseRedirect
from django.contrib.auth import authenticate,login,logout
from .forms import LoginForm,RegisterForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm
from .models import Postumuz,Kategori
from .forms import PostForm,ModelForm,CommentForm,KatForm
from django.contrib import  messages
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.db.models import Q
import time

# Create your views here.
def indexpage(request):
    if request.user.is_authenticated():
        context={
            'isim':request.user.username,
        }
    else:
        context = {
            'isim': 'Misafir',
        }
    pop_list=Postumuz.objects.all()
    query = request.GET.get('search')
    if query:
        pop_list=pop_list.filter(
            Q(baslik__icontains=query) |
            Q(user__username__icontains=query)|
            Q(kat__katadi__icontains=query)
        ).distinct()
    paginator=Paginator(pop_list,15)
    page=request.GET.get('page')
    try:
        pop=paginator.page(page)
    except PageNotAnInteger:
        pop=paginator.page(1)
    except EmptyPage:
        pop=paginator.page(paginator.num_pages)
    kat_list=Kategori.objects.all()

    return render(request,'index.html',{'pop':pop,'isim':context,'kat':kat_list})
def deneme_anasayfa(request):
   return render(request,"index.html")
def reset(request):
   return render(request,'reset.html')
def post(request):


      form=PostForm(request.POST or None,request.FILES or None)
      if form.is_valid():
          post=form.save(commit=False)
          post.user=request.user
          katkat = request.POST.get('katkat')

          post.kat.id=katkat
          post.save()
          messages.success(request,'Başarılı bir şekilde yolladınız...')
          return HttpResponseRedirect('/')
      context={
          'form':form,
      }
      if request.user.is_authenticated():
          context1 = {
              'isim': request.user.username,
          }
      else:
          context1 = {
              'isim': 'Misafir',
          }
      kata_list=Kategori.objects.all()
      return  render(request,'post.html',{'form':form,'isim':context1,'kat':kata_list})
def gir(request):
   return render(request,'login.html')

def login_request(request):

   if request.user.is_authenticated():
      return redirect('/profil')
   form = LoginForm(request.POST or None)
   if request.method == 'POST':
      form = LoginForm(request.POST)
      if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
        return redirect('/')
       # form = LoginForm()
  # context = {'form': form}
   return render(request, 'login.html', {'form': form})

def kategoriIndex(request,id):
    kat_list = Postumuz.objects.filter(kat__id=id)
    kat2_list = Kategori.objects.all
    if request.user.is_authenticated():
        context1 = {
            'isim': request.user.username,
        }
    else:
        context1 = {
            'isim': 'Misafir',
        }
    pop_list = Postumuz.objects.all()
    query = request.GET.get('search')
    if query:
        pop_list = pop_list.filter(
            Q(baslik__icontains=query) |
            Q(user__username__icontains=query) |
            Q(kat__katadi__icontains=query)
        ).distinct()
        return render(request, 'index.html', {'pop': pop_list})
    return render(request,'kategoriIndex.html',{'da':kat_list,'kat':kat2_list,'isim':context1})

def profil(request):
    if request.user.is_authenticated():
        context={
            'kullaniciadi': request.user.username,
            'isim':request.user.first_name,
            'mail':request.user.email,

        }
    if request.user.is_authenticated():
        context2={
            'isim':request.user.username,
        }
    pop_list = Postumuz.objects.all()
    query = request.GET.get('search')
    if query:
        pop_list = pop_list.filter(
            Q(baslik__icontains=query) |
            Q(user__username__icontains=query) |
            Q(kat__katadi__icontains=query)
        ).distinct()
        return render(request, 'index.html', {'pop': pop_list})
    kat2_list = Kategori.objects.all
    current_user=request.user

    po_list = Postumuz.objects.filter(user__id=current_user.id)
    return render(request,'profil.html',{'kullanici':context,'kat':kat2_list,'isim':context2,'ada':po_list})
def Signup(request):
   return render(request,'Signup.html',{})
def detay(request,id):
    if request.user.is_authenticated():
        context1 = {
            'isim': request.user.username,
        }
    else:
        context1 = {
            'isim': 'Misafir',
        }
    pos = get_object_or_404(Postumuz, id=id)
    form = CommentForm(request.POST or None)
    if form.is_valid():
        comment = form.save(commit=False)
        comment.post = pos
        comment.save()
        return HttpResponseRedirect('/' + id)
    context = {
        'post': pos,

    }
    context2 = {

        'form': form,
    }
    pop_list = Postumuz.objects.all()
    query = request.GET.get('search')
    if query:
        pop_list = pop_list.filter(
            Q(baslik__icontains=query) |
            Q(user__username__icontains=query) |
            Q(kat__katadi__icontains=query)
        ).distinct()
        return render(request, 'index.html', {'pop': pop_list})
    kat2_list = Kategori.objects.all
    return render(request,'detay.html',{'post':pos,'isim':context1,'form':form,'kat':kat2_list})
def logout_request(request):
    logout(request)
    return HttpResponseRedirect('/')
def post_update(request,id):
    print ("asdas")
    pos = get_object_or_404(Postumuz, id=id)
    form = PostForm(request.POST or None,request.FILES or None,instance=pos)

    if form.is_valid():
        form.save()
        messages.success(request, 'Başarılı bir şekilde güncellediniz...')
        context={
            'form': form,
        }
        return HttpResponseRedirect('/'+id )
    else:
        context = {
            'form': form,
        }
    return render(request,'post.html',context)
#def register(request):
#    if request.method=='POST':
#        form=UserCreationForm(request.POST)
#        if form.is_valid():
#            form.save()
#            return HttpResponseRedirect('/deneme/anasayfa'),
#        else:
#            form=UserCreationForm()
#
#            args={'form':form}
#            return HttpResponseRedirect(request,'Signup.html',args)
def register_view(request):
    form =RegisterForm(request.POST  or None)
    if form.is_valid():
      #  user = form.save(commit=False)
        password=form.cleaned_data.get('password1')
        username = form.cleaned_data.get('username')
        user = User(password=password, username=username)
        user.save()
        halk_user = Halk_User(vatandas=user)  # .set_password(password)
        halk_user.save()

        #new_user=authenticate(username=user.username,password=password)
        login(request,user)
        return  redirect('/')
    return render(request,'Signup.html',{'form':form})


def edit_profil(request):
   if request.method == 'POST':
      form = UserChangeForm(request.POST, instance=request.user)

      if form.is_valid():
         form.save()
         return redirect('/profil')
   else:
    form = UserChangeForm(instance=request.user)
    args = {'form:form'}
    return render(request, 'editprofil.html', args)

def post_delete(request,id):
    pos = get_object_or_404(Postumuz, id=id)
    pos.delete()

    return  redirect('/profil')


def katekle(request):
    form = KatForm(request.POST or None)
    if form.is_valid():
        post = form.save(commit=False)
        post.save()

        return HttpResponseRedirect('/')
    context = {
        'form': form,
    }

    return render(request, 'postkat.html', {'form': form})