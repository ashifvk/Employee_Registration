from django.urls import path, include
from .views import *
urlpatterns = [
    path('employee/', EmployeeListView.as_view(), name='employee-list'),  # GET and POST
    path('employee/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),  # GET, PUT, DELETE
]