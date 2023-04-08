from django.db import models
from django.contrib.auth.models import User
from datetime import date

# Create your models here.

class User(models.Model):
    betu_user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.EmailField(max_length=250)
    bu_amount = models.IntegerField() # the amount of BU's the user has

    
class Events(models.Model):
    event_name = models.CharField(max_length = 250) # Name of the specific event to be betted on
    event_deadline = models.DateTimeField()
    over_title = models.CharField(max_length=30, default="Over Title") # The title of the over bet (e.g. win, yes, over)
    under_title = models.CharField(max_length=30, default="Under Title") # The title of the under bet (e.g. loss, no, under)
    over_acc = models.IntegerField(default=0) # The amount of people placing bets on over
    under_acc = models.IntegerField(default=0) # amount of people placing bets on under

class Bets(models.Model):
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    bet = models.BooleanField(default=True) # 1: positive bets (e.g. win, yes, over, etc), 0: negative bets(e.g. loss, no, under, etc)

    

 

