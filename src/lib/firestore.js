// lib/firestore.js (or utils/firestore.js)
import fs from 'fs';
import path from 'path';
import { Firestore } from '@google-cloud/firestore';

// Ensure credentials are available.
// In production, platforms like Vercel or Netlify will handle this.
// For local, ensure .env.local is set up correctly.
// Support either a file path in GOOGLE_APPLICATION_CREDENTIALS or a JSON string in GOOGLE_APPLICATION_CREDENTIALS_JSON
let firestoreConfig;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  try {
    const credsPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    const raw = fs.readFileSync(credsPath, 'utf8');
    firestoreConfig = JSON.parse(raw);
  } catch (e) {
    throw new Error(`Failed to load credentials from GOOGLE_APPLICATION_CREDENTIALS: ${e.message}`);
  }
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  try {
    firestoreConfig = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  } catch (e) {
    throw new Error(`Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON: ${e.message}`);
  }
} else {
  throw new Error('Either GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable must be set.');
}

// The ID of your named Firestore database
const databaseId = 'dt-setup'; // This is the new named database ID


// Initialize Firestore
const db = new Firestore({
  projectId: firestoreConfig.project_id, // e.g., 'divottrack-setup'
  databaseId: databaseId,
  credentials: {
    client_email: firestoreConfig.client_email,
    private_key: firestoreConfig.private_key.replace(/\\n/g, '\n'), // Replace escaped newlines
  },
});

export { db };
