from django.db import models

# Create your models here.
class ListItem(models.Model):
    title = models.CharField(max_length=30)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        """Item de la lista de la compra."""
        return self.title