#!/bin/sh
BUILD_SOURCE=../src
BUILD_DESTINATION=./apache/build
rm -rf $BUILD_DESTINATION
cp -r $BUILD_SOURCE $BUILD_DESTINATION
docker-compose up -d --build
