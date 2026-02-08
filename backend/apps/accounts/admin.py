from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.contrib.auth import get_user_model

User = get_user_model()


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    ordering = ("username",)
    list_per_page = 25

    # ===== LIST PAGE =====
    list_display = (
        "avatar",
        "username",
        "email",
        "full_name",
        "phone",
        "position",
        "department",
        "is_staff",
        "is_active",
    )

    list_filter = (
        "is_staff",
        "is_active",
        "department",
    )

    search_fields = (
        "username",
        "email",
        "first_name",
        "last_name",
        "phone",
    )

    # ===== DETAIL PAGE =====
    fieldsets = (
        ("Asosiy ma’lumotlar", {
            "fields": (
                "username",
                "password",
            )
        }),
        ("Shaxsiy ma’lumotlar", {
            "fields": (
                "first_name",
                "last_name",
                "email",
                "phone",
                "picture",
            )
        }),
        ("Ish ma’lumotlari", {
            "fields": (
                "position",
                "department",
            )
        }),
        ("Ruxsatlar", {
            "fields": (
                "is_active",
                "is_staff",
                "is_superuser",
                "groups",
                "user_permissions",
            )
        }),
        ("Muhim vaqtlar", {
            "fields": (
                "last_login",
                "date_joined",
            )
        }),
    )

    readonly_fields = (
        "last_login",
        "date_joined",
    )

    # ===== ADD USER PAGE =====
    add_fieldsets = (
        ("Yangi foydalanuvchi", {
            "classes": ("wide",),
            "fields": (
                "username",
                "password1",
                "password2",
                "first_name",
                "last_name",
                "email",
                "phone",
                "position",
                "department",
                "is_staff",
                "is_active",
            ),
        }),
    )

    # ===== CUSTOM METHODS =====
    @admin.display(description="Avatar")
    def avatar(self, obj):
        if obj.picture:
            return format_html(
                '<img src="{}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" />',
                obj.picture.url,
            )
        return "—"

    @admin.display(description="F.I.Sh")
    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or "—"
