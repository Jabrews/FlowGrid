from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db.models import Q



class Command(BaseCommand):
    help = "Delete expired guest profiles"

    def handle(self, *args, **options):
        # find users with no passwords and delete
        # set up for azure webjobs
        
        qs = User.objects.filter(
            Q(password__startswith='!') | Q(password__exact='') | Q(password__isnull=True)
        )

        print('users with no pw : ', qs)

        count = qs.count()
        qs.delete()        
        

        self.stdout.write(f"Deleted {count} expired guest profiles")
