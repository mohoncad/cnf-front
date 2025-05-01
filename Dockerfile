FROM node:16.16 as build
COPY package*.json .
RUN npm install
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
