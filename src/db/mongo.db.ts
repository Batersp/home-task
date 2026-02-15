import { Collection, Db, MongoClient } from 'mongodb';
import {Blog} from "../blogs/types/blog";
import {Post} from "../posts/types/post";
import {SETTINGS} from "../core/settings/settings";

const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

export async function runDB(): Promise<void> {
    const url = SETTINGS.MONGO_URL
    if(!url) {
        throw new Error("MongoDB URL is required");
    }
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}
