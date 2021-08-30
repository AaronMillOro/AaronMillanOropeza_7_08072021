# Groupomania

![alt text](https://github.com/AaronMillOro/AaronMillanOropeza_7_08072021/blob/main/frontend/src/assets/icon-left-font.png)

This repository contains the logic to deploy a securised internal **social network** for a fictional company named **Groupomania**.

The technologies used for the backend included: **NodeJS**, **Express** and **MySQL DB**. While, for the frontend **VueJS** and **Bootstrap** were used to build the different components of the user interface.

The semantic of the commits is based on the model proposed by [gitmoji cli](https://github.com/carloscuesta/gitmoji).

## Main features

A given user :
* can create an account
* can login with a securised token
* can modify the information of her/his account
* can retrieve the previous publications in the social network
* can create a new publication with text and images
* can publish opinions into a specific publication
* is able to delete publications and opinions that were created by the same user
* can like or dislike a given publication

The administrator.s :
* has/have the same posibilities of a normal user
* is able to to moderate the network by deleting any: i) opinion, ii) publication, or iii) user account.

## Security features

Security measures were considered in the conception of the project, these include:

* The generation of passwords with a password validator
* The stored passwords in MySQl DB are encrypted
* Authentification was implemented with a temporary token and all the routes require the authentication of this token.
* No cache is allowed in the app
* Security was reinforced with the [helmet](https://www.npmjs.com/package/helmet) package

## The project

During the conception of this social network, I used **node v12.14.1** (npm v6.13.4) for both **backend** and **fronend**. The package [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) (for Node Version Manager) was helpful to manage different node versions.

### Backend

Before running the server side of the app, you need to install the required [dependencies](https://github.com/AaronMillOro/AaronMillanOropeza_7_08072021/blob/main/backend/package.json). To do so, type in the folder **'backend/'** :

```
npm install
```

Moreover, in the same folder **backend/** you need to create a file named '**.env**'. In that file, the following environment variables need to be defined (values inside <>):

```
PORT = <port>
USER = <mysql user name>
PASSWORD = <mysql user password>
DB_HOST = <mysql host>
DATABASE = <name of mysql database>
SECRET_KEY = <secure secret key for password encryption>
```

In addition to that, you need to create a folder named **img** in the backend/ directory. The later in order to handle images.

Then, type in a terminal the following line to run the server:

```
npm start
```

The backend server is available at: http://localhost:3000

### Frontend

The frontend was developped by using mainly **VueJs**, **Boostrap** and **Axios**. Here is the full list of [required dependencies](https://github.com/AaronMillOro/AaronMillanOropeza_7_08072021/blob/main/frontend/package.json). To install them, type in the folder **frontend/**:

```
npm install
```

To run the frontend, type: 

```
npm run serve
```

In a web browser you can access the application at: http://localhost:8080

Enjoy! :shipit:
