var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
	
		findDocuments(db,function(){
				   db.close();
					
  });
});
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('books');
  // Insert some documents
 
    
  collection.insert([
    {title : "alice"}, {title : "george"}, {title : "egoitz"}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 document into the document collection");
    callback(result);
  });
}
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.update({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}
var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('books');
  // Insert some documents
  collection.remove({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('books');
  // Insert some documents
  //db.things.find( { 1: { $exists : true } } );

    collection.find({title:"egoitz"}).toArray(function(err, docs) {
    assert.equal(err, null);
    //assert.equal(8, docs.length);
    console.log("Found the following records");
    console.dir(docs)
    //callback(docs);
  });      
}