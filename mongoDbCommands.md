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

- Example config file :

```
storage:
  dbPath: "/your/path/to/the/db/folder"
systemLog:
  destination:  file
  path: "/your/path/to/the/logs.log"
```

24) To import a json file :

```
mongoimport <name of file you wanna import> -d <database you wanna impor this file to> -c <collection jisme import karna hai> --jsonArrray --drop

--jsonArray : signifies the imported data is an array of json
--drop : it will drop the movies collection if it exits , if you do not specify this . The data will be appended to the movies collection if it exists ( may be the behaviour you want )
```


## Query Operators Commands in MongoDb:

Here is the official documentation - https://www.mongodb.com/docs/manual/reference/operator/query-comparison/

Let's quickly discuss one query operator here 

25) $gt operator :
```
db.<collection_name>.find({ field: { $gt: value } })
```
26) To query an nested / embedded document :

```
db.<collection_name>.find({"field.nestedField":<value>})

/*
For example : 
For this document in the inventory - 
*/
{
  item: 'journal',
  qty: 25,
  size: { h: 14, w: 21, uom: 'cm' },
  status: 'A'
}

// We have This command

db.inventory.find({
  "size.uom": 'in'
})

```
27) When using the query for an array inside a collection , it checks for inclusivity not equality .

```
//If you do this

db.movies.find({"genres":"Drama"})

// For Collection :
[
  {
    "name:"Shutter Island",
    "genres":["Thriller","Drama"]
  }
]
// It will still select the movie shutter island as Drama is present in this erray 
```
- **For exact equality , use this instead** :

```
db.movies.find({"genres":["Drama"]})
```


### Logical Operators :

28) $or and $nor : $or gives final result by doing Union ( taking or ) , $nor is  just !$or which means Set - Union.


Syntax :

```
db.<collection>.find({$or:[<array of normal filter>]});
```

Example query :

```
db.movies
.find({
  $or: [{ "rating.average": { $gt: 9.3 } }, { "rating.average": { $lt: 5 } }],
})
.count();
```

29) The $and operator : 
Returns the intersection of set

Example Query :

```
db.movies
  .find({ $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }] })
  .count();
```
There is a short of doing this :

```
db.movies.find({
   "rating.average":{$gt:9},
   genres:"Drama"
}).count()
```

General syntax :

db.<collection_name>.find({key1,key2,key3}); These keys will be treated as and

So why do we need an $and operator through ?

Suppose in document we have :
```
{
  "genres":["drama","horror"] // Just for example to show the schema there may be other docs say having "genres":["horror" , "thriller"]
}
```

Now we want to query the genres having both drama and horror 

So wen cant do like thus
```
db.movies.find({ genres: "Horror", genres: "Drama" }).count();
```

As the keys are the same and the later wali ki key value will be used so it is equivalent to :
```
db.movies.find({genres: "Drama" }).count();
```

30) You can use multiple operators for a field , for example You wanna check the documents where the age field exists and is greater than 30 ( although this is a bad example to show case but just see the syntax and be aware that this is something that we also can do ):

```
db.users.find({age:{$exists:true,$gt:30}});
```
A better example for this will be to get all the documents where there exists an age field but the value is not equal to null.


```
[
  {
    name:"Divyanshu",
    age:20
  },
  {
    name:"Gaurav"
  },
  {
    name:"Harjas",
    age:null// so Technically the field exists but the corresponding value is not present
  }
]
```

The corresponding query will be :

```
db.users.find({age:{$exists:true,$ne:null}});
```
31) $type operator : Example is to find all the documents having type of phone number as number.

Query :
```
db.users.find({ phone: { $type: "number" } });
```

**You can also pass more than 1 type as an array.**

32) $expr operator : Suppose in this document - 
```
sales = [
  { volume: 100, target: 120 },
  { volume: 89, target: 80 },
  { volume: 200, target: 177 },
];

```
You want to find all the documents where value of volume > target .

```
db.sales.find({$expr:{$gt:["$volume","$target"]}})
```

Check out This for more - https://www.mongodb.com/docs/manual/reference/operator/query/expr/

## Quering Arrays :

32) Suppose in The below document You want to find all the documents having title as sports in hobbies.

```
users = [
  {
    _id: ObjectId("678cd9cef83964fd26a69f7a"),
    name: "Max",
    hobbies: [
      {
        title: "sports",
        frequency: 3,
      },
      {
        title: "cooking",
        frequency: 6,
      },
    ],
    phone: 1234,
  },
  {
    _id: ObjectId("678cd9cef83964fd26a69f7b"),
    name: "Manual",
    hobbies: [
      {
        title: "cooking",
        frequency: 5,
      },
      {
        title: "cars",
        frequency: 2,
      },
    ],
    phone: "1234566",
    age: 30,
  },
];
```
Then You can use the same syntax as embedded document and mongo is smart enough to look through all the document present in that array.

Here  is the associated Query :

```
db.users.find({"hobbies.title":"cooking"}).pretty()
```

33) $size operator : suppose in the previous document You want to find all the documents where the user have 3 hobbies , then the query will be like this .
```
db.users.find({hobbies:{$size:3}}) ;// Note we can only find exact size as of yet
```

34) $all operator : suppose you want to find all movies where the generes are exactly ["action","thriller"] but do not care about the order i.e it can be ["thriller","action"] then you can't use the normal find :

```
db.movies.find({"genres":["action","thriller"]});// This won't work as this will look for exact match
```

To solve this problem
- one way is to write all the combination as $or which is too costly
- other way is to use $all with $size.

$all - will check all the documents which includes the fields that you pass as an array

The query with $all and $size will look like this :
```
db.movies.find({ genre: { $all: ["action", "thriller"], $size: 2 } });

// First we got all the documents that has the fields including action and thriller and then $size : 2 will return only those which has size two i.e return only which has ["action','thriller'] , the order doesn't matter. 
```

35) In the user collection we want to find all the documents in which hobbies have title as "Cooking" and frequency as 3.

Now if you run a normal add query since it is an array it will traverse through the objects and return the document in which either one of the title or frequency is matched , but we want the exact nested document to match i.e we want hobbies : [{title:"Cooking",frequency:3}] , not hobbies : [{title:"Cooking",frequency:2},{"title":"Sports",frequency:3}].<--- normal query will return this document as well . 

In this case we will use the $elemMatch operator.The query will look like this :

```
db.users.find({hobbies:{$elemMatch:{title:"sports",frequency:3}}}).pretty()
```

## Cursors in MongoDb 

36) Better to learn directly from the docs : https://www.mongodb.com/docs/manual/reference/method/js-cursor/ 
However we will see some queries.

37) Sorting Cursor result :

```
db.<collection_name>.find().sort({"field on which the sorting will be based":<value>})
```
value - 1 : Means ascending , -1 : means descending

38) Skip and Limit : skip and limit are similar both takes a number as an argument . Skip skips the n number of documents where n is the parameter passed .

Limit on the other hand limit the data on the cursor

## Using projections to shape our results :

We have already discussed it before  , so we will discuss miscellaneous cases here .

39) Using projection with arrays :

Suppose You want to filter all the arrays having genre including drama but for some strange reason wants the output to only have Horror genre . You can do this by this :
```
db.movies.find({"genres":"Drama"},{"genres":{$elemMatch:{$eq:"Horror"}}});
```

40) $slice operator : Just like the normal slice gives the subarray of a field.

Syntax :
```
db.<collection_name>.find({},{fieldName:{$slice:[startingIndex,numberOfItems]}});
```

Example query :
```
db.movie.find({},{name:1,genres:{$slice:[0,1]}});
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

