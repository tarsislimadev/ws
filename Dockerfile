FROM nginx

COPY ./dist/ws/ /usr/share/nginx/html
