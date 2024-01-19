SHELL := /bin/bash

remote-deploy:
	@echo "Deploying..."
	git push production main

local-deploy:
	@echo "Deploying..."
	./local-deploy.sh

%:
	@:
