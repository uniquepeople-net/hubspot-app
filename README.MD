Rename vue_app to your project folder app name

**To first start docker** \
First time you start you need to build the image 
> docker-compose up -d --build

**To every next start docker** \
Every next time, when you start 
> docker-compose up -d

**Commands**
1. For Node commands
> docker run --rm -w /home/node/vue_app -v $PWD:/home/node/vue_app node:16 npm install || do npm install

**To stop docker**
> docker-compose down