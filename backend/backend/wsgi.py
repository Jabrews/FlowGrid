import os
import sys


from django.core.wsgi import get_wsgi_application

if 'WEBSITE_HOSTNAME' in os.environ:
    settings_module = 'backend.backend.settings'
else:
    settings_module = 'backend.settings'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

application = get_wsgi_application()
