
# DigsUp Email Subscription System

## Overview

A simple email subscription system built with the MERN stack (MongoDB replaced with PostgreSQL). The application allows users to subscribe with their email address through a web interface, and administrators to send confirmation emails to subscribers through a CLI tool.

## Requirements Specification

### Core Requirements

1. Create a web application that allows users to subscribe to a mailing list by providing their email address
2. Implement email validation to ensure only valid email addresses are accepted
3. Prevent duplicate subscriptions by checking if an email is already registered
4. Develop a CLI tool for administrators to process pending subscriptions and send confirmation emails
5. Track the status of email delivery for each subscription
6. Provide a simple, responsive user interface for the subscription form
7. Display appropriate success and error messages to users

### Technical Requirements

1. Develop a React-based frontend for the subscription form
2. Create a GraphQL API server using Node.js
3. Use PostgreSQL as the database to store subscription information
4. Implement email sending functionality
5. Containerize the application with Docker for easy deployment
6. Include basic security measures like rate limiting and CORS protection
7. Enable real-time updates using GraphQL subscriptions

### User Experience

1. Users should receive immediate feedback after submitting the subscription form
2. The interface should be simple and intuitive
3. Error messages should be clear and helpful
4. The application should work across different devices and screen sizes

### Administration

1. Provide a command-line interface for administrators to process pending subscriptions
2. Display statistics about successful and failed email deliveries
3. Allow monitoring of subscription status through a mail catcher for development


## Git process
I have used mostly gitflow process on projects that allow it, but due to shortage of time, did not opted for this small assignemnt. 

## Docker 
The application is dockerized. Env variables are defined in docker-compose.yml file. Better solution would have been to use dotenv. 
Docker is currently setup for dev mode only. Better solution would have been to define the environment bassed docker-compose.
To run the application (react client, nodejs api server, postgresql database and mail server mailcatcher), from the root folder, run 

```
docker-compose up
```

This builds and launches the three docker containers.

- Database postgresql
- Mail server mailcatcher accessible @ `http://localhost:1080`
- NodeJS graphql api server accessible @ `http://localhost:4000/graphql`
- React client accessible @ `http://localhost:3000/`


## CLI Application 
CLI application can be executed from cli folder by runnig 

```
yarn install && yarn start
```

## Features

### Security, CORS, Rate limiting, Depth limits
Due to the shortage of time, cors, helmet is used along with rate limiting and graphql query depth limit for 7 levels which is of no use here as the app only have one entity. One important performacne tip, DataLoader should always be used to address n+1 queries with graphql.
