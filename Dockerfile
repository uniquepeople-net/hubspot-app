FROM node:16.14.0-alpine

WORKDIR /vue-app

ENV PATH=/vue-app/node_modules/.bin:$PATH

COPY package.json /vue-app/package.json

#RUN npm install

COPY . /vue-app

CMD [ "npm", "start" ]

EXPOSE 5000
# Install app dependencies
#RUN mkdir /build-dir
#WORKDIR /build-dir
#COPY package.json /build-dir
#RUN npm install

# Create app directory
#RUN mkdir -p /vue-app
#WORKDIR /vue-app
#RUN ln -s /build-dir/node_modules node_modules

# Bundle app source
#COPY . /vue-app

#CMD [ "npm", "start" ]