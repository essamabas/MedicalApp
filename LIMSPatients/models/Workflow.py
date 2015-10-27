

from django.db import models
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

# -----------------------
#	Model Classes
# -----------------------
# Ref: https://github.com/diefenbach/django-workflows/blob/master/workflows/models.py
# ToDo: Link to Django-Permission model in https://github.com/django/django/blob/master/django/contrib/auth/models.py
class Workflow(models.Model):
    """A workflow consists of a sequence of connected (through transitions)
    states. It can be assigned to a model and / or model instances. If a
    model instance has a workflow it takes precendence over the model's
    workflow.
    **Attributes:**
    model: The model the workflow belongs to. Can be any
    content: The object the workflow belongs to.
    name: The unique name of the workflow.
    states: The states of the workflow.
    initial_state: The initial state the model / content gets if created.
    """
    name = models.CharField(_(u"Name"), max_length=100, unique=True)
    initial_state = models.ForeignKey("State", verbose_name=_(u"Initial state"), related_name="workflow_state", blank=True, null=True)
    permissions = models.ManyToManyField(Permission, verbose_name=_(u"Permissions"), symmetrical=False)

class Transition(models.Model):
    """A transition from a source to a destination state. The transition can
    be used from several source states.
    **Attributes:**
    name
        The unique name of the transition within a workflow.
    workflow: The workflow to which the transition belongs. Must be a Workflow instance.
    destination: The state after a transition has been processed. Must be a State instance.
    condition: The condition when the transition is available. Can be any python expression.
    permission
        The necessary permission to process the transition. Must be a
        Permission instance.
    """
    name = models.CharField(_(u"Name"), max_length=100)
    workflow = models.ForeignKey(Workflow, verbose_name=_(u"Workflow"), related_name="transitions")
    destination = models.ForeignKey(State, verbose_name=_(u"Destination"), null=True, blank=True, related_name="destination_state")
    condition = models.CharField(_(u"Condition"), blank=True, max_length=100)
    permission = models.ForeignKey(Permission, verbose_name=_(u"Permission"), blank=True, null=True)

class State(models.Model):
    """A certain state within workflow.
    **Attributes:**
    name: The unique name of the state within the workflow.
    workflow: The workflow to which the state belongs.
    transitions:  The transitions of a workflow state.
    """
    name = models.CharField(_(u"Name"), max_length=100)
    workflow = models.ForeignKey(Workflow, verbose_name=_(u"Workflow"), related_name="states")
    transitions = models.ManyToManyField("Transition", verbose_name=_(u"Transitions"), blank=True, related_name="states")
