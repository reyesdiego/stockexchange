# Stock Exchange

This project contains the Stock Exchange API that powers the platform so backend logic is here.

## Setting up project

This project can be run in a docker container. The are 2 ways to setup the api, under port 3000 running with nodejs or with a nginx reverse proxy under the port 8080.

In root directory execute the following command
```bash
make up
```
The API is running in port 3000
```bash
curl http://localhost:3000
--> {"hi": "there"}
```

Then to create and run the API with nginx with reverse proxy
```bash
make run-nginx
```
The API is running in port 8080
```bash
curl http://localhost:8080
--> {"hi": "there"}
```

##Development

To run the project in development.
```bash
npm run dev
```
The API will listen on port 30003. It will run via nodemon which must be installed globally, if it is not:
```bash
npm i nodemon --save-dev
```
Running unit test
```bash
npm run test
```

Api documentation can be seen in the browser http://localhost:30003/documentation


**Final notes:**

Any question about the challenge please send me an email anytime to reyesdiego@hotmail.com