[Back to Index](../README.md)

# MongoDB and Mongoose Cheatsheet

Beautifully-designed print-ready [PDF](https://node.university/p/library)

[![](mongodb-mongoose-cover1.png)](https://node.university/p/library)

## MongoDB

- `$ mongod`: start MongoDB server (localhost:27017)
- `$ mongo`: open MongoDB console (connect to local server by default)

## MongoDB Console

- `> show dbs`: show databases on the server
- `> use DB_NAME`: select database `DB_NAME`
- `> show collections`: show collections in the selected database
- `> db.COLLECTION_NAME.find()`: perform the find query on collection with the COLLECTION_NAME name to find any items
- `> db.COLLECTION_NAME.find({"_id": ObjectId("549d9a3081d0f07866fdaac6")})`: perform the find query on collection with the COLLECTION_NAME name to find item with ID 549d9a3081d0f07866fdaac6
- `> db.COLLECTION_NAME.find({"email": /gmail/})`: perform the find query on collection with the COLLECTION_NAME name to find items with email property matching `/gmail`
- `> db.COLLECTION_NAME.update(QUERY_OBJECT, SET_OBJECT)`: perform the update query on collection with the COLLECTION_NAME name to update items that match QUERY_OBJECT with SET_OBJECT
- `> db.COLLECTION_NAME.remove(QUERY_OBJECT)`: perform remove query for items matching QUERY_OBJECT criteria on the COLLECTION_NAME collection
- `> db.COLLECTION_NAME.insert(OBJECT)`: add OBJECT to the collection with the COLLECTION_NAME name
