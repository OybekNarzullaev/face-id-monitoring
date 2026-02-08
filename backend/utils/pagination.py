# pagination.py
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = "perPage"
    page_query_param = "page"

    def get_paginated_response(self, data):
        return {
            "currentPage": self.page.number,
            "perPage": self.get_page_size(self.request),
            "total": self.page.paginator.count,
            "lastPage": self.page.paginator.num_pages,
        }
