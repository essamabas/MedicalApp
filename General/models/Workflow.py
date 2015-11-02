

from django.db import models
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from django.contrib.auth.models import Permission
from django.contrib.auth.decorators import permission_required

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
    model: The model the workflow belongs to. Can be any content: The object the workflow belongs to.
    name: The unique name of the workflow.
    states: The states of the workflow.
    initial_state: The initial state the model / content gets if created.
    """
    name = models.CharField(_(u"Name"), max_length=100, unique=True)
    initial_state = models.ForeignKey("State", verbose_name=_(u"Initial state"), related_name="workflow_state", blank=True, null=True)

    def get_initial_state(self):
        """Returns the initial state of the workflow. Takes the first one if no state has been defined."""
        if self.initial_state:
            return self.initial_state
        else:
            try:
                return self.states.all()[0]
            except IndexError:
                return None
    current_state = get_initial_state()

    def move_to_state(self, end_state):
        """Move to end_state and return a reference of current_state/ or None: if transitions is not possible
        """
        for state in self.states.all():
            # get reference of current-state
            if self.current_state == state:
                for transition in self.transitions.all():
                    # Check - if end_state is string
                    if isinstance(end_state, str):
                        # Compare as string - with end_state.name
                        if end_state == transition.end_state.name:
                            self.current_state = transition.end_state
                            return self.current_state
                    # Compare as Objects
                    elif end_state == transition.end_state:
                        self.current_state = transition.end_state
                        return self.current_state
        return None


class Transition(models.Model):
    """A transition from a start to a end state. The transition can be used from several source states.
    **Attributes:**
    name: The unique name of the transition within a workflow.
    workflow: The workflow to which the transition belongs. Must be a Workflow instance.
    destination: The state after a transition has been processed. Must be a State instance.
    condition: The condition when the transition is available. Can be any python expression.
    permission: The necessary permission to process the transition. Must be a Permission instance.
    """
    name = models.CharField(_(u"Name"), max_length=100)
    end_state = models.ForeignKey(State, verbose_name=_(u"end_state"), blank=False, related_name="end_state")
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
    workflow = models.ForeignKey("Workflow", verbose_name=_(u"Workflow"), related_name="states")
    transitions = models.ManyToManyField("Transition", verbose_name=_(u"Transitions"), blank=True, related_name="states")

    def get_allowed_transitions(self, obj, user):
        """Returns all allowed transitions for passed object and user.
        """
        transitions = []
        for transition in self.transitions.all():
            permission = transition.permission
            if permission is None:
                transitions.append(transition)
            else:
                # First we try to get the objects specific has_perm
                try:
                    if obj.has_perm(permission.codename):
                        transitions.append(transition)
                except AttributeError:
                    #if permissions.utils.has_permission(obj, user, permission.codename):
                    #    transitions.append(transition)
        return transitions
