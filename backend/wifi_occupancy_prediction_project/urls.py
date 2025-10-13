"""
URL configuration for wifi_occupancy_prediction_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect, JsonResponse

def root_redirect(_):
    return HttpResponseRedirect("http://localhost:3000/")

def whoami(request):
    if request.user.is_authenticated:
        return JsonResponse({"authenticated": True, "email": request.user.email})
    return JsonResponse({"authenticated": False})

urlpatterns = [
    path('', root_redirect),
    path('accounts/', include("allauth.urls")),
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
    path('whoami/', whoami)
]
