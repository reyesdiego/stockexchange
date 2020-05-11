#### What architecture, design patterns and nodejs technology decisions have I made? ####

The decision is to split the api code into 3 layer (http, controller, service) (in the future could be applied a database one). The http layer is Fastify framework. I found it very straight forward to setup the api endpoint schemas via swagger. The endpoint will validate incoming JSON schemas as early as possible and there is not need to write complex code validation in the controller layer. Same way for the response schema where the is a contract expected to be always the same.
This layer implements the Service layer with Dependency Injection.

#### How would I implement error handling? ####
The error handling is based on throw an exception using only the built-in Error object instead of returning 
error strings. The API is async await based pattern, so performing try catch to prevent unhandled errors.

#### How would I make this scale? ####
The API has 3 layers. Http, controller and service layer. They are not depending on each other, so in case
of changing provider for Stock Exchange API it can be done changin only the service layer. In case of adding
database easily would add a database layer behind the Service layer.

#### How would I test this solution? #####
For unit testing the service layer of application was created with Dependency Injection Pattern in order
to fake the testing. In this case this service is consuming an external API and it is proper to fake the 
behavior. Anyway faking in unit testing helps to better test the methods.

#### What security requirements could I consider? ####
It is implemented Json Web Token for securing the endpoints. There must be login for users to get a token and authenticate to access the api endpoint.
The docker image is using the "node" user adding proper permissions. Instead of using the root user
