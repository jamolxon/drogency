from django.views.generic import ListView

from common.models import BlogCategory
from helpers.views import CreateView

from .forms import BlogCategoryForm



class BlogCategoryListView(ListView):
    model = BlogCategory
    template_name = "panel/blog-category/list.html"
    context_object_name = "objects"
    queryset = model.objects.all().order_by("-id")
    paginate_by = 10

    def get_queryset(self):
        object_list = self.queryset
        search = self.request.GET.get("search", None)
        if search:
            object_list = object_list.filter(title__icontains=search)

        return object_list


class BlogCategoryCreateView(CreateView):
    model = BlogCategory
    form_class = BlogCategoryForm
    template_name = "panel/blog-category/create.html"
    context_object_name = "object"
    success_url = "panel:blog-category-list"
    success_create_url = "panel:blog-category-create"

