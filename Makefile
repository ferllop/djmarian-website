npm:
	docker-compose run node \
	npm -- \
	$(filter-out $@,$(MAKECMDGOALS))
%:
	@:
