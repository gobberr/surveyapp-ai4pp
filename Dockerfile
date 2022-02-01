# build stage
FROM node:12-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV

RUN npm run build:${NODE_ENV} && npm run update-env-${NODE_ENV}

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
