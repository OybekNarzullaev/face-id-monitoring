from django.urls import path
from knox.views import LogoutView, LogoutAllView
from .views import LoginView

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("logout-all/", LogoutAllView.as_view()),
]
