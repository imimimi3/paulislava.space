FROM node:14.16.0-alpine

RUN apk update && apk add git
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
WORKDIR /var/www/backend

ENTRYPOINT [ "/docker-entrypoint.sh" ]
