from django.conf.urls import include, url
from django.contrib import admin

from books.views import UploadBookView, BookListView, BookDetailsView

urlpatterns = [
    # Examples:
    # url(r'^$', 'ocr.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^upload_book/$', UploadBookView.as_view()),
    url(r'^list_books/$', BookListView.as_view()),
    url(r'^books/([0-9]+)/$', BookDetailsView.as_view()),
]
