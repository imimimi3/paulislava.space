#!/usr/bin/env sh
set -e

cd /var/www/frontend

echo 'Dev server init'

echo 'Installing packages...'
npm install

echo 'Running dev server...'
npm run dev