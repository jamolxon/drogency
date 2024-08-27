from django.views import View
from django.views.generic import DetailView, ListView
from django.db.models import Q, Count
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

from common import models
from common.forms import BlogCommentForm


class HomeView(View):
    def get(self, request):
        slider = models.Slider.objects.all()
        project_category = models.ProjectCategory.objects.all()
        project = models.Project.objects.filter(is_top=True).prefetch_related("categories").order_by("-id")[:6]
        blog = models.Blog.objects.filter(is_top=True).prefetch_related("categories").order_by("-id") [:6]
        
        context = {
                "sliders": slider,
                "projects": project,
                "blogs": blog,
                "project_categories": project_category
                }

        return render(request, "site/index.html", context)



class ProjectDetailView(DetailView):
    queryset = models.Project.objects.all()
    slug_field = "slug"
    context_object_name = "object"
    template_name = "site/project-details.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["related_projects"] = models.Project.objects.filter(
                ~Q(slug=self.kwargs["slug"]), categories__in=self.get_object().categories.all()
                )[:4]

        return context



class BlogDetailView(DetailView):
    queryset = models.Blog.objects.all()
    slug_field = "slug"
    context_object_name = "object"
    template_name = "site/blog-details.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["related_blogs"] = models.Blog.objects.filter(
                ~Q(slug=self.kwargs["slug"]), categories__in=self.get_object().categories.all()
                ).distinct()[:4]
        context["categories"] = models.BlogCategory.objects.all().annotate(count=Count("blogs"))
        context["comments"] = models.BlogComment.objects.filter(blog__slug=self.kwargs["slug"])

        return context


class BlogListView(ListView):
    model = models.Blog
    template_name = "site/blog.html"
    context_object_name = "objects"
    paginate_by = 1



class AddComment(View):
	def post(self, request, blog_id):
		if request.method == 'POST':
			form = BlogCommentForm(request.POST)
			if form.is_valid():
				comment = form.save(commit=False)
				blog = get_object_or_404(models.Blog, id=blog_id)
				comment.blog = blog
				form.save()
				return HttpResponseRedirect(reverse("common:blog-detail", kwargs = {"slug": blog.slug}))

		else:
			form = BlogCommentForm()

		return render(request, 'site/blog-details.html', {'form':form})
