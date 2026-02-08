from knox.views import LoginView as KnoxLoginView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import login

from .serializers import LoginSerializer


from knox.views import LoginView as KnoxLoginView
from rest_framework.permissions import AllowAny
from django.contrib.auth import login

from .serializers import LoginSerializer, UserSerializer


class LoginView(KnoxLoginView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        login(request, user)

        response = super().post(request, format=None)

        response.data["user"] = UserSerializer(
            user,
            context={"request": request},
        ).data

        return response
