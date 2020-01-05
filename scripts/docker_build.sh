#!/bin/sh
set -eu

NAME="$(fx package.json  'this.name')"
CREATED=$(date -u +%Y-%m-%dT%T%z)
TITLE="$(fx package.json  'this.description')"
REVISION="$(git rev-parse --short HEAD)"
SOURCE="$(git config --get remote.origin.url)"

docker build \
  -t "koenighotze/marrakesh-service" \
  --build-arg NAME="$NAME" \
  --build-arg CREATED="$CREATED" \
  --build-arg TITLE="$TITLE" \
  --build-arg REVISION="$REVISION" \
  --build-arg SOURCE="$SOURCE" \
  .


