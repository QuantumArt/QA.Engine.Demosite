FROM node:12 as build-env
LABEL stage=intermediate

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 80
ENTRYPOINT ["node", "build/server.js"]
