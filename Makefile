
build-api:
	@cd $(shell pwd);\
	docker build -t modusbox:1.0 .;\
	docker stop modusbox;\
	docker rm modusbox;\
	docker run -d -p 3000:3000 --name modusbox modusbox:1.0

build-nginx:
	@cd $(shell pwd)/nginx;\
	docker build -t modusbox-nginx:1.0 .;\

run-nginx: build-nginx
	@docker stop modusbox-nginx;\
	docker rm modusbox-nginx;\
	docker run -d -p 8080:80 --link modusbox:server --name modusbox-nginx  modusbox-nginx:1.0