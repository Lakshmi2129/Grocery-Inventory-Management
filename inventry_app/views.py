from django.http import JsonResponse
from .models import *
from django.shortcuts import render,redirect
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.auth.hashers import make_password
from localStoragePy import localStoragePy
from django.contrib.auth import get_user_model
from django.http import QueryDict
from django.db import connection


localStorage = localStoragePy('Grocery', 'text')

auth_user = get_user_model()


def Home(request):
  return render(request, 'index.html')

def login(request):
  return render(request, 'login.html')

def signup(request):
  return render(request, 'signup.html')



def add_signup(request):
  if request.method == 'POST':
      username = request.POST.get('username')
      email = request.POST.get('email')
      password = request.POST.get('password')
      confirm_password = request.POST.get('confirm_password')

      if password != confirm_password:
          return JsonResponse({'res': 'failed', 'msg': 'Passwords do not match'})

      if User.objects.filter(email=email).exists():
          return JsonResponse({'res': "failed", 'msg': 'Email already exists'})

      hashed_password = make_password(password)
      user = User.objects.create(username=username, email=email, password=hashed_password)
      return JsonResponse({'res': "success", 'msg': 'Signup successful'})
  else:
      return JsonResponse({'res': "failed", 'msg': 'Invalid request'})



def add_login(request):
  
  if request.method == 'POST':
    user = auth.authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
    if user is not None and user.is_authenticated:
      auth.login(request, user)
      return JsonResponse({'res': 'success', 'msg': 'Login successful'})
    else:
      return JsonResponse({'res': 'failed', 'msg': 'Invalid credentials'})
  else:
    return render(request, "login.html")
      
      
def add_grocery_item(request):
  
  if request.method == 'POST':
    name=request.POST['name']
    quantity = request.POST['quantity']
    price = request.POST['price']
    data = GroceryItem.objects.filter(name=name)
    if len(data) == 1:
      return JsonResponse({"res":"failed",'msg':"Name and quantity is already Exists!"})
    else:
      GroceryItem.objects.create(name=name,quantity=quantity,price=price)
      return JsonResponse({"res":"success","msg":"Item added Successfully!"})
          
  elif request.method == "GET":
    data =GroceryItem.objects.all()
    api = []
    for i in data:
      api.append({"pk":i.id,"name":i.name,"quantity":i.quantity,"price":i.price})
    return JsonResponse(api,safe=False)
    
  elif request.method == "PUT":
    put = QueryDict(request.body)
    edit = GroceryItem.objects.get(id=put.get('pk'))
    edit.name=put.get('edit_name')
    edit.quantity=put.get('edit_quantity')
    edit.price=put.get('edit_price')
    edit.save()
    return JsonResponse({"res":"success","msg":"Updated Successfully!"})
    
  elif request.method == "DELETE":
    delete = QueryDict(request.body)
    sft =GroceryItem.objects.get(pk=delete.get('pk'))
    sft.delete()
    return JsonResponse({"res":"success","msg":"Deleted Succesfully"})
      


def custom_sql(query):
    cursor = connection.cursor()
    cursor.execute(query)
    row = cursor.fetchall()
    connection.commit()
    connection.close()
    return row


def item_count(request):
  item_count = custom_sql("select count(*) from inventry_app_GroceryItem")
  quantity = custom_sql("select sum(quantity) from inventry_app_GroceryItem")
  price = custom_sql("select sum(price) from inventry_app_GroceryItem")
  return JsonResponse({"item_count":item_count,"quantity":quantity,"price":price})