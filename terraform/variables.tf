variable "aws_region" {
  description = "Región de AWS"
  default     = "us-east-1"
}

variable "ec2_instance_type" {
  description = "Tipo de instancia EC2"
  default     = "t2.micro"
}

variable "key_name" {
  description = "Nombre del par de claves para EC2"
  default     = "nginx-server"
}

variable "db_username" {
  description = "Usuario de la base de datos"
  default     = "postgres"
}

variable "db_password" {
  description = "Contraseña de la base de datos"
  default     = "admin123"
}

variable "db_name" {
  description = "Nombre de la base de datos"
  default     = "task_manager"
}

variable "vpc_id" {
  description = "ID of the VPC where resources will be created"
  type        = string
  default     = "vpc-0db73927116b9f3a2"
}

variable "dockerhub_username" {
  description = "DockerHub username"
  type        = string
}

variable "dockerhub_password" {
  description = "DockerHub password"
  type        = string
  sensitive   = true
}


