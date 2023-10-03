## build stage
#FROM node:lts-alpine as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#COPY webpack.k8s.config.js ./webpack.config.js
#RUN npm run build
##production stage
#FROM nginx:stable-alpine as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]



#dev stage
FROM node:16.14.0-alpine
WORKDIR /hubspot-app
ENV PATH=/hubspot-app/node_modules/.bin:$PATH
COPY package.json /hubspot-app/package.json

#RUN npm install
COPY . /hubspot-app
CMD [ "npm", "start" ]
EXPOSE 5001