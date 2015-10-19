import json

import pytest

from django.contrib.auth.models import User
from rest_framework.test import APIClient


def get_auth_token(client, user):
    response = client.post('/api-token-auth/', {
        'username': user.username,
        'password': 'password!',
    })

    return json.loads(response.content)['token']


@pytest.mark.django_db
def test_can_obtain_auth_token(client):
    user = User.objects.create_user('user', password='password!')

    response = client.post('/api-token-auth/', {
        'username': user.username,
        'password': 'password!',
    })

    assert response.status_code == 200
    assert 'token' in json.loads(response.content)


@pytest.mark.django_db
def test_without_auth_token_endpoints_return_401(client):
    assert client.get('/users/').status_code == 401
    assert client.get('/trips/').status_code == 401


@pytest.mark.django_db
def test_with_authtoken_can_get_my_trip():
    client = APIClient()

    user = User.objects.create_user('user', password='password!')
    token = get_auth_token(client, user)

    client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    response = client.get('/trips/')

    assert response.status_code == 200
