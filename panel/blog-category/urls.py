from django.urls import path

from .views import BlogCategoryDeleteView, BlogCategoryListView, BlogCategoryCreateView, BlogCategoryUdateView

urlpatterns = [
        path("", BlogCategoryListView.as_view(), name="blog-category-list"),
        path("create/", BlogCategoryCreateView.as_view(), name="blog-category-create"),
        path("<int:pk>/", BlogCategoryUdateView.as_view(), name="blog-category-update"),
        path("delete/<int:pk>/", BlogCategoryDeleteView.as_view(), name="blog-category-delete"),
        ]
