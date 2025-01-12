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

4) To Set the database that you want to interact with :
```
use <db_name> :
```

5) It will insert one document in the given Collection Name . Note that it will create the collection if there is no collection with name collection_name :
```
db.<collection_name>.insertOne(<a Json Object>) :
```

6) If you pass no argument in there it will return the cursor to all the data inside it:
```
db.<collection_name>.find()
```

7) It will print the output in a clear format nothing fancy. This works **only if the returned object is a cursor**. When Using findOne(filter) , it will not work as findOne() doesn't return a cursor but the exact object, according to filter condition :
```
db.<collection_name>.find().pretty()
```

8) To insert more than One document in a mongodb database :
```
db.<collection_name>.insertMany([<JSONs>])
```

9) To update the **first matching document** with the filter criteria in a mongo db database :

```
db.<collection_name>.updateOne(filter,{$set:{field1,field2,...}})
```
*Note* : When you are using update Then if **you dont add** $set , it will replace first matching document the whole document That you will pass. If you want to have this behaviour ( i.e replacing the whole document ) its always better to use repaceOne().

10) To delete the **first matching document** with the filter criteria in a mongo db database :
```
db.<collection_name>.deleteOne(filter)
```

11) To delete all the documents of a collection in mongoDb :

```
db.<collection_name>.deleteMany({})
```
12) To exhaust the cursor of .find() , you can use toArray() :
```
db.<collection>.find().toArray() //will return an array of objects 
```

13) You can simply use a js map loop to iterate over the cursor returned by find to perform an operation and return an array :
```
db.products.find().map( function(p) { return p.name; } ) ;// Returns array of name of all the products.
db.passengers.find().map(p=>{return {"name":p.name,"age":p.age}}); // returns name and age . Note shortcut functions use mat karna pura likhne par hi sahi chal raha hai.
```

14) The same thing done above by map can be done via projection :

```
db.passengers.find({},{name:1,age:1}).limit(5);// Here limit will limit the data to max(len,first5);
```

Here : 1 means selected , 0 means not selected , by default _id is 1 and rest is zero. 

**Note** :  if you pass {} ( empty object) in the projection field it will return all the fields.



