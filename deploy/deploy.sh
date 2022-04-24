#!/bin/sh
BUILD_SOURCE=$(pwd)/../src
BUILD_DESTINATION=$(pwd)/apache/build
rm -rf $BUILD_DESTINATION
mkdir $BUILD_DESTINATION
docker run -v $BUILD_SOURCE:/code -v $BUILD_DESTINATION:/build node:16.14.2-alpine /bin/sh -c "npm i -g @11ty/eleventy; eleventy --input=/code --output=/build"
ln --symbolic --force ../.env .env
docker-compose up --detach --build
