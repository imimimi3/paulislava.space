FROM node:12.7.0-alpine AS build

COPY .prettierrc.json .prettierignore tsconfig-base.json /var/www/

COPY shared /var/www/shared
WORKDIR /var/www/shared
RUN npm install
RUN npm run lint
RUN npm run test
RUN npm run build

COPY backend/package.json \
  backend/package-lock.json \
  backend/jest.config.json \
  backend/tsconfig.json \
  backend/.eslintrc.json /var/www/backend/

WORKDIR /var/www/backend
RUN npm install

COPY backend/src /var/www/backend/src
COPY backend/typings /var/www/backend/typings

RUN npm run lint
RUN npm run test
RUN npm run build

FROM node:12.7.0-alpine AS cleanup
COPY --from=build /var/www /var/www

RUN (cd /var/www/backend; npm prune --production)
RUN (cd /var/www/shared; npm prune --production)

# Production container setup
FROM node:12.7.0-alpine

RUN mkdir -p /var/lib/uploads

ENV NODE_ENV production
ENV UPLOAD_DIRECTORY /var/lib/uploads
ENV NODE_ICU_DATA /var/www/backend/node_modules/full-icu

COPY backend/package.json backend/package-lock.json /var/www/backend/
COPY --from=cleanup /var/www/backend/node_modules /var/www/backend/node_modules
COPY --from=cleanup /var/www/backend/build /var/www/backend/
COPY backend/docker-entrypoint-production.sh /docker-entrypoint.sh

COPY shared/package.json shared/package-lock.json /var/www/shared/
COPY --from=cleanup /var/www/shared/node_modules /var/www/shared/node_modules
COPY --from=cleanup /var/www/shared/build /var/www/shared/

WORKDIR /var/www/backend

ENTRYPOINT [ "/docker-entrypoint.sh" ]
