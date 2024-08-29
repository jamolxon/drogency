from django.db import models
from django.http.request import uploadhandler
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save, m2m_changed

from django_resized import ResizedImageField
from ckeditor.fields import RichTextField


class Slider(models.Model):
    title = models.CharField(_("title"), max_length=256)
    description = models.TextField(_("description"))
    image = ResizedImageField(size=[756, 741], crop=['middle', 'center'], upload_to='slider/%Y/%m')

    class Meta:
        db_table = "slider"
        verbose_name = _("slider")
        verbose_name_plural = _("sliders")
    def __str__(self):
        return f"{self.title}"


class ProjectCategory(models.Model):
    title = models.CharField(_("title"), max_length=256)
    count = models.IntegerField(_("count"), default=0)

    class Meta:
        db_table = "project_category"
        verbose_name = _("project category")
        verbose_name_plural = _("project categories")

    def __str__(self):
        return f"{self.title}"



class Project(models.Model):
    title = models.CharField(_("title"), max_length=256)
    slug = models.SlugField(_("slug"), max_length=256)
    description = models.TextField(_("description"))
    categories = models.ManyToManyField(ProjectCategory, verbose_name=_("categories"), related_name="projects")
    image_small = ResizedImageField(_("image small"), blank=True, null=True, size=[370, 379], quality=95, crop=["middle", "center"], upload_to="projects/%Y/%m")
    image_large = ResizedImageField(_("image large"), blank=True, null=True, size=[1100, 700], quality=95, crop=["middle", "center"], upload_to="projects/%Y/%m")
    is_top = models.BooleanField(_("project is top"), default=False)
    date = models.DateField(_("date"), default=timezone.now)
    duration = models.CharField(_("duration"), max_length=256)
    price = models.CharField(_("price"), max_length=256)
    client = models.CharField(_("client"), max_length=256)
    designer = models.CharField(_("designer"), max_length=256)
    content = RichTextField(_("content"))


    class Meta:
        db_table = "project"
        verbose_name = _("project")
        verbose_name_plural = _("projects")


    def __str__(self):
        return f"{self.title}"


class BlogCategory(models.Model):
    title = models.CharField(_("title"), max_length=256)

    class Meta:
        db_table = "blog_category"
        verbose_name = _("blog category")
        verbose_name_plural = _("blog categories")

    def blog_count(self):
        return self.blogs.count()

    def __str__(self):
        return f"{self.title}"

class BlogTag(models.Model):
    title = models.CharField(_("title"), max_length=256)

    class Meta:
        db_table = "blog_tag"
        verbose_name = _("blog tag")
        verbose_name_plural = _("blog tags")

    def __str__(self):
        return f"{self.title}"



class Blog(models.Model):
    title = models.CharField(_("title"), max_length=256)
    slug = models.SlugField(_("slug"), max_length=256)
    categories = models.ManyToManyField(BlogCategory, related_name="blogs", verbose_name=_("categories"))
    is_top = models.BooleanField(_("blog is top"), default=False)
    description = models.TextField(_("description"))
    author = models.CharField(_("author"), max_length=256)
    tags = models.ManyToManyField(BlogTag, related_name="blogs", verbose_name=_("tags"))
    published_date = models.DateField(_("published date"), auto_now_add=True)
    main_image = ResizedImageField(_("main image"), size=[540, 304], crop=["middle", "center"], quality=95, upload_to="blog/%Y/%m")
    large_image = ResizedImageField(_("large image"), size=[1100, 700], crop=["middle", "center"], quality=95, upload_to="blog/%Y/%m")
    read_time = models.IntegerField(_("read time"))
    content = RichTextField(_("content"))

    class Meta:
        db_table = "blog"
        verbose_name = _("blog")
        verbose_name_plural = _("blogs")


    def __str__(self):
        return f"{self.title}"



class BlogComment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="comments", verbose_name=_("blog"))
    name = models.CharField(_("name"), max_length=256)
    email = models.EmailField(_("email"), max_length=256)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, related_name="children", verbose_name=_("parent"))
    published_date = models.DateTimeField(_("published date"), auto_now_add=True)
    comment = models.TextField(_("comment"))

    class Meta:
        db_table = "blog_comment"
        verbose_name = _("blog comment")
        verbose_name_plural = _("blog comments")

    def __str__(self):
        return f"{self.name}"
    



@receiver(m2m_changed, sender=Project.categories.through)
def update_category_count(sender, instance, action, **kwargs):
    if action == "post_add":
        for category in instance.categories.all():
            category.count += 1
            category.save()


