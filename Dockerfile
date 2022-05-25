FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm set audit false

RUN npm install -g @angular/cli@latest

COPY . .

EXPOSE 4200

# EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disableHostCheck", "true"]

# CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80", "--disableHostCheck", "true"]
