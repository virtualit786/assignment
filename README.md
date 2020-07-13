
# Overview

Simplest MERN application, with client in ReactJS and CLI app in simple nodejs communicating with graphql based api server. The api server uses PostgreSQL as datasource.  


## Git process
I have used mostly gitflow process on projects that allow it, but due to shortage of time, did not opted for this small assignemnt. 

## Docker 
The application is dockerized and to run the application (react client, nodejs api server, postgresql database and mail server mailcatcher), from the root folder, run 

```
docker-compose up
```

This builds and launches the three docker containers.

- Database postgresql
- Mail server mailcatcher accessible @ `http://localhost:1080`
- NodeJS graphql api server accessible @ `http://localhost:4000/graphql`
- React client accessible @ `http://localhost:3000/


## CLI Application 
CLI application can be executed from cli folder by runnig 

```
yarn install && yarn start
```

## Features

### Security, CORS, Rate limiting, Depth limits
Due to the shortage of time, cors, helmet is used along with rate limiting and graphql query depth limit for 7 levels which is of no use here as the app only have one entity. One important performacne tip, DataLoader should always be used to address n+1 queries with graphql.
