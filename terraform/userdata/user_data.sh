#!/bin/bash
yum update -y
yum install docker -y
service docker start
usermod -a -G docker ec2-user

# Login a DockerHub
docker login -u <DOCKERHUB_USERNAME> -p <DOCKERHUB_PASSWORD>

# Pull y ejecutar las imágenes
docker pull <DOCKERHUB_USERNAME>/task-manager-backend
docker pull <DOCKERHUB_USERNAME>/task-manager-frontend

docker run -d -p 5000:5000 <DOCKERHUB_USERNAME>/task-manager-backend
docker run -d -p 80:80 <DOCKERHUB_USERNAME>/task-manager-frontend
