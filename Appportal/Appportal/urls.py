from django.conf.urls import include, url
from django.contrib import admin

from django.views.generic.base import RedirectView
urlpatterns = [
    # Examples:
    # url(r'^$', 'Appportal.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^ionic/$', RedirectView.as_view(url='http://b3s0njcp.apps.lair.io:8100/'), name='ionic'),
    url(r'^admin/', include(admin.site.urls)),
]

# ----------------
# APPs Urls
# ----------------
from todo.urls import TodoUrlPatterns
from main.urls import MainUrlPatterns
from authentication.urls import AuthUrlPatterns
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns += MainUrlPatterns
#urlpatterns += TodoUrlPatterns
urlpatterns += AuthUrlPatterns

