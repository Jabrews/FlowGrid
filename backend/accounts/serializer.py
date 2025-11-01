from rest_framework import serializers

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)


class LoginSerializer(serializers.Serializer) :
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
