from django.db import models

class Scrapbook(models.Model):

    name = models.CharField(max_length=50)
    digital_images = models.ManyToManyField("digital_images.DigitalImage", related_name="scrapbooks", blank=True) #many to many

    creator = models.ForeignKey(
        'jwt_auth.User',
        related_name='scrapbook_creator',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.name} by {self.creator}"