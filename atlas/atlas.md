# Mongo DB Atlas

https://www.mongodb.com/cloud/atlas

## Register

You can register without setting up billing to use free tier 

## Create a cluster

### Name
Name your organization and project

Organization

Project Name

What is your preferred language?
JS

### Path
Choose a path. Adjust anytime.

Choose `FREE`

### Create a Shared Cluster

#### Cloud Provider & Region
Atlas provides a default setting for you but you can really choose whatever you want here. In general I would say it's a good practice to choose geographical location close to the region where the app will be hosted at and from the same cloud provider that you are using for the app.

#### Cluster Tier
Choose `M0 Sandbox`. It's price is `Free forever`.

#### Additional Settings
Backup setting is only available to paid plans. Leave this as it is.

#### Cluster Name
One time only: once your cluster is created, you won't be able to change its name.

Click `Create Cluster` and solve the image captcha.

## Access control

TODO: security levels

### Connect

Click `Connect` from the cluster dashboard.

#### Add a connection IP address

|Option|Description|
|-|-|
|Add Your Current IP Address|Atlas uses the IP address you are using now.|
|Add a Different IP Address|You can define the IP address or network|
|Allow Access from Anywhere|Allows access from any IP address. Least secure.|

Go with your Current IP Address. You can use it for development on your local device and allow your hosted app later.

#### Create a Database User

Add username and password to your User. These will be used to connect to the cluster.

#### Choose a connection method

`Connect your application`

## Create a database and a collection

1. `Collections` tab
2. `Create Database` 
3. Give Database Name & Collection Name. TODO: naming best practice?

## Test with NodeJS

1. Start a new project:
`npm init -y`

2. Install mongodb:
`npm install mongodb`

3. Create a `test.js` file. Change `USERNAME`, `PASSWORD`, `CLUSTERNAME` and `DATABASE` with your own variables. NOTE!!! Under any circumstances do not write this information to a repo!
```javascript
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://USERNAME:PASSWORD@CLUSTERNAME.trcnp.mongodb.net/DATABASE?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Use connect method to connect to the server
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.debug('Connected successfully to server')
  // perform actions on the collection object
  client.close();
});
```

4. Test the connection. In terminal:
`node test.js`

And output should be:
`Connected successfully to server`


## Mongoose & Express

1. Install Mongoose & Express
`npm install mongoose express --save`

2. Create `server.js` file:
```javascript
const express = require("express");
const app = express();
const router = express.Router();
const port = 4000;

const mongoose = require("mongoose");

const uri = "mongodb+srv://USERNAME:PASSWORD@CLUSTERNAME.trcnp.mongodb.net/DATABASE?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router);

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
```
Type `node server.js` and verify that console logs: 
```
Server is running on Port: 4000
MongoDB database connection established successfully
```
Use Ctrl + C to kill the the server.

3. Create `model.js` file:
```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cat = new Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
  },
  { collection: "cats" }
);

module.exports = mongoose.model("cats", cat);
```
4. Modify `server.js` file:
```javascript
const express = require("express");
const app = express();
const router = express.Router();
const port = 4000;

const mongoose = require("mongoose");
const cats = require("./model");

var data = [
  {
    name: "Kissu",
    age: 2,
  },
  {
    name: "Missu",
    age: 7,
  },
  {
    name: "Lissu",
    age: 3,
  }
];

const uri = "mongodb+srv://USERNAME:PASSWORD@CLUSTERNAME.trcnp.mongodb.net/DATABASE?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.use("/", router);

router.route("/insert").get(function (req, res) {
    cats.insertMany(data, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});



router.route("/find").get(function (req, res) {
    cats.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});
```

5. Start the server again and test the routes from browser.

http://localhost:4000/find should be empty.

When you go to http://localhost:4000/insert and back to "find" again you should see the inserted data fetched from the database. You can alos verify this from the MongoDB Atlas dashboard.