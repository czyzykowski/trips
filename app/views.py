from datetime import date

from django.contrib.auth.models import User

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import list_route

from dateutil.relativedelta import relativedelta

from app.serializers import UserSerializer, TripSerializer
from app.models import Trip


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def create(self, request):
        username = request.data['username']
        password = request.data['password']
        is_staff = request.data['is_staff']

        user, _ = User.objects.get_or_create(username=username)
        user.set_password(password)
        user.is_staff = is_staff
        user.save()

        serializer = self.serializer_class(user)

        return Response(serializer.data, status=201)


class TripViewSet(ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def filter_queryset(self, queryset):
        if not self.request.user.is_staff:
            queryset = queryset.filter(owner=self.request.user)
        q = self.request.GET.get('q')
        if q:
            # poor man's full text search
            queryset = queryset.filter(destination__icontains=q)
        return queryset

    @list_route(url_path='next-month')
    def next_month(self, request, pk=None):
        today = date.today()
        start_of_the_month = today.replace(day=1)
        start_of_the_next_month = start_of_the_month + relativedelta(months=1)

        month = start_of_the_next_month.month
        year = start_of_the_next_month.year

        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(
            start_date__year=year,
            start_date__month=month
        )

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
