# Notes App - Backend

This represents a straightforward notes application, featuring a basic Node.js setup that includes simple CRUD operations and user registration and login capabilities.

Features included are:
- A user can register with email and password
- A user can login with email and password
- A user can add a note
- A user can only edit his note
- A user can only delete his note
- A user can only get his note
- A user can only get his note list
- A user can't access notes of another user
- Only authorized and authenticated user can add, edit, get and delete his note

API Documentation: https://documenter.getpostman.com/view/7228218/2s9YJaZ4s4

## Requirements

For development, you will need MongoDB v6.x, Node.js v18.x (recommended) and a node global package, NPM, installed in your environement.

### Node

Node.js is a JavaScript runtime for server-side programming. It allows developers to create scalable backend functionality using JavaScript, a language many are already familiar with from browser-based web development.

- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

There are multiple ways of installing node in ubuntu

- ##### Installing Node Using the Node Version Manager

It is recommended to install NodeJS using the Node Version Manager (nvm), because it allows to install and manage multiple versions on the same machine.

Installing nvm, the Node Version Manager, and using it to install and manage multiple versions of Node.js

(https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

- ##### Installing Node.js with Apt from the Default Repositories

You can install nodejs and npm easily with apt install, just run the following commands.

sudo apt update
sudo apt install nodejs
sudo apt install npm

- ##### Installing TypeScript 

You can install TypeScript easily with npm install, just run the following commands.

npm install -g typescript

- #### Other Operating Systems

You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command:

node --version

npm --version

- #### Check Node Version

Check version with this command, node -v
Node version should be v18 or v18+

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

npm install npm -g

## Install Packages

At the root directory of the application, run the following command to install packages:

npm install

## Configure app

Add .env file at root of the project. Sample values available in .env.example file.

## Building the project

Build project with following command:

npm run build

## Running the project in Development mode

Start the project in development mode with following command:

npm run dev


## Running the project

Start running project with following command:

npm start

## PORT

This backend would run on port 8080, if you provide PORT 8080 in .env

The required PORT can be added in the .env file

## Deployment using Docker
- The project includes Dockerfile as well as docker-sompose.yml file.
- in order to start the project in docker containners, please run the following command
`docker compose up -d`
- This will command will create an image from Dockerfile and will start the MongoDB and NodeJs containers, exposing the specified port to the public.