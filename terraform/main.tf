resource "aws_instance" "app" {
  ami           = "ami-0e2c8caa4b6378d8c"
  instance_type = var.ec2_instance_type
  key_name      = var.key_name

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    yum install docker -y
    service docker start
    usermod -a -G docker ec2-user
    docker login -u <DOCKERHUB_USERNAME> -p <DOCKERHUB_PASSWORD>
    docker pull <DOCKERHUB_USERNAME>/task-manager-backend
    docker pull <DOCKERHUB_USERNAME>/task-manager-frontend
    docker run -d -p 5000:5000 <DOCKERHUB_USERNAME>/task-manager-backend
    docker run -d -p 80:80 <DOCKERHUB_USERNAME>/task-manager-frontend
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
