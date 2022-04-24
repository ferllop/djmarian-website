#!/bin/sh
BUILD_SOURCE=../src
BUILD_DESTINATION=./apache/build
rm -rf $BUILD_DESTINATION
cp -r $BUILD_SOURCE $BUILD_DESTINATION
ln --symbolic --force ../.env .env
docker-compose up --detach --build
