# Important MongoDb Commands :

1) To starts up the mongod server which interacts with the db using the WIRED tiger search engine by default. It starts at port 27017: 

```
mongod(this is for local )
``` 
2) To specify on which port you wanna run your mongod server. Note that now you will have to use mongosh --port <port> to connect to this port from shell :

```
mongod --port <port>
```

3) Show all the databases in the running mongo instance/ cluster:
```
show dbs
```
4) Show all the collections in the current data base. 
```
show collections
```

5) To Set the database that you want to interact with :
```
use <db_name> :
```

6) It will insert one document in the given Collection Name . Note that it will create the collection if there is no collection with name collection_name :
```
db.<collection_name>.insertOne(<a Json Object>) :
```

7) If you pass no argument in there it will return the cursor to all the data inside it:
```
db.<collection_name>.find()
```

8) It will print the output in a clear format nothing fancy. This works **only if the returned object is a cursor**. When Using findOne(filter) , it will not work as findOne() doesn't return a cursor but the exact object, according to filter condition :
```
db.<collection_name>.find().pretty()
```

9) To insert more than One document in a mongodb database :
```
db.<collection_name>.insertMany([<JSONs>])
```

10) To update the **first matching document** with the filter criteria in a mongo db database :

```
db.<collection_name>.updateOne(filter,{$set:{field1,field2,...}})
```
*Note* : When you are using update Then if **you dont add** $set , it will replace first matching document the whole document That you will pass. If you want to have this behaviour ( i.e replacing the whole document ) its always better to use repaceOne().

11) To delete the **first matching document** with the filter criteria in a mongo db database :
```
db.<collection_name>.deleteOne(filter)
```

12) To delete all the documents of a collection in mongoDb :

```
db.<collection_name>.deleteMany({})
```
13) To exhaust the cursor of .find() , you can use toArray() :
```
db.<collection>.find().toArray() //will return an array of objects 
```

14) You can simply use a js map loop to iterate over the cursor returned by find to perform an operation and return an array :
```
db.products.find().map( function(p) { return p.name; } ) ;// Returns array of name of all the products.
db.passengers.find().map(p=>{return {"name":p.name,"age":p.age}}); // returns name and age . Note shortcut functions use mat karna pura likhne par hi sahi chal raha hai.
```

15) The same thing done above by map can be done via projection :

```
db.passengers.find({},{name:1,age:1}).limit(5);// Here limit will limit the data to max(len,first5);
```

Here : 1 means selected , 0 means not selected , by default _id is 1 and rest is zero. 

**Note** :  if you pass {} ( empty object) in the projection field it will return all the fields.

16) To drop all the documents ( or to say a collection as if there are no documents the collection will be dropped automatically ):

```
db.<collection_name>.drop()
```

17) To drop a data base refer to this - https://www.mongodb.com/docs/manual/reference/command/dropDatabase/

18) Lookup command in mongodb reference relation - when you have a referenced collection it will expand those referenced field while getting . Its syntax is like this -
```
db.<collection_name>.aggregate([{$lookup:{from:"the Referenced collection jiski reference id dali hui hai idhar",localfield:"what is the field name in the collection_name",foreignField:"to which the local field is linked",as:"The alias You want to give"}}]);

// we are passing an array to the aggregate function as aggregation can be done for multiple condition we will learn it later.
```

19) nested LookUps : https://stackoverflow.com/questions/36019713/mongodb-nested-lookup-with-3-levels

2nd method : https://www.mongodb.com/community/forums/t/nested-lookup-aggregation/224456


Implementing 1st  :
```
db.users.aggregate([{$lookup:{from:"posts",localField:"posts",foreignField:"_id",as:"posts"}},{$unwind: {
    path: "$posts",
    preserveNullAndEmptyArrays: true
}},{$lookup:{from:"users",localField:"posts.comments.author",foreignField:"_id",as:"commentedBy"}}]);

// Notice we have to give the whole posts.comments.author ( pura path wrt the <collection_name> use karna padega)
```

20) List down all the available configuration :
```
mongod --help 
``` 

21) It  will set the mongodb file storage path to <path> :
```
mongod --dbpath <path> :
```

22) It will set the logpath to the given path Important thing to note here is that the file extension should be .log.
```
mongod --logPath <something/logs.log> :
```

23) define a config file and then use it to start your mongod server with the command:
```
mongod -f <path to your config file> 
```

- Examp;e confog file :

```
storage:
  dbPath: "/your/path/to/the/db/folder"
systemLog:
  destination:  file
  path: "/your/path/to/the/logs.log"
```
## Data Type limits in MongoDb

MongoDB has a couple of hard limits - most importantly, a single document in a collection (including all embedded documents it might have) must be <=16mb. Additionally, you may only have 100 levels of embedded documents.

You can find all limits (in great detail)here:https://docs.mongodb.com/manual/reference/limits/

For the data types, MongoDBsupports, you find a detailed overview on this page:https://docs.mongodb.com/manual/reference/bson-types/

Important data type limits are:

Normal integers (int32) can hold a maximum value of +-2,147,483,647

Long integers (int64) can hold a maximum value of +-9,223,372,036,854,775,807

Text can be as long as you want - the limit is the 16mb restriction for the overall document

It's also important to understand the difference between int32 (NumberInt), int64 (NumberLong) and a normal number as you can enter it in the shell. The same goes for a normal double and NumberDecimal.

NumberInt creates a int32 value =>NumberInt(55)

NumberLong creates a int64 value =>NumberLong(7489729384792)

If you just use a number (e.g. insertOne({a:1}), this will get added as a normal double into the database. The reason for this is that the shell is based on JSwhich only knows float/double values and doesn't differ between integers and floats.

NumberDecimal creates a high-precision double value =>NumberDecimal("12.99") =>This can be helpful for cases where you need (many) exact decimal places for calculations.

When not working with the shell but a MongoDBdriver for your app programming language (e.g. PHP, .NET, Node.js, ...), you can use the driver to create these specific numbers.

Example for Node.js:http://mongodb.github.io/node-mongodb-native/3.1/api/Long.html

This will allow you to build a NumberLong value like this:

```
const Long = require('mongodb').Long;

db.collection('wealth').insert( {
    value: Long.fromString("121949898291")
});
```
By browsing the APIdocs for the driver you're using, you'll be able to identify the methods for building int32s, int64s etc.

