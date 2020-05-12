# Stock Exchange

This project contains the Stock Exchange API that powers the platform so backend logic is here.

## Setting up project

This project can be run in a docker container. The are 2 ways to setup the api, under port 3000 running with nodejs or with nginx with a reverse proxy under the port 8080.

In root directory execute the following command
```bash
make build-api
```
The API is running in port 3000
```bash
curl http://localhost:3000
--> {"hi": "there"}
```

Then to create and run the API with nginx with reverse proxy
```bash
make build-nginx
make run
```
The API is running in port 8080
```bash
curl http://localhost:8080
--> {"hi": "there"}
```

##Development

To run the project in development just run (port 30003)
```bash
npm run dev
```
Running unit test
```bash
npm run test
```