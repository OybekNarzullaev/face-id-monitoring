from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data.get("email"),
            password=data.get("password"),
        )

        if not user:
            raise serializers.ValidationError("Login yoki parol noto‘g‘ri")

        if not user.is_active:
            raise serializers.ValidationError("Foydalanuvchi aktiv emas")

        data["user"] = user
        return data


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    picture_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "position",
            "department",
            "picture",
            "picture_url",
            "is_active",
            "is_staff",
        )
        read_only_fields = (
            "id",
            "username",
            "is_active",
            "is_staff",
        )

    def get_picture_url(self, obj):
        request = self.context.get("request")
        if obj.picture and request:
            return request.build_absolute_uri(obj.picture.url)
        return None
