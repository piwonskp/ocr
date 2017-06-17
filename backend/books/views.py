from rest_framework import serializers, views
from rest_framework.response import Response

from books.queries import book_list, get_book_details
from books.services import upload_book


class UploadBookSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    images = serializers.ListField(child=serializers.ImageField(), read_only=False)


class UploadBookView(views.APIView):
    def post(self, request):
        serializer = UploadBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name, images = serializer.validated_data['name'], serializer.validated_data['images']
        upload_book(name, images)

        return Response()


class BookListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class BookListView(views.APIView):
    def get(self, request):
        return Response(data=BookListSerializer(book_list(), many=True).data)


class BookDetailsSerializer(serializers.Serializer):
    name = serializers.CharField()
    text = serializers.CharField()


class BookDetailsView(views.APIView):
    def get(self, request, book_id):
        return Response(data=BookDetailsSerializer(get_book_details(book_id)).data)
