from django.db import models

class Institution(models.Model):

    institution_name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    website = models.URLField()
    iiif_url_root = models.URLField()
    api_root = models.URLField()

    def __str__(self):
        return f'{self.institution_name}'
