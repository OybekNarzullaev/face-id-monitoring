from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    EmployeeViewSet,
    EmployeeAttendanceViewSet,
)

router = DefaultRouter()
router.register(r"employees", EmployeeViewSet, basename="employee")
router.register(r"attendances", EmployeeAttendanceViewSet,
                basename="attendance")

urlpatterns = [
    path("", include(router.urls)),
]
