from rest_framework import serializers
from .models import Employee, EmployeeAttendance


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            "id",
            "full_name",
            "phone",
            "email",
            "position",
            "department",
            "picture",
            "is_active",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class EmployeeAttendanceReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeAttendance
        fields = (
            "id",
            "device_id",
            "timestamp",
            "note",
            "created_at",
        )


class EmployeeDetailSerializer(serializers.ModelSerializer):
    attendances = EmployeeAttendanceReadSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Employee
        fields = (
            "id",
            "full_name",
            "phone",
            "position",
            'email',
            "department",
            "picture",
            "is_active",
            "attendances",
            "created_at",
            "updated_at",
        )


class EmployeeAttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source="employee.full_name",
        read_only=True
    )
    employee = EmployeeSerializer()

    class Meta:
        model = EmployeeAttendance
        fields = (
            "id",
            "employee",
            "employee_name",
            "device_id",
            "timestamp",
            "note",
            "created_at",
        )
        read_only_fields = ("id", "created_at")


class EmployeeAttendanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeAttendance
        fields = (
            "employee",
            "device_id",
            "timestamp",
            "note",
        )

    def validate(self, attrs):
        employee = attrs["employee"]
        timestamp = attrs.get("timestamp")

        if timestamp and EmployeeAttendance.objects.filter(
            employee=employee,
            timestamp=timestamp
        ).exists():
            raise serializers.ValidationError(
                "Bu vaqtda attendance allaqachon mavjud"
            )

        return attrs
