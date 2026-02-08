from django.contrib import admin
from .models import Employee, EmployeeAttendance


class EmployeeAttendanceInline(admin.TabularInline):
    """
    Employee sahifasida attendance’larni inline ko‘rsatish
    """
    model = EmployeeAttendance
    extra = 0
    fields = ("device_id", "timestamp", "note", "created_at")
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        'email',
        "position",
        "department",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
        "department",
        "position",
        "created_at",
    )

    search_fields = (
        "^full_name",   # startswith → index ishlaydi
        "=phone",
        'email',      # exact match → juda tez
        "position",
        "department",
    )

    ordering = ("-created_at",)

    list_editable = ("is_active",)

    readonly_fields = ("created_at", "updated_at")

    inlines = [EmployeeAttendanceInline]

    fieldsets = (
        ("Asosiy ma’lumotlar", {
            "fields": ("full_name", "phone", "email", "picture")
        }),
        ("Lavozim ma’lumotlari", {
            "fields": ("position", "department")
        }),
        ("Holati", {
            "fields": ("is_active",)
        }),
        ("Tizim ma’lumotlari", {
            "fields": ("created_at", "updated_at")
        }),
    )


@admin.register(EmployeeAttendance)
class EmployeeAttendanceAdmin(admin.ModelAdmin):
    list_display = (
        "employee",
        "device_id",
        "timestamp",
        "created_at",
    )

    list_filter = (
        "device_id",
        "created_at",
    )

    search_fields = (
        "employee__full_name",
        "employee__phone",
        "note",
    )

    ordering = ("-created_at",)

    readonly_fields = ("created_at",)

    autocomplete_fields = ("employee",)
