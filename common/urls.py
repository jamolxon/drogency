from django.urls import path

from common import views

app_name = "common"


urlpatterns = [
        path("", views.HomeView.as_view(), name="home"),
        path("projects/<str:slug>/", views.ProjectDetailView.as_view(), name="project-detail"),
        path("blogs/<str:slug>/", views.BlogDetailView.as_view(), name="blog-detail"),
        path("blogs/", views.BlogListView.as_view(), name="blog-list"),
        path('add_comment/<int:blog_id>/', views.AddComment.as_view(), name='blog-comment'),
        ]

