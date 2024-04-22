from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate 
from rest_framework.authtoken.models import Token
from .forms import addproject,addtodoform
from .models import project,todo
from .serializers import ProjectSerializer,TodoSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

#signup
@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request):
    form = UserCreationForm(data=request.data)
    if form.is_valid():
        user = form.save()
        return Response("account created successfully", status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)        

#login
@api_view(['POST'])
@permission_classes((AllowAny,)) 
def login(request):
    username=request.data.get("username")
    password=request.data.get("password")
    if username is None or password is None:
        return Response({'error':'please provide username and password'},status=status.HTTP_400_NOT_FOUND)
    user = authenticate(username=username, password=password) 
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=status.HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=status.HTTP_200_OK)


#create new project
@api_view(['POST'])
@permission_classes((AllowAny,))
def create_project(request):
    # Validate both project and todo forms
    project_form = addproject(data=request.data)
    todo_form = addtodoform(data=request.data)

    if project_form.is_valid() and todo_form.is_valid():
        # Save the project
        project_instance = todo_form.save()

        # Create todo instance and associate it with the project
        todo_instance = project_form.save(commit=False)
        todo_instance.list_of_todos = project_instance 
        todo_instance.save()

        return Response({'id': project_instance.id}, status=status.HTTP_201_CREATED)
    else:
        # Return errors if any form is invalid
        errors = {}
        errors.update(project_form.errors)
        errors.update(todo_form.errors)
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


#home page/list project
@api_view(['GET'])
@permission_classes((AllowAny,))
def listproject(request):
    tasks = project.objects.all()
    serializer = ProjectSerializer(tasks, many=True)
    return Response(serializer.data)

#view project
@api_view(['GET'])
@permission_classes((AllowAny,))
def viewproject(request, pk):
    try:
        project_instance = project.objects.get(id=pk)
    except project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)

    todos = todo.objects.filter(id=pk)

    project_serializer = ProjectSerializer(project_instance)
    todo_serializer = TodoSerializer(todos, many=True)

    serialized_data = {
        'project': project_serializer.data,
        'todos': todo_serializer.data
    }

    return Response(serialized_data)


#update project
@api_view(['POST'])
@permission_classes((AllowAny,))
def updatetask(request, pk):
    project_instance = get_object_or_404(project, pk=pk)
    todo_instance = project_instance.list_of_todos  
    
    project_serializer = ProjectSerializer(project_instance, data=request.data.get('project'), partial=True)
    todo_serializer = TodoSerializer(todo_instance, data=request.data.get('todo'), partial=True)
    
    if project_serializer.is_valid() and todo_serializer.is_valid():
        project_serializer.save()
        todo_serializer.save()
        return Response({'message': ' updated successfully'})
    else:
        errors = {}
        if not project_serializer.is_valid():
            errors['project'] = project_serializer.errors
        if not todo_serializer.is_valid():
            errors['todo'] = todo_serializer.errors
        return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

#delete project
@api_view(['DELETE'])
@permission_classes((AllowAny,))
def deletetask(request, pk):
    project_instance = get_object_or_404(project, pk=pk) 
    todos_to_delete = todo.objects.filter(pk=pk)
    todos_to_delete.delete()
    project_instance.delete()
    return Response({'message': 'Are you sure,to delete this Project '})

#logout user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"success": "Logged out successfully"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)