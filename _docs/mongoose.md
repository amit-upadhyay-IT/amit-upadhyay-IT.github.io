---
title: Mongoose
permalink: /docs/mongoose/
---

<div class="note">
  <h5>Mongoose as ODM</h5>
</div>


People are so much into working with `RDBMS`, so we end up converting a `NoSQL` database into a `SQL` structure.

Consider an example where you want to build database for Employee,

So you will have these many tables associated with your Employees table
```
Employees
    PersonalInfo
    AcademicInfo
    PayScale
    JobDesc
    DailyProjectTask
```

So, we have these bunch of tables associated with the Employees table where everything is related with `primary key`, `foreign key` relation.

**An advice**, while working with NoSQL database is that: never create multiple collections if you want to do primary key, foreign key relationship. The performance cost is very very huge when you have a primary key, foreign key relationship in NoSQL(you may think you are normalizing your data and separate but it's no good). So don't create so many collections, rather have different documents in one collection named Employees.

**Example**:

```js
Employees = {
    PersonalInfo: {},
    AcademicInfo: {},
    PayScale: {},
    JobDesc: {},
    DailyProjectTask: {}
}
```

Mongojs is for connecting your database with your application and then extracting your data, it doesn't provide that kind of tightly coupled interface (it doesn't take the schema of an object and then passes it to your application to work with it as a schema).

> If in the application the requirement is to work with the database where we want to have some kind of check between the nodejs application and mongodb to make sure that some fields in the documents are not missing we use another library named `Mongoose`.

Mongoose is an ODM tool which takes care of managing your object modelling in nodejs for your application. Now you can use Mongoose api to work with your MongoDB.

In Mongoose one important concept is `Model`. A model is like a schema which defines how things should work.

Example:

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

var Cat = mongoose.model('Cat', { name: String });
```

`Cat` is a model here. The second argument are the properties that the model is going to have. Here we have `name` as the property which is typed as String.

```js
// creating new instance of the Cat model
var kitty = new Cat({ name: 'Zildjian' });

// saving it.
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
```

`kitty` is a new instance of the `Cat` model.

Below is example which tells about saving the data into the db using `mongoose`.

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amitupadhyay');// this is gonna connect to given instance of mongodb

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    // yay!, we are now successfully connected to mongodb, so we can do all the initialization stuffs here.

    console.log('Successfully connected to MongoDB');
});


// creating a new schema
var kittySchema = mongoose.Schema({
    name: String// in this example I had only one property in this schema but we can have more for some other examples.
});

// using the schema above we need to create the model
var Kitten = mongoose.model('Kitten', kittySchema); // the second arg is the schema name.

// now we create a new cat (a document in mongodb)
var silence = new Kitten({name: 'Silence'});

// this save method is going to save the data in the database.
silence.save(function (err) {
    if (err)
        console.log(err);
    console.log('meow');
});
```

So using 'mongoose', you can interact with MongoDB the same way how you did it with `mongojs` or the native `mongodb` driver.

Using Mongoose, you can add functions to your documents. Let's take a look at how to add "speak" functionality to our documents:

```js
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
```
Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
```js
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
```

This functionality can be used in a way that once we have the instances then we can provide method on them which can do validation checks (and things like that).
