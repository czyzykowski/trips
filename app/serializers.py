from django.contrib.auth.models import User

from rest_framework import serializers

from app.models import Trip


class TripSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Trip
        fields = (
            'id',
            'owner',
            'destination',
            'start_date',
            'end_date',
            'comment',
            'starts_in',
        )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff')
