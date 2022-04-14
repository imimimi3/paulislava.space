FROM node:14.15.0-alpine

RUN apk add --no-cache jq

COPY .prettierrc.json .prettierignore tsconfig-base.json /var/lib/

COPY bim-shared /var/lib/bim-shared
WORKDIR /var/lib/bim-shared
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN npm install
RUN npm run lint
RUN npm run test
RUN npm run build

COPY frontend/package.json frontend/package-lock.json /var/lib/frontend/

WORKDIR /var/lib/frontend/

RUN npm install

ENV NODE_ENV production
ENV WITH_DMS true

COPY frontend/docker-entrypoint-build.sh /
COPY frontend/.stylintrc \
     frontend/.eslintrc.json \
     frontend/tsconfig.json \
     frontend/webpack.common.config.js \
     frontend/webpack.production.config.js  /var/lib/frontend/

COPY frontend/src /var/lib/frontend/src/
COPY frontend/typings /var/lib/frontend/typings/
COPY frontend/public /var/lib/frontend/public/

ENTRYPOINT /docker-entrypoint-build.sh
