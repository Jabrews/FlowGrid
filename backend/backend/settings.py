import os
from pathlib import Path
import environ 
BASE_DIR = Path(__file__).resolve().parent.parent
env = environ.Env()

if not 'WEBSITE_HOSTNAME' in os.environ:
    environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG') 
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")
# CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")
# CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS")

if 'WEBSITE_HOSTNAME' in os.environ:
    module_prefix = 'backend.backend'
else:
    module_prefix = 'backend'

WSGI_APPLICATION = f'{module_prefix}.wsgi.application'
ROOT_URLCONF = f'{module_prefix}.urls'


# NOT SURE YET
# CSRF_COOKIE_SAMESITE = None
# SESSION_COOKIE_SAMESITE = None
# CSRF_COOKIE_SECURE = False
# SESSION_COOKIE_SECURE = False
# TURN ON FOR PRODUCTION 
# CSRF_COOKIE_SAMESITE = "None"
# SESSION_COOKIE_SAMESITE = "None"
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True



INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    # 'django_filters',
]

# my apps
if 'WEBSITE_HOSTNAME' in os.environ:
    INSTALLED_APPS.append('backend.main.apps.MainConfig')
else:
    INSTALLED_APPS.append('main.apps.MainConfig')

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',   
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',    
    ],
}


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



# Database
# te
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

if 'WEBSITE_HOSTNAME' in os.environ:
    # Production on Azure → use PostgreSQL
    DATABASES = {
        'default': env.db(
            'DATABASE_URL'
        )
    }
else:
    # Local development → use SQLite
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }




# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
