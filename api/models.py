from django.db import models

# Create your models here.


class Show(models.Model):
    title = models.CharField(max_length=100)
    humor_score = models.SmallIntegerField()
    thriller_score = models.SmallIntegerField()
    romance_score = models.SmallIntegerField()
    drama_score = models.SmallIntegerField()
    horror_score = models.SmallIntegerField()
    family_score = models.SmallIntegerField()
    img_link = models.CharField(max_length=500)
    imdb_score = models.FloatField()
    imdb_link = models.CharField(max_length=500)

    def __str__(self):
        return self.title


class Question(models.Model):
    title = models.CharField(max_length=100)
    number = models.SmallIntegerField(unique=True)

    def __str__(self):
        return self.title


class Option(models.Model):
    title = models.CharField(max_length=100)
    humor_factor = models.SmallIntegerField()
    thriller_factor = models.SmallIntegerField()
    romance_factor = models.SmallIntegerField()
    drama_factor = models.SmallIntegerField()
    horror_factor = models.SmallIntegerField()
    family_factor = models.SmallIntegerField()
    question = models.ForeignKey(
        Question, related_name='options', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
