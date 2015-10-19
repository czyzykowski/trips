from datetime import date

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework.authtoken.models import Token


class Trip(models.Model):
    owner = models.ForeignKey(User, related_name='trips')
    destination = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    comment = models.TextField(blank=True, null=True)

    @property
    def starts_in(self):
        days = (self.start_date - date.today()).days
        return days if days >= 0 else None

    class Meta:
        ordering = ('start_date',)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
