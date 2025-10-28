from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout

# serializers
from .serializer import SignupSerializer, LoginSerializer

# CSRF token
from django.middleware.csrf import get_token
from django.views.decorators.csrf import requires_csrf_token 

@requires_csrf_token
@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data["username"]# type: ignore
        password = serializer.validated_data["password"]# type: ignore

    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    login(request, user)
    return Response({"message": "User created", "username": user.first_name}, status=status.HTTP_201_CREATED)

@requires_csrf_token
@api_view(['POST']) 
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username'] #type: ignore
        password = serializer.validated_data['password'] #type: ignore
    else:
        return Response({'error': 'Invalid credentials provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Force session save to ensure cookies are set
            request.session.save()
            print(f"DEBUG: User {username} logged in successfully")
            print(f"DEBUG: Session key: {request.session.session_key}")
            print(f"DEBUG: User authenticated: {request.user.is_authenticated}")
            return Response({'message': 'user logged in'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(f"DEBUG: Login error: {e}")
        return Response({'error': 'Authentication failed'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([AllowAny])
#@ensure_csrf_cookie
def get_csrf_token(request):
    try:
        token = get_token(request)
        return Response({'csrfToken': token}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Could not get CSRF token'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    try:
        logout(request)
        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Logout failed'}, status=status.HTTP_400_BAD_REQUEST)