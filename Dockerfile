# Base NodeJS Image
FROM node:8
# Create a work directory
RUN mkdir -p /app
# Set work directory for COPY,RUN,CMD command
WORKDIR /app
COPY . /app

RUN npm install
# Exposing a port for the application to run on
EXPOSE 9999
# Populate initial data into Mongo DB
#CMD ["node", "public/initDB.js"]
# Run the Node application
CMD ["node", "app.js"]
