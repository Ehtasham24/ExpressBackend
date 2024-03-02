FROM node:21-alpine3.18

WORKDIR /pos-server
COPY package.*json /Fastify-server/
COPY . .

RUN npm install 
RUN npm install nodemon

EXPOSE 5000

CMD ["npm","run","dev"]

