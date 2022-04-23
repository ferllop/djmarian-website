#!/bin/sh
ln -s ../.env ./deploy/.env
cd deploy
./git-post-receive-hook.sh
