import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  collection: process.env.FB_COLLECTION || '',
  collectionGroup: process.env.FB_COLLECTION_GROUPS || '',
};
