FROM node:20.2.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# Ejecutar las migraciones y luego iniciar la aplicación
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
