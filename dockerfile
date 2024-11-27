# Usar una imagen base de Node.js
FROM node:16

# Crear el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto que usará el indexer, si es necesario
EXPOSE 3000

# Establecer variables de entorno si las tienes
ENV NODE_ENV=production

# Comando para ejecutar el indexer
CMD ["node", "index.js"]
