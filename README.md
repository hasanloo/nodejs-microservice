### Installation / Setup

- For dev environments, it is recommended to use docker-compose, that references to a Postgres image, without requiring to install or use any existing database, leaving to docker to resolve this:
`make up` sets up both order and payment services on port 3001 and 3000
`make down` would kill docker containers for both services


### Endpoints

- Post an order

`curl -X POST "http://localhost:3001/order" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"name\": \"string\", \"address\": \"string\", \"price\": 0}"`

- Get an order status

`curl "http://localhost:3001/order/status/wj63kdrh"`

- Get all orders

`curl "http://localhost:3001/order/"`

- Cancle an order

`curl -X PUT "http://localhost:3001/order/cancel/ub6323fp" -H "accept: application/json" -H "Content-Type: application/json"`


- Create a payment

`curl -X POST "http://localhost:3000/payment" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"name\": \"string\", \"address\": \"string\", \"price\": 0, \"orderNumber\": \"ub6323fp\"}"`

- Get all payments

`curl "http://localhost:3000/payment/"`


### Some strategic decisions

- Used order number as the main request identifier in all request ( payment and order ). It would help to separate one the most important entities from database
- Record all the states of orders in a separate table. It is the time that data is the king, and tracking and making decisions by the most important data in this system ( order states ) is any data-driven system need to care bout it.

### Code level improvements

- Using PM2 as process manager in production
- Using queue systems instead of Promises in javascript ( for calling payment service )
- Using dynamic service for payment service in order to support multiple payment methods with less dependency injection
- E2e tests for overall system ( I prefer https://www.cypress.io/ )
- Some refactors mentioned in the code as TODO

### Setup improvements

- Setup production environment by Kubernetes and Terraform for infrastructure as code
- Setup Distributed Tracing. Tracing is a big challenges in microservice world
- Setup a centralised logging system ( ELK )
