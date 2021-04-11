# Dockerfile
FROM node:15.14.0-alpine3.10
WORKDIR /src/app
COPY . /src/app
RUN npm install
EXPOSE 5000 35729
CMD npm run dev