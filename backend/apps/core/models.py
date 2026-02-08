from django.db import models


class Employee(models.Model):
    full_name = models.CharField(
        max_length=150,
        db_index=True,
        verbose_name="F.I.Sh"
    )
    phone = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        db_index=True,
        verbose_name="Telefon"
    )
    email = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        db_index=True,
        verbose_name="Email"
    )
    position = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        db_index=True,
        verbose_name="Lavozim"
    )
    department = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        db_index=True,
        verbose_name="Bo‘lim"
    )

    picture = models.ImageField(
        upload_to="employees/avatars/",
        null=True,
        blank=True
    )

    is_active = models.BooleanField(
        default=True,
        db_index=True,
        verbose_name="Faol"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            # Admin va API uchun eng ko‘p ishlatiladigan kombinatsiyalar
            models.Index(fields=["is_active", "full_name"]),
            models.Index(fields=["department", "is_active"]),
        ]
        verbose_name = "Xodim"
        verbose_name_plural = "Xodimlar"

    def __str__(self):
        return self.full_name


class EmployeeAttendance(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="attendances",
        verbose_name="Xodim",
        db_index=True
    )

    device_id = models.PositiveIntegerField(
        db_index=True,
        verbose_name="Qurilma ID"
    )

    timestamp = models.DateTimeField(
        null=True,
        blank=True,
        db_index=True,
        verbose_name="Qayd vaqti"
    )

    note = models.TextField(
        blank=True,
        verbose_name="Izoh"
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    class Meta:
        verbose_name = "Ish vaqti"
        verbose_name_plural = "Ish vaqtlari"
        ordering = ("-created_at",)

        # SQLite uchun OPTIMAL indexlar
        indexes = [
            models.Index(fields=["employee", "created_at"]),
            models.Index(fields=["device_id", "created_at"]),
            models.Index(fields=["timestamp"]),
        ]

        # Bir xodimga bir vaqt oralig‘ida dublikat bo‘lmasin
        constraints = [
            models.UniqueConstraint(
                fields=["employee", "timestamp"],
                name="uniq_employee_timestamp"
            )
        ]

    def __str__(self):
        return f"{self.employee} — {self.created_at:%Y-%m-%d %H:%M}"
