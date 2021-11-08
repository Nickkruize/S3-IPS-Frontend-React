FROM node:latest
MAINTAINER Nick Kruize
ADD . /var/www
WORKDIR /var/www

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]