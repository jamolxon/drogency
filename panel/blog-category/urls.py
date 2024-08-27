from django.urls import path

from .views import BlogCategoryListView, BlogCategoryCreateView

urlpatterns = [
        path("", BlogCategoryListView.as_view(), name="blog-category-list"),
        path("create/", BlogCategoryCreateView.as_view(), name="blog-category-create"),
        ]
