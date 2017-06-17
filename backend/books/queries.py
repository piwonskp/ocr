from books.models import Book


def book_list():
    return Book.objects.values('id', 'name')


def get_book_details(book_id):
    return Book.objects.get(id=book_id)
