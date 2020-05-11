
build-api:
	@cd $(shell pwd);\
	docker build -t modusbox:1.0 .;\
	docker run -d -p 3000:3000 --name modusbox modusbox:1.0

build-nginx:
	@cd $(shell pwd)/nginx;\
	docker build -t modusbox-nginx:1.0 .;\

run:
	@docker run -d -p 8080:80 --link modusbox:server --name modusbox-proxy  modusbox-nginx:1.0