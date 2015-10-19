#!/bin/env python
import atexit

import requests

from datetime import date
from subprocess import Popen, PIPE
from operator import itemgetter
from time import sleep

from django.contrib.auth.models import User

from app.models import Trip

API_ROOT = 'http://127.0.0.1:8000'


def setup_admin_user():
    admin, _ = User.objects.get_or_create(username='admin')
    admin.is_superuser = True
    admin.set_password('admin')
    admin.save()


def start_web_server():
    server = Popen(['./manage.py', 'runserver'], stdout=PIPE)
    atexit.register(server.kill)
    sleep(0.11)


def clean_up_the_data():
    Trip.objects.all().delete()


def api(path):
    return API_ROOT + path


def auth_token(username, password):
    credentials = {'username': username, 'password': password}
    response = requests.post(api('/api-token-auth/'), credentials)
    token = response.json()['token']
    return token


def setup_module(module):
    setup_admin_user()
    start_web_server()
    clean_up_the_data()


def auth(username, password):
    token = auth_token(username, password)
    header = {'Authorization': 'Token {}'.format(token)}
    return header


def create_user(username, password):
    headers = auth('admin', 'admin')
    user_data = {
        'username': username,
        'password': password,
    }
    response = requests.post(api('/users/'), data=user_data, headers=headers)
    assert response.status_code == 201


def test_as_admin_create_user():
    headers = auth('admin', 'admin')
    user_data = {
        'username': 'user',
        'password': 'userpassword',
    }
    response = requests.post(api('/users/'), data=user_data, headers=headers)

    assert response.status_code == 201
    response = requests.get(api('/users/'), headers=headers)
    usernames = [user['username'] for user in response.json()]
    assert 'user' in usernames


def test_as_user_retrieve_all_trips():
    headers = auth('user', 'userpassword')

    response = requests.get(api('/trips/'), headers=headers)

    assert response.status_code == 200
    assert response.json() == []


def trip_data(destination, start_date=None, end_date=None, comment=None):
    return {
        'destination': destination,
        'start_date': start_date if start_date else '2015-10-01',
        'end_date': end_date if end_date else '2015-12-02',
        'comment': comment if comment else 'A comment for trip'
    }


def test_as_user_create_new_trip():
    headers = auth('user', 'userpassword')

    for i in range(10):
        response = requests.post(
            api('/trips/'),
            data=trip_data(
                'Destination {}'.format(i),
                '2015-10-{0:02d}'.format(i + 1),
                '2015-12-{0:02d}'.format(i + 1),
                'A comment for trip {}'.format(i)
            ),
            headers=headers)

        assert response.status_code == 201

    response = requests.get(api('/trips/'), headers=headers)

    assert len(response.json()) == 10


def test_each_user_sees_only_own_trips():
    create_user('user1', 'pass')
    create_user('user2', 'pass')

    user1_auth = auth('user1', 'pass')
    user2_auth = auth('user2', 'pass')

    response = requests.post(api('/trips/'), data=trip_data('dest'),
                             headers=user1_auth)

    assert response.status_code == 201

    response = requests.post(api('/trips/'), data=trip_data('dest'),
                             headers=user2_auth)

    assert response.status_code == 201

    response = requests.get(api('/trips/'), headers=user1_auth)
    assert len(response.json()) == 1

    response = requests.get(api('/trips/'), headers=user2_auth)
    assert len(response.json()) == 1

    admin = auth('admin', 'admin')
    response = requests.get(api('/trips/'), headers=admin)
    assert len(response.json()) > 2


def test_user_can_delete_own_trip():
    headers = auth('user', 'userpassword')

    response = requests.post(api('/trips/'), data=trip_data('delete'),
                             headers=headers)

    assert response.status_code == 201

    response = requests.get(api('/trips/'), headers=headers)
    delete = [t for t in response.json() if t['destination'] == 'delete']
    assert len(delete) == 1

    trip_id = delete[0]['id']

    response = requests.delete(
        api('/trips/{}/'.format(trip_id)), headers=headers)

    assert response.status_code == 204

    response = requests.get(api('/trips/'), headers=headers)
    delete = [trip for trip in response.json()
              if trip['destination'] == 'delete']
    assert len(delete) == 0


def test_trip_filtering():
    headers = auth('user', 'userpassword')

    def create(dest):
        response = requests.post(
            api('/trips/'), data=trip_data(dest), headers=headers)

        assert response.status_code == 201

    def list(query):
        response = requests.get(
            api('/trips/'), params={'q': query}, headers=headers)

        return [trip['destination'] for trip in response.json()]

    create('banana')
    create('apple')
    create('pineapple')

    assert list('banana') == ['banana']
    assert list('apple') == ['apple', 'pineapple']


def test_trip_next_month():
    headers = auth('user', 'userpassword')

    def create(dest, start_date):
        response = requests.post(
            api('/trips/'), data=trip_data(dest, start_date), headers=headers)

        assert response.status_code == 201

    this_month = date.today().month
    next_month = this_month % 12 + 1
    this_year = date.today().year

    create('this month', '{0:4d}-{1:2d}-01'.format(this_year, this_month))
    create('next month 1', '{0:4d}-{1:2d}-01'.format(this_year, next_month))
    create('next month 2', '{0:4d}-{1:2d}-02'.format(this_year, next_month))

    response = requests.get(api('/trips/next-month/'), headers=headers)

    trips = response.json()
    trips.sort(key=itemgetter('destination'))

    assert len(trips) == 2
    assert trips[0]['destination'] == 'next month 1'
    assert trips[1]['destination'] == 'next month 2'
