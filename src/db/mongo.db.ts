import { Collection, Db, MongoClient } from 'mongodb';
import {Blog} from "../blogs/types/blog";
import {Post} from "../posts/types/post";
import {SETTINGS} from "../core/settings/settings";
import {User} from "../users/types/user";
import {Comment} from "../сomments/types/comment";
import {Security} from "../security/types/security";
import {RateLimit} from "../core/types/rateLimitCollection";

const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';
const COMMENTS_COLLECTION_NAME = 'comments';
const USERS_COLLECTION_NAME = 'users';
const SECURITY_COLLECTION_NAME = 'sessions';
const RATE_LIMIT_COLLECTION_NAME = 'rate_limit';

export let client: MongoClient;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;
export let commentCollection: Collection<Comment>;
export let userCollection: Collection<User>;
export let securityCollection: Collection<Security>;
export let rateLimitCollection: Collection<RateLimit>;

export async function runDB(): Promise<void> {
    const url = SETTINGS.MONGO_URL
    if(!url) {
        throw new Error("MongoDB URL is required");
    }
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);
    commentCollection = db.collection<Comment>(COMMENTS_COLLECTION_NAME);
    userCollection = db.collection<User>(USERS_COLLECTION_NAME);
    securityCollection = db.collection<Security>(SECURITY_COLLECTION_NAME);
    rateLimitCollection = db.collection<RateLimit>(RATE_LIMIT_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ ping: 1 });
        console.log('✅ Connected to the database');
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}
