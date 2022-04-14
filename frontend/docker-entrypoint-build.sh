#!/bin/sh

set -e

echo 'Linting code...'
npm run lint

echo "Building"
npm run build

if [ -z "$TARGET_VERSION" ]; then
    if [ -n "$TARGET_VERSION_BASE" ]; then
        TARGET_VERSION="$TARGET_VERSION_BASE"
    else
        TARGET_VERSION="$(jq -r '.version' /var/lib/frontend/package.json)"
    fi
    if [ -n "$BUILD_NUMBER" ]; then
        TARGET_VERSION="$TARGET_VERSION.$BUILD_NUMBER"
    else
        TARGET_VERSION="$TARGET_VERSION.$(date -u '+%Y%m%d%H%M%S')"
    fi
fi

if [ -z "$TARGET_NAME" ]; then
    TARGET_NAME="$(jq -r '.name' /var/lib/frontend/package.json)"
fi

ARCHIVE_NAME="$TARGET_NAME-$TARGET_VERSION"

echo "Assembling archive '$ARCHIVE_NAME' to /var/lib/frontend/build/"

tar -C "/var/lib/frontend/dist" -zcf "/var/lib/frontend/build/$ARCHIVE_NAME.tar.gz" .

echo "Done"
