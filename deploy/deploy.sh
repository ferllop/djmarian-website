#!/bin/bash

deployProduction(){
  echo "Deploying production..."
  cd ..
  if [ ! -d build ]; then
    OPTIONS=--force
  fi
  make npm install
  make npm run build
  docker-compose up -d $OPTIONS apache
}

deployDevelopment(){
  echo "Deploying development..."
}

source ../.env
case $ENVIRONMENT in
  production) deployProduction;;
  development) deployDevelopment;;
  *) echo "Please set the ENVIRONMENT environment variable in your .env file";exit 1;;
esac
