#!/usr/bin/env sh
set -e

cd /var/www/backend

echo 'Installing packages...'
npm install

echo 'Running migrations...'
npm run typeorm migration:run

echo 'Starting server...'
npm run start:dev
