from django.urls import path
from .views import register_user, login_user, get_user_info, get_all_users

urlpatterns = [
    path('register/', register_user),
    path('login/', login_user),
    path('user/<int:pk>/', get_user_info),
    path('users/', get_all_users),
]