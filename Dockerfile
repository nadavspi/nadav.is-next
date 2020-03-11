FROM node:13-alpine
LABEL maintainer="Nadav Spiegelman <me@nadav.name>"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT npm run dev
