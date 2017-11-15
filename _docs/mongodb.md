---
title: MongoDB
permalink: /docs/mongodb/
---


<div class="note">
  <h5>MongoDB in brief</h5>
</div>

Here I am not going to write about deep concepts of MongoDB, rather I would just write thing which are enough to work with MongoDB inside our node application.

MongoDB runs as a `service` on your machine. The way you start this service is by running `mongod` command after you install MongoDB. The easiest way to work with MongoDB is using `Mongo Shell`, to open mongo shell you can write command `mongo`. When you enter this command you get into REPL of MongoDB.

Simple commands:
```sh
$ show databases
```
Shows you the databases.
```sh
$ use db_name;
```
Goes into the db_name database.
```sh
$ show collection
```
Shows a list of collection present in that particular database.
```sh
$ db.collection_name.find();
```
If I call `find()` method without any argument it returns all the objects in the collection.
It's a simple query to find all things inside your collection. You can pass in a query parameter as a `key-value` pair, like:

```sh
db.collection_name.find({name:"Amit"})
```

```sh
$ db.collection_name.insert({name:"Amit Upadhyay"});
```
To save an object into the database.
```sh
$ db.createCollection('CollectionName');
```
Create a collection with name `CollectionName`.
```sh
$ db.collection_name.remove({name:'Amit Upadhyay'});
```
Removed all those records which have name as Amit Upadhyay from the mongodb collection. So to delete everything from the database, you just need to pass empty object as argument to `remove()` function 

eg:

```sh
$ db.collection_name.remove({})
```

------------------------------

**NoSQL  SQL**

<div class="mobile-side-scroller">
<table>
  <thead>
    <tr>
      <th>NoSQL</th>
      <th>SQL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p>Collection</p></td>
      <td><p>
Table

      </p></td>
    </tr>

    <tr>
      <td><p>Document</p></td>
      <td><p>
Record

      </p></td>
    </tr>
    
  </tbody>
</table>
</div>


Every document is identified by a unique `id` provided by MongoDB.

**NOTE**: The data which it takes to save a record and the data which it prints out is all in `JSON` format.

------------------

The first thing which you can do is, create a project where you can talk to MongoDB from within your local application (i.e. using a programming language and interacting with MongoDB).

When we are working with a third party software peace, we need some kind of a `driver`, or some kind of a interface that talk from our application to the other application and vice-versa.

For working with node.js mongodb has a native mongodb client.

#### Example:

```js
var mongojs = require('mongojs');
var db = mongojs('amitupadhyay', ['col1']);// analogous to ('database name', ['collection1', 'collection2'...]);

var user = {
    username : 'amitupadhyay',
    email : 'amitupadhyayemail@gmail.com',
    password : 'testpassword'
};

db.col1.save(user, function (err, data) {
    if (err)
        throw err;
    else
        console.log('Save successfully', data);
});
```
The way we provide the mongodb connection string is `mongodb://localhost:27017/db_name`

If you are using mongojs, you can directly use the 'db_name' instead of writing 'mongodb://localhost:27017/db_name'. Suppose that the mongodb is hosted on `192.168.0.1` and it is not running on the same port on that particular pc, then we can use this connection string,

`
mongodb://192.168.0.1:27018/db_name
`
So we can say that if our mongodb is running on localhost:27017, we need not provide the long connection string, we can directly write the db_name.

### Example: removing everything before inserting

```js
var mongojs = require('mongojs');
var db = mongojs('amitupadhyay', ['col1']);// analogous to ('database name', ['collection1', 'collection2'...]);

var user = {
    username : 'amitupadhyay',
    email : 'amitupadhyayemail@gmail.com',
    password : 'testpassword'
};

function handleRemove(err, response)
{
    if (err)
        throw err;
    console.log(response);

    db.col1.save(user, handleSave);
}

function handleSave(err, u)
{
    if (err)
        throw err;
    console.log('Saved successfully', u);
}


db.col1.remove({}, handleRemove);// empty object means I want to remove all the documents in the collection

/*
 * A more cleaner code not involving callback hell
 * */

```

### removing, inserting and the querying

```js

var mongojs = require('mongojs');
var db = mongojs('amitupadhyay', ['col1']);// analogous to ('database name', ['collection1', 'collection2'...]);

var user = [
    {
        username : 'amitupadhyay',
        email : 'amitupadhyayemail@gmail.com',
        password : 'testpassword'
    },
    {
        username: 'developerupadhyay',
        email : 'developerupadhyay@gmail.com',
        password : 'anotherpassword'
    }
];


db.col1.remove({}, function (err, response) { // empty object means I want to remove all the documents in the collection

    if (err)
        throw err;
    console.log(response);

    db.col1.save(user, function (err, u) {
        if (err)
            throw err;

        // once the user is saved I want to query that particular user;

        db.col1.find({}, function (err, users) {//I am gonna find everything so I pass an empty object
            if (err)
                throw err;
            console.log(users);
        });
    });
});

/*
 * The difference which you can see in index.js and this file is that, this time the data which you received is an array.
 * */
```

### removing, inserting, querying and updating

```js

var mongojs = require('mongojs');
var db = mongojs('amitupadhyay', ['col1']); // analogous to ('database name', ['collection1', 'collection2', ...])

var users = [
    {
        username : 'amitupadhyay',
        email : 'amitupadhyayemail@gmail.com',
        password : 'testpassword'
    },
    {
        username : 'developerupadhyay',
        email : 'developerupadhyay@gmail.com',
        password : 'devPassword'
    }
];

db.col1.remove({}, function (err, data) {
    if (err)
        throw err;
    console.log('Removed\n', data);
    console.log('----------------------');

    db.col1.save(users, function (err, data) {
        if (err)
            throw err;
        console.log('Inserted\n', data);
        console.log('----------------------');

        // if we use just find() function, then the data in the callback is always an array of matched documents in the collection and it doesn't matter on the number of matches.
        // if we use findOne(), the data (2nd argument) in the callback is not an array but just one JSON object.
        db.col1.findOne({username: 'amitupadhyay'}, function (err, userOne) {
            if (err)
                throw err;
            console.log('find query');
            console.log(userOne);
            console.log('----------------------');

            db.col1.update(
                {
                    username : 'amitupadhyay'
                },
                {
                    password : 'changedPassword1'// here note that the whole document with name:amitupadhyay is going to be replaced with password:changedPassword, because here I haven't used upsert (i.e. update and insert)
                }, function (err, respon) {
                    if (err)
                        throw err;
                    console.log('Update status\n', respon);
                    console.log('----------------------------');
                });
        });
    });
});

```
