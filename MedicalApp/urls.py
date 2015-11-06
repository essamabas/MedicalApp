"""MedicalApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

# ----------------
# APPs Urls
# ----------------

# ----------------
# API Routes
# ----------------
from rest_framework import routers
#from api import views as api_views
from Authentication.views import *
from General.views import *
from LIMS.views import *

router = routers.DefaultRouter()
# Authentication API
router.register(r'users', UserViewSet)
# General API
router.register(r'InsuranceInstitute', InsuranceInstituteViewSet)
router.register(r'Patient', PatientViewSet)
router.register(r'PatientProfile', PatientProfileViewSet)
router.register(r'Physician', PhysicianViewSet)
router.register(r'MedicalSpeciality', MedicalSpecialityViewSet)
# LIMS API
router.register(r'LabTest', LabTestViewSet)

from django.http import HttpRequest
from django.template import RequestContext

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

urlpatterns = [
    url(r'^$', 'MedicalApp.urls.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    #url(r'^api/auth/sign_in$',
    #    AuthView.as_view(),
    #    name='Sign In')
]
