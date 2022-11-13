import { MongoClient, Db } from 'mongodb';

export let db: Db;

export const connectToDBServer = async (connectionURI: string) => {
    const client = new MongoClient(connectionURI);
    await client.connect();

    // This way a unique instance is created so we can use it everywhere.
    db = client.db();
}