from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from app.views import UserViewSet, TripViewSet


index = TemplateView.as_view(template_name='index.html')

router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'trips', TripViewSet)


urlpatterns = [
    url(r'^$', index),
    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
]
