#!/bin/sh
BUILD_DESTINATION=../build
rm -rf $BUILD_DESTINATION
mkdir $BUILD_DESTINATION
ln --symbolic --force ../.env .env
docker-compose up --detach --build --force
docker-compose run eleventy
