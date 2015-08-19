from __future__ import unicode_literals
import datetime

from django.db import models
from django.contrib.auth.models import User, Group
from django.template.defaultfilters import slugify
from django.core.urlresolvers import reverse
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class Project(models.Model):
    name = models.CharField(max_length=60)
    slug = models.SlugField(max_length=60, editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

        super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    # Custom manager lets us do things like Item.completed_tasks.all()
    objects = models.Manager()

    def incomplete_tasks(self):
        # Count all incomplete tasks on the current list instance
        return Task.objects.filter(project=self, completed=0)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Projects"


@python_2_unicode_compatible
class Task(models.Model):
    title = models.CharField(max_length=140)
    project = models.ForeignKey(Project)
    created_date = models.DateField(auto_now=True)
    due_date = models.DateField(blank=True, null=True, )
    completed = models.BooleanField(default=None)
    completed_date = models.DateField(blank=True, null=True)
    created_by = models.ForeignKey(User, related_name='todo_created_by')
    assigned_to = models.ForeignKey(User, related_name='todo_assigned_to')
    note = models.TextField(blank=True, null=True)
    priority = models.PositiveIntegerField()

    # Model method: Has due date for an instance of this object passed?
    def overdue_status(self):
        "Returns whether the item's due date has passed or not."
        if self.due_date and datetime.date.today() > self.due_date:
            return 1

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('todo-task_detail',
            kwargs={'task_id': self.id,})

    # Auto-set the item creation / completed date
    def save(self):
        # If Item is being marked complete, set the completed_date
        if self.completed:
            self.completed_date = datetime.datetime.now()
        super(Task, self).save()

    class Meta:
        ordering = ["priority"]
