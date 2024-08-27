from django.urls import path, include

from panel.views import HomeView

app_name = "panel"

urlpatterns = [
        path("", HomeView.as_view(), name="home"),
        path("blog-category/", include("panel.blog-category.urls"))
        ]
