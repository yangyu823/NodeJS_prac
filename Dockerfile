# Base NodeJS Image
FROM node:8

# Create a work directory
RUN mkdir -p /app

# Set work directory for RUN command
WORKDIR /app

COPY . /app
RUN npm install

# Exposing a port for the application to run on
EXPOSE 9999



CMD ["node", "app.js"]
