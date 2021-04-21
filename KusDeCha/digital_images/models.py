from django.db import models
from django.contrib.postgres.fields import ArrayField

class DigitalImage(models.Model):

    digital_image_id = models.CharField(max_length=50, blank=True)
    iiif_manifest = models.URLField(blank=True)
    catalogue_image_id = models.CharField(max_length=50)
    tags = ArrayField(models.CharField(max_length=50), blank=True)
    catalogue_title = models.TextField(blank=True)
    work_type = models.CharField(max_length=50, blank=True)

    origin_institution = models.ForeignKey(
        'institutions.Institution',
        related_name = 'digital_images',
        on_delete = models.CASCADE
    )

    creator = models.ForeignKey(
        'jwt_auth.User',
        related_name='digital_image_creator',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.digital_image_id} - {self.origin_institution}'
