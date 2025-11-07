// lib/firestore.js (or utils/firestore.js)
import { Firestore } from '@google-cloud/firestore';

// Ensure the environment variable is available.
// In production, platforms like Vercel or Netlify will handle this.
// For local, ensure .env.local is set up correctly.
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set.');
}

const firestoreConfig = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

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
