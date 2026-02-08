from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        verbose_name="Telefon raqam"
    )

    position = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Lavozim"
    )

    department = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Bo‘lim"
    )

    picture = models.ImageField(
        upload_to="accounts/avatars/",
        null=True,
        blank=True,
        verbose_name="Profil rasmi"
    )

    def __str__(self):
        return self.username
