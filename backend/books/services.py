from PIL import Image
from pytesseract import image_to_string

from books.models import Book


def uploaded_file_to_string(image):
    image = Image.open(image)
    return image_to_string(image)


def upload_book(name, images):
    text = map(uploaded_file_to_string, images)
    text = ''.join(text)
    return Book.objects.create(name=name, text=text)
