SHELL := /bin/bash

deploy:
	echo "Deploying..."
	git push production main

%:
	@:
