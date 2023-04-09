from django.contrib import admin
from .models import Users, Event, Bet

# Register your models here.
admin.site.register(Users)
admin.site.register(Event)
admin.site.register(Bet)