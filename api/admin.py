from django.contrib import admin
from .models import *


# Register your models here.


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title', 'number')


class OptionAdmin(admin.ModelAdmin):
    list_display = ('title', 'question')


admin.site.register(Show)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Option, OptionAdmin)
