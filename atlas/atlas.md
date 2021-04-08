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

Settings can be changed later so .

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

`npm install mongodb`

https://www.npmjs.com/package/mongodb

`node test.js`

`Connected successfully to server`