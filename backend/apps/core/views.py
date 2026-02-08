from rest_framework import viewsets, status, mixins
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Employee, EmployeeAttendance
from .serializers import (
    EmployeeSerializer,
    EmployeeDetailSerializer,
    EmployeeAttendanceSerializer,
    EmployeeAttendanceCreateSerializer,
)
from utils.pagination import StandardResultsSetPagination
from utils.api_response import api_response


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    Employee CRUD
    """
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [AllowAny]
    filter_backends = (SearchFilter, OrderingFilter)

    # SQLite uchun tez qidiruv
    search_fields = (
        "^full_name",   # startswith
        "=phone",       # exact
    )

    ordering_fields = ("created_at", "full_name")
    ordering = ("-created_at",)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return EmployeeDetailSerializer
        return EmployeeSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)

        meta = self.paginator.get_paginated_response(serializer.data)

        return api_response(
            data=serializer.data,
            meta=meta,
            message="Employee list"
        )

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return api_response(
            data=serializer.data,
            meta=None,
            message="Employee detail"
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return api_response(
            data=serializer.data,
            message="Employee created",
            status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return api_response(
            data=serializer.data,
            message="Employee updated"
        )

    def destroy(self, request, *args, **kwargs):
        self.get_object().delete()
        return api_response(
            data={},
            message="Employee deleted"
        )


class EmployeeAttendanceViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    """
    Attendance:
    - LIST
    - CREATE
    """
    queryset = EmployeeAttendance.objects.select_related("employee")
    pagination_class = StandardResultsSetPagination
    permission_classes = [AllowAny]
    ordering = ("-created_at",)

    def get_serializer_class(self):
        if self.action == "create":
            return EmployeeAttendanceCreateSerializer
        return EmployeeAttendanceSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # filterlar
        search = request.query_params.get("search")
        employee_id = request.query_params.get("employee")
        device_id = request.query_params.get("device")

        if search:
            queryset = queryset.filter(
                Q(employee__full_name__icontains=search) |
                Q(employee__phone__iexact=search) |
                Q(employee__department__icontains=search) |
                Q(employee__position__icontains=search) |
                Q(employee__email__icontains=search)
            )
        if employee_id:
            queryset = queryset.filter(employee_id=employee_id)

        if device_id:
            queryset = queryset.filter(device_id=device_id)

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)

        meta = self.paginator.get_paginated_response(serializer.data)

        return api_response(
            data=serializer.data,
            meta=meta,
            message="Attendance list"
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return api_response(
            data=serializer.data,
            message="Successfully sent!",
            status=status.HTTP_201_CREATED
        )
