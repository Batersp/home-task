import {SETTINGS} from "../core/settings/settings";
import mongoose from 'mongoose';

export async function runDB(): Promise<void> {
    const url = SETTINGS.MONGO_URL
    if(!url) {
        throw new Error("MongoDB URL is required");
    }
    try {
        await mongoose.connect(SETTINGS.MONGO_URL! + '/' + SETTINGS.DB_NAME);
        console.log('✅ Connected to the database');
    } catch (e) {
        console.error('❌ Database not connected:', e);
        throw new Error(`❌ Database not connected: ${e}`);
    }
}
