#!/bin/bash

source .env
cd docker

print() {
  echo -e "\n\n### $1 ###\n"
}

deployProduction(){
  echo -e "\nDeploying production"

  print "Installing dependencies if needed"
  docker compose --env-file=../.env -f build.compose.yml run --rm node npm ci

  print "Building"
  docker compose --env-file=../.env -f build.compose.yml run --rm node npm run build

  print "Stopping previous server"
  docker compose --env-file=../.env -f server.compose.yml -f ./traefik.server.compose.yml down

  print "Starting server"
  docker compose --env-file=../.env -f server.compose.yml -f ./traefik.server.compose.yml up -d
}

deployDevelopment(){
  print "Installing dependencies if needed"
  docker compose --env-file=../.env -f build.compose.yml run --rm node npm install --no-save

  print "Building"
  docker compose --env-file=../.env -f build.compose.yml run --rm node npm run build

  print "Stopping previous server"
  docker compose --env-file=../.env -f server.compose.yml -f local.server.compose.yml down

  print "Starting server"
  docker compose --env-file=../.env -f server.compose.yml -f local.server.compose.yml up -d

  print "Serving on http://localhost:$APACHE_LOCAL_PORT"
}

case $ENVIRONMENT in
  production) deployProduction;;
  development) deployDevelopment;;
  *) echo "Please set the ENVIRONMENT environment variable in your .env file";exit 1;;
esac
