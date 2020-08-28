from django.shortcuts import render
from django.views import View
from django.shortcuts import redirect
from django.http import JsonResponse
from django.forms.models import model_to_dict

from .models import Task
from .forms import TaskForm

class TaskList(View):
    def get(self, request):
        form = TaskForm()
        tasks = Task.objects.all()
        return render(request, 'task/task_list.html', context={'form':form, 'tasks':tasks})

    def post(self, request):
        form = TaskForm(request.POST)

        if form.is_valid():
            new_task = form.save()
            return JsonResponse({'task':model_to_dict(new_task)}, status=200)
        else:
            return redirect('task-list-url')

class TaskDelete(View):
    def post(self,request,id):
        tasks = Task.objects.get(id=id)
        tasks.delete()
        return JsonResponse({'result': 'ok'}, status=200)