
from django.conf.urls import patterns, url, include
from rest_framework import routers
#from api import views as api_views
from authentication import views

# ----------------
# API Routes
# ----------------
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

Urls = patterns(
    '',
    url(r'^api/auth/sign_in$',
        views.AuthView.as_view(),
        name='Sign In')
)