FROM node:latest

RUN mkdir /src

RUN npm install nodemon -g
RUN npm install eslint -g
RUN npm install sequelize
RUN npm install sequelize-cli

WORKDIR /src

ADD package.json /src/package.json
ADD .editorconfig /src/.editorconfig
ADD .eslintrc.json /src/.eslintrc.json

RUN npm install

ADD app/bootstrap/nodemon.json /src/nodemon.json

EXPOSE 3000

CMD npm start
