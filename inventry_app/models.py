from django.db import models

class GroceryItem(models.Model):
  name = models.CharField(max_length=200)
  quantity = models.IntegerField(default=0)
  price = models.IntegerField(default=0)

