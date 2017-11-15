---
title: MongoDB on Cloud
permalink: /docs/mongodb-on-cloud/
---


<div class="note">
  <h5>Using MongoDB services</h5>
</div>

There is a server called as `mongolab(mlab.com)`, this is database as a service (i.e. MongoDB as a service). This is a cloud based service of MongoDB and they have a free tier available.

Create a database from the console on your dashboard.
First thing you need to work with a database which you create on a cloud platform is that you need to have a user, with which you can start interacting with your application.

When you have a MongoDB running on local machine you can use a mongo shell to interact with it. What if, your MongoDB is running on the cloud? How do you interact with that?

The beauty of this service is that, they provide an address using which we can connect to our cloud db using shell.

Example:
```
mongo ds121955.mlab.com:21955/amitmongodb -u <dbuser> -p <dbpassword>
```
Using this type of link you can connect mongodb server with your remote shell.

-------------------

When you are interacting with the local instance of MongoDB, all you needed to provide is the dadabase name as your connection string, (or if it is in a remote location you can provide the entire location). But in the case where the db is hosted on cloud, the connection string is provided on the dashboard of the mlab.

Example:

```
mongodb://<dbuser>:<dbpassword>@ds121955.mlab.com:21955/amitmongodb
```

A sample program is:

```js
var mongojs = require('mongojs');
// when you are interacting with your local instance of mongodb all you needed is to provide is the database, (or entire address if it's on a remote location). You need to copy the connection string from the mlab account.
var db = mongojs('mongodb://adminamit:amit123@ds121955.mlab.com:21955/amitmongodb', ['users']);

var a = {
    username: 'amitupadhyayemail',
    email : 'amitupadhyayemail@gmail.com',
    password : 'test1'
}

var b = {
    username: 'developerupadhyay',
    email : 'developerupadhyay@gmail.com',
    password : 'test2'
}

var users = [a, b];

db.users.insert(users, function (err, docs) {
    console.log(err || docs);
});
```

There are few other such services out there.
