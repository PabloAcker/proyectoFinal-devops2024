resource "aws_instance" "app" {
  ami           = "ami-0e2c8caa4b6378d8c"
  instance_type = var.ec2_instance_type
  key_name      = var.key_name

  user_data = <<-EOF
    #!/bin/bash
    export RDS_ENDPOINT=$(cat /etc/rds_endpoint)
    apt-get update -y
    apt-get install -y docker.io
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
    docker login -u ${var.dockerhub_username} -p ${var.dockerhub_password}
    docker pull ${var.dockerhub_username}/task-manager-backend
    docker pull ${var.dockerhub_username}/task-manager-frontend
    sudo docker run -d -p 5000:5000 \
      -e DB_HOST=$RDS_ENDPOINT \
      -e DB_USER=postgres \
      -e DB_PASSWORD=admin123 \
      -e DB_NAME=taskmanager \
      pabloacker/task-manager-backend
    sudo docker run -d -p 80:80 ${var.dockerhub_username}/task-manager-frontend
  EOF

  tags = {
    Name = "task-manager-ec2"
  }

  security_groups = [aws_security_group.ec2_sg.name]
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "14.11" #13.18
  instance_class       = "db.t3.micro"
  db_name              = var.db_name
  username             = var.db_username
  password             = var.db_password
  publicly_accessible  = true
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = {
    Name = "task-manager-rds"
  }
}
