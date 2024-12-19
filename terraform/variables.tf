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
}

variable "db_username" {
  description = "Usuario de la base de datos"
  default     = "postgres"
}

variable "db_password" {
  description = "Contraseña de la base de datos"
}

variable "db_name" {
  description = "Nombre de la base de datos"
  default     = "task_manager"
}
