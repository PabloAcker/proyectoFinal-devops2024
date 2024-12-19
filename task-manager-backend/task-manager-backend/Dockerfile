FROM node:16-alpine

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 5000

# Comando de inicio
CMD ["node", "index.js"]
