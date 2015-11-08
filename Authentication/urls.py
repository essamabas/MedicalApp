from django.conf.urls import patterns, url

from .views import (
    LoginView, LogoutView, UserDetailsView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView
)

urlpatterns = patterns(
    '',
    # URLs that do not require a session or valid token
    url(r'^api/auth/password/reset$', PasswordResetView.as_view(), name='rest_password_reset'),
    url(r'^api/auth/password/update$', PasswordChangeView.as_view(),name='rest_password_change'),    
    #url(r'^password/reset/confirm/$', PasswordResetConfirmView.as_view(),name='rest_password_reset_confirm'),
    url(r'^api/auth/sign_in$', LoginView.as_view(), name='Sign In'),
    # URLs that require a user to be logged in with a valid session / token.
    url(r'^api/auth/sign_out$', LogoutView.as_view(), name='rest_logout'),
    url(r'^user/$', UserDetailsView.as_view(), name='rest_user_details'),
)