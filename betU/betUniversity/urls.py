from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('events', views.event_list, name="event_list"),
    path('events/<id>', views.event_detail, name='event_detail'),
    path('login/', views.login_view, name='login'),
]