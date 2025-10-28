from django.urls import path

from .views import signup_view, login_view, get_csrf_token, logout_view

urlpatterns = [
    path("signup/", signup_view, name="signup"),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('csrf/', get_csrf_token, name='csrf' ),
]
