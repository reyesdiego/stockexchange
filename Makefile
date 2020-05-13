
up:
	@cd $(shell pwd);\
	docker-compose up -d --build

down:
	@cd $(shell pwd);\
	docker-compose down;\
	docker rm modusbox-nginx

stop:
	@cd $(shell pwd);\
	docker-compose stop

build-nginx:
	@cd $(shell pwd)/nginx;\
	docker build -t modusbox-nginx:1.0 .;\

stop-nginx:
	@docker stop modusbox-nginx

run-nginx: build-nginx
	@docker rm modusbox-nginx;\
	docker run --net modusbox_default -d -p 8080:80 --link modusbox_modusbox_1:server --name modusbox-nginx  modusbox-nginx:1.0