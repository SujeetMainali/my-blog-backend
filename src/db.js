import { MongoClient } from "mongodb";

let db;
const dbURI = 'mongodb+srv://sujeet:sujeet123@cluster0.4ehdu91.mongodb.net/Blog'

async function connectDb (cb){
    const client = new MongoClient(dbURI);
    await client.connect();

     db = client.db('Blog');
    cb();
}

export {
    db, connectDb,
};