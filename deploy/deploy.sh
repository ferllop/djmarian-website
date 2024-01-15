#!/bin/bash

source ../.env

deployProduction(){
  echo "Deploying production..."
  docker compose -f ../build.compose.yml run --rm node npm ci
  docker compose -f ../build.compose.yml run --rm node npm run build
  docker compose --env-file=../.env -f production.compose.yml up -d
}

deployDevelopment(){
  echo "Deploying development..."
  cd ..
  rm -rf build
  make npm install
  make npm run build
  docker-compose -f server.compose.yml up -d --force apache
}

case $ENVIRONMENT in
  production) deployProduction;;
  development) deployDevelopment;;
  *) echo "Please set the ENVIRONMENT environment variable in your .env file";exit 1;;
esac
