from django.conf.urls import patterns, include, url
from datetime import datetime

# Specific HiL-TASKS URLS
#urlpatterns += HiLTasksUrlpatterns

MainUrlPatterns = patterns('',
    # Examples:
    url(r'^$', 'main.views.home', name='home'),
    url(r'^login/$',
        'django.contrib.auth.views.login',
        {
            'template_name': 'login.html',
            'extra_context':
            {
                'title':'Log in',
                'year':datetime.now().year,
            }
        },
        name='login'),
    url(r'^logout$',
        'django.contrib.auth.views.logout',
        {
            'next_page': '/login',
        },
        name='logout'),
    # Error-Page
    # url(r".*", 'main.views.NotFoundErrorHandler', name='Error Page'),
)
