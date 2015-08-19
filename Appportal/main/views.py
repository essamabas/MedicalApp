"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime
from django.contrib.auth.decorators import login_required

def login(request):
    """Renders the login page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'views/pages/login.html',
        context_instance = RequestContext(request,
        {
            'title':'Login Page',
        })
    )

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'index.html',
        context_instance = RequestContext(request,
        {
            'title':'Home Page',
        })
    )

def permission_denied(request):
    """Renders the permission_denied page"""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'main/permission_denied.html',
        context_instance = RequestContext(request,
        {
            'title':'Permission Denied Page',
        })
    )

def NotFoundErrorHandler(request):
    """Renders the Error page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        '404.html',
        context_instance = RequestContext(request,
        {
            'title':'Error Page',
        })
    )

