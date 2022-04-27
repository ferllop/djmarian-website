SHELL := /bin/bash

npm:
	docker-compose run node \
	npm -- \
	$(filter-out $@,$(MAKECMDGOALS))

deploys:
	echo "Deploying..."
	source .env
	make npm install && \
	rm -rf build && \
	docker-compose run node npm -- install && \
	docker-compose run node npm -- run build && \
	docker-compose up -d --force apache

pepe:
	echo "PEPE"
	ls

%:
	@:
