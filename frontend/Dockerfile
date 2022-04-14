FROM node:14.16.0-alpine

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
WORKDIR /var/www/frontend

ENTRYPOINT [ "/docker-entrypoint.sh" ]
