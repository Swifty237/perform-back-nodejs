FROM node:18.17.1

EXPOSE 3000

WORKDIR app

COPY configurations-routes.js configurations-routes.js
COPY controllers controllers
COPY graphs-routes.js graphs-routes.js
COPY pronostics-routes.js pronostics-routes.js
COPY rankings-routes.js rankings-routes.js
COPY ufc-news-routes.js ufc-news-routes.js
COPY server.js server.js
COPY utils utils
COPY package.json package.json

RUN npm install

CMD node server.js
