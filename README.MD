Rename hubspot-app to your project folder app name

**To first start docker** \
First time you start you need to build the image 

> docker-compose build

	**Build without cache**

> docker-compose build --no-cache 


**Install packges (node_modules)** \

> docker run --rm -w /home/node/hubspot-app -v $PWD:/home/node/hubspot-app node:16 npm install 


**To every next start docker** \
**Every next time, when you start** \ 

> docker-compose up -d


**Commands**
**1. For Node commands** \

> docker run --rm -w /home/node/hubspot-app -v $PWD:/home/node/hubspot-app node:16 npm install || do npm install

**To stop docker**
> docker-compose down

