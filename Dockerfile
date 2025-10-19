FROM node:22-slim

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y openssl && \
  rm -rf /var/lib/apt/lists/* 

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --silent && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]