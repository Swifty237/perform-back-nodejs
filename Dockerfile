FROM node:18.17.1

EXPOSE 3000

WORKDIR app

COPY controllers controllers
COPY utils utils
COPY *.js ./
COPY package*.json ./

RUN npm install

CMD node server.js
