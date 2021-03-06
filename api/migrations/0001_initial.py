# Generated by Django 4.0.4 on 2022-04-18 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('number', models.SmallIntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Show',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('humor_score', models.SmallIntegerField()),
                ('thriller_score', models.SmallIntegerField()),
                ('romance_score', models.SmallIntegerField()),
                ('drama_score', models.SmallIntegerField()),
                ('horror_score', models.SmallIntegerField()),
                ('family_score', models.SmallIntegerField()),
                ('img_link', models.CharField(max_length=500)),
                ('imdb_score', models.FloatField()),
                ('imdb_link', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('humor_factor', models.SmallIntegerField()),
                ('thriller_factor', models.SmallIntegerField()),
                ('romance_factor', models.SmallIntegerField()),
                ('drama_factor', models.SmallIntegerField()),
                ('horror_factor', models.SmallIntegerField()),
                ('family_factor', models.SmallIntegerField()),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='api.question')),
            ],
        ),
    ]
