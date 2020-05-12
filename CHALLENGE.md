#### What architecture, design patterns and nodejs technology decisions have I made? ####

The decision is to split the api code into 3 layer (http, controller, service) (in the future could be applied a database one). The http layer is Fastify framework. I found it very straight forward to setup the api endpoint schemas via swagger while documentation is created automatically without importing schemas from swagger hub. The endpoints will validate incoming JSON schemas as early as possible and there is not need to write complex code validation in the controller layer. Same way for the response schema where the is a contract expected to be always the same via swagger schema.
This Controllers implements the Service layers with Dependency Injection, to facilitate services unit testing.

#### How would I implement error handling? ####
The error handling is based on throw exceptions using only the built-in Error object instead of returning 
error strings. The API is async await based pattern, so performing try catch to prevent unhandled promises errors. The error logging is handled automatically with fastify and are hosted in the project manager of the API (docker container).

#### How would I make this scale? ####
Http, controller and service layer. They are not depending on each other, so for instance, in case of changing provider for Stock Exchange API it can be done changing only the service layer. In case of changing
database provider easily would add a database layer behind the Service layer. (in the case of this challenge there is no database layer for a matter of time, database handling is in Service Layer).
For instance, I added a second Stock Exchange Provider (in Feature-Second-Backup-Provider branch) where I only needed to change the Quote Service layer.

#### How would I test this solution? #####
For unit testing the service layer of application was created with Dependency Injection Pattern in order
to fake the testing. In this case this service is consuming an external API and it is proper to fake the 
behavior. Anyway faking in unit testing helps to better test the methods. For this challenge I only tested the Service Layer for a matter of time as well.

#### What security requirements could I consider? ####
It is implemented Json Web Token for securing the endpoints. In this case I added a mongodb database to handle users. The users must register and then login to get a token to authenticate over the api endpoints. There is only one endpoint /quote with authentication in this example.
On the other side docker image is using the "node" user adding proper permissions, instead of using the root user, so in case of any attack with "node" user permissions the attacker cannot go over the network, changing
for instance the iptables. Next step must be to add https with nginx and certbot