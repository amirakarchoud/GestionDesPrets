
FROM node:carbon-alpine as builder

WORKDIR /src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]