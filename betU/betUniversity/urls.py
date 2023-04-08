from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
<<<<<<< HEAD
    path('events', views.events, name="events"),
    path('events/<id>', views.events)
=======
>>>>>>> e430f0b88c8627c4ca4657f5b35059be866ef9aa
]