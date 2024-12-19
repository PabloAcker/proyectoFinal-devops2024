resource "aws_instance" "app" {
  ami           = "ami-0e2c8caa4b6378d8c"
  instance_type = var.ec2_instance_type
  key_name      = var.key_name

  user_data = file("${path.module}/userdata/user_data.sh") # Script para Docker

  tags = {
    Name = "task-manager-ec2"
  }

  security_groups = [aws_security_group.ec2_sg.name]
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "13.4"
  instance_class       = "db.t2.micro"
  db_name              = var.db_name
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres13"
  publicly_accessible  = true
  skip_final_snapshot  = true

  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  tags = {
    Name = "task-manager-rds"
  }
}
