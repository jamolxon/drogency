from django.contrib import admin

from common import models


@admin.register(models.Slider)
class SliderAdmin(admin.ModelAdmin):
    list_display = ("title", )


@admin.register(models.ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", )



@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", )
    prepopulated_fields = {"slug": ("title", )} 

admin.site.register(models.BlogCategory)
admin.site.register(models.BlogTag)
admin.site.register(models.BlogComment)

@admin.register(models.Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", )
    prepopulated_fields = {"slug": ("title", )} 
