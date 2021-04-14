from django.db import models
from django.contrib.postgres.fields import ArrayField

class DigitalImage(models.Model):

    digital_image_id = models.CharField(max_length=50)
    catalogue_image_id = models.CharField(max_length=50)
    tags = ArrayField(models.CharField(max_length=50), blank=True)
    catalogue_title = models.TextField()
    work_type = models.CharField(max_length=50)

    origin_institution = models.ForeignKey(
        'institutions.Institution',
        related_name = 'digital_images',
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f'{self.digital_image_id} - {self.origin_institution}'
