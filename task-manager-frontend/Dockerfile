# Usar una imagen base para Node.js
FROM node:16-alpine AS build

# Crear y configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Cambiar permisos de los archivos para evitar problemas
RUN chmod -R 755 /app

# Construir la aplicación
RUN npm run build

# Usar Nginx para servir la aplicación
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
