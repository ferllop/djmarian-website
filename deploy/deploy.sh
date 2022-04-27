#!/bin/bash
source ../.env

deployProduction(){
  echo "Deploying production..."
  cd ..
  make npm install
  rm -rf ../build
  make npm run build
  
  echo "Removing previous remote build.."
  ssh -p $PRODUCTION_SSH_PORT $PRODUCTION_SSH_USER@$PRODUCTION_SSH_HOST "rm -rf $PRODUCTION_PROJECT_FULL_PATH/{build, deploy, docker-compose.yml}"

  echo "Creating deploy file..."
  tar cf ./deploy/deploy.tar ./build
  tar rf ./deploy/deploy.tar ./docker-compose.yml
  tar rf ./deploy/deploy.tar ./deploy/apache/full-httpd.conf
  
  echo "Transfering deploy file..."
  scp -P $PRODUCTION_SSH_PORT ./deploy/deploy.tar $PRODUCTION_SSH_USER@$PRODUCTION_SSH_HOST:$PRODUCTION_PROJECT_FULL_PATH/
  
  echo "Executing remote command..."
  ssh -p $PRODUCTION_SSH_PORT $PRODUCTION_SSH_USER@$PRODUCTION_SSH_HOST "cd $PRODUCTION_PROJECT_FULL_PATH;tar xf deploy.tar;rm deploy.tar; docker-compose up -d --force apache"
}

deployDevelopment(){
  echo "Deploying development..."
  cd ..
  rm -rf build
  make npm install
  make npm run build
  docker-compose up -d --force apache
}

case $ENVIRONMENT in
  production) deployProduction;;
  development) deployDevelopment;;
  *) echo "Please set the ENVIRONMENT environment variable in your .env file";exit 1;;
esac
