# Events-Manager

## Description
An events manager application developed by using Node.js and Angular. Users with administrative permissions can create events while others can view events and choose to attend them. Attended events will be saved so users can view them. Attendees can also be viewed for each event. 

This application was developed in the Developing Web Applications course at BCIT.

## Technologies Used:
- Node.js
- Angular
- Webstorm & Visual Studio Code
- MongoDB

## Prerequisites
The following are **required** to install:
  - [NodeJS](https://nodejs.org/en/)
  - [MongoDB](https://www.mongodb.com/try/download/community)
  - [AngularCLI](https://cli.angular.io/)

## Usage
You must create a database in MongoDB in order to allow the data from the application to be stored.

Navigate to the Mongo bin folder -> `C:\Program Files\MongoDB\Server\4.2\bin`

Next, type the following commands to create the database: 

```
mongod
mongo
use EventDB
```

**Note:** The database must be named **EventDB**.

To use the application, you must run `app.js` in the **ex_fullCrud_MVC** folder **AND** locate to the myapp folder in **angularClient** and use `ng serve`. Once the application has finished compiling, navigate to localhost:4200 in your browser to view the app.
