from django.contrib import admin

# Register your models here.
from todo.models import Project, User, Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'priority', 'due_date')
    list_filter = ('project',)
    ordering = ('priority',)
    search_fields = ('name',)

admin.site.register(Project)
admin.site.register(Task, TaskAdmin)