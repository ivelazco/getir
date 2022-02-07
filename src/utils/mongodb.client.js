import { MongoClient } from 'mongodb';
const { MONGODB_URI, MONGODB_DATABASE } = process.env;

// Connection URL
const client = new MongoClient(MONGODB_URI);

// Return the db connection, would be nice regarding the requests,
// make this a middleware so the connection will be always open.
// Again, evaluating the request that could have.
async function getMongoDBDatabase() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(MONGODB_DATABASE);

    return db;
}

export default getMongoDBDatabase;
