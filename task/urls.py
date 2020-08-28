from django.contrib import admin
from django.urls import path
from .views import TaskList, TaskDelete

urlpatterns = [
    path('', TaskList.as_view(), name='task-list-url'),
    path('<str:id>/delete/', TaskDelete.as_view(), name='task-delete-url'),
]