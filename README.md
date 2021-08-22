# Groupomania

![alt text](https://github.com/AaronMillOro/AaronMillanOropeza_7_08072021/blob/main/prototype/assets/icon-above-font.png)

This repository contains the logic to deploy a securised internal **social network** for a fictional company named **Groupomania**.

The technologies used for the backend included: **NodeJS**, **Express** and **MySQL DB**. While, for the frontend **VueJS** was used to build the different components of the user interface.

The semantic of the commits is based on the model proposed by [gitmoji](https://github.com/carloscuesta/gitmoji).

## Main features

A given user :
* can create an account
* can login with a securised password token
* can modify the information of the account
* can retrieve all the previous publications in the social network
* can create new publication with text or images
* can add opinions to a specific publication
* delete publications and opinions that were created by the same user
* can like or dislike a given publication

A superuser :
* has the same options of a nomal user
* has the option to moderate the network by deleting any: i) opinion, ii) publication, or iii) account.


## Backend

During the conception of this project, I used **node v12.14.1** (npm v6.13.4). The package [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) (for Node Version Manager) was helpful to manage different node versions.

Before running the server side of the app, you need to install the required [dependencies](https://github.com/AaronMillOro/AaronMillanOropeza_7_08072021/blob/main/backend/package.json). To do so, type in the folder **'backend/'** :

```
npm install
```

Moreover, in the same folder **backend/** you need to create a file named '**.env**'. In that file you need to define the following environment variables (values inside <>):

```
PORT = <port>
USER = <mysql user name>
PASSWORD = <mysql user password>
DB_HOST = <mysql host>
DATABASE = <name of mysql database>
SECRET_KEY = <secure secret key for password encryption>
```

Then type in a terminal the following line to run the server:

```
npm start
```

The serve is available in: http://localhost:3000

## Frontend


Enjoy! :shipit:
