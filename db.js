/*load official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core.*/
const mongodb = require('mongodb')

/*global Db instance To be Used In Module Functions.*/
let db


/**
 * Desc : Function That Creates a connection to a MongoDB instance and returns the reference to the database
 * 
 * @param {string} connectionString -A URI string and is supplied as a parameter to MongoDB drivers when connecting 
 * to a MongoDB deployment.assuming you have set up authentication for your MongoDB instance, to a MongoDB database.
 * @param {string} dataBaseName - The name of the DataBase You Want To Connect To.
 * @param {function} callback -callBack which is expected to be executed After Connecting To A DataBase instance.
 */

function dbConnectMyDataBase(connectionString, dataBaseName, callback) {
    /*
     *Feature Flags 
     *useNewUrlParser
     *useUnifiedTopology
     * 
     *  current URL string parser is deprecated, and will be removed in a future version.
     *  To use the new parser, pass option { useNewUrlParser: true} 
     */

    mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, }, function (err, client) {

        /*set a new DataBase Instance*/
        db = client.db(dataBaseName);

        /*Acknowledge Server */
        console.log("successfully Connected To " + dataBaseName + " DataBase");
    })

    callback();
}

/**
 * Desc : Function That Creates A new Document In MongoDb
 * 
 * @param {string} collectionName- The Name Of Collection You Want To Create Your Document in.
 * @param {object} Document - The new data Record (BSON documents).
 */

function dbCreateDocument(collectionName, Document) {
    /**
      *db.collection(collectionName).insertOne(Document, options) 
      *
      * 1-Document :A document to insert into the collection..
      * 2-options:callbackFunction
      * 
      * note :If the collection does not exist, then the insertOne() method creates the collection.
      * 
     */
    db.collection(collectionName).insertOne(Document, function () {

        /*Acknowledge Server */
        console.log("successfully added Document To DataBase")
    })
}

/**
 *
 * DESC : Update A  Document In Specific DataBase Collection 
 *  
 * @param {string} collectionName - The Name Of Collection You Want To Update Your Document in.
 * @param {object} documentID - The _id field is primary key for Your Document 
 * @param {object} newDocument - he new data Record (BSON document).
 * 
 */

function dbUpdateDocument(collectionName, documentID, newDocument) {
    /**
     * db.collection(collectionName).findOneAndUpdate(filter,update,options)
     * 1-filter :The selection criteria for the update.(_id ,....)
     * 2-update :the document must contain only update operator expressions.
     * 3-options:callbackFunction
     * 
    */
    db.collection(collectionName).findOneAndUpdate({ _id: new mongodb.ObjectId(documentID) }, { $set: newDocument }, function () {

        /*Acknowledge Server */
        console.log("successfully Updated Document To DataBase");
    })
}

/**
 * DESC: Read All Documents In the same Collection
 * 
 * @param {string} collectionName -The Name Of Collection You Want To Read All Documents Form.
 * @param {function} callback - callbackFunction.
 * 
 */

function dbReadDocuments(collectionName, callback) {
    /**
     *  db.collection(collectionName).find()
     *  To return all documents in a collection, omit this parameter or pass an empty document ({}).
     * 
    */
    db.collection(collectionName).find().toArray(function (err, items) {

        /*Acknowledge Server */
        console.log("successfully Read Documents From DataBase");

        /*Excute CallBack Function With Array OF Objects */
        callback(items);
    });
}

/**
 * DESC : Function Selects documents in a collection .
 * 
 * @param {string} collectionName - The Name Of Collection You Want To Read Documents Form..
 * @param {string} searchDocument - Specifies selection filter using query operators.
 * @param {function} callback - callbackFunction.
 * 
 */

function dbFindDocumentSMatchedThisProperties(collectionName, searchDocument, callback) {
    /**  
     *  db.collection(collectionName).find(query,projection)
     * 
     * 1-query document  :Specifies selection filter using query operators.
     * 2- projection document  :Specifies the fields to return in the documents that match the query filter.
     *                         To return all fields in the matching documents, omit this parameter.
     ** Returns : A cursor to the documents that match the query criteria.
     */
    db.collection(collectionName).find(searchDocument).toArray(function (err, items) {

        /*Acknowledge Server */
        console.log("successfully Read Documents From DataBase");

        /*Excute CallBack Function With Array OF Objects */
        callback(items);
    });
}

/**
 *
 * DESC : Delete A  Document In Specific DataBase Collection 
 *  
 * @param {string} collectionName - The Name Of Collection You Want To Delte Your Document in.
 * @param {object} documentID - The _id field is primary key for Your Document 
 * 
 */

function dbDeleteDocument(collectionName, documentID) {
    /**
     *  db.collection(collectionName).deleteOne(filter)
     * filter document :Specifies deletion criteria using query operators.
     */

    db.collection(collectionName).deleteOne({ _id: new mongodb.ObjectId(documentID) }, function () {

        /*Acknowledge Server */
        console.log("successfully Deleted Document From DataBase");
    })
}


module.exports = {
    dbConnectMyDataBase,
    dbCreateDocument,
    dbUpdateDocument,
    dbReadDocuments,
    dbFindDocumentSMatchedThisProperties,
    dbDeleteDocument,
};
