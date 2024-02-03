FROM tmvdl/node:angular as stage

WORKDIR /app

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=stage /app/dist/ws/ /usr/share/nginx/html
