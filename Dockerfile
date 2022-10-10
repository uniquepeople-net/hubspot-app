FROM node:16.14.0-alpine

WORKDIR /vue-app
COPY package.json /vue-app/package.json
RUN npm install

CMD ["npm", "run", "serve"]