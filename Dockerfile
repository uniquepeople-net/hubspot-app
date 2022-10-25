# build stage
#FROM node:lts-alpine as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

# production stage
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM node:16.14.0-alpine

WORKDIR /vue-app

ENV PATH=/vue-app/node_modules/.bin:$PATH

COPY package.json /vue-app/package.json

#RUN npm install

COPY . /vue-app

CMD [ "npm", "start" ]

EXPOSE 5000
