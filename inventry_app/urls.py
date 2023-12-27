from django.urls import path
from .views import *

urlpatterns = [
  path('',Home, name = 'Home'),
  path('add_grocery_item',add_grocery_item, name = 'add_grocery_item'),
  path('login',login,name='login'),
  path('signup',signup,name='signup'),
  path('add_login',add_login,name='add_login'),
  path('add_signup',add_signup,name='add_signup'),
  path('item_count',item_count,name="item_count")

]