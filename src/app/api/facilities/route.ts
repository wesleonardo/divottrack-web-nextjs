import { NextResponse } from 'next/server'
import { db } from '@/lib/firestore'

// Firestore document data type
interface FirestoreFacility {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber?: string
  createdAt: FirebaseFirestore.Timestamp
  slug?: string // Optional because it's derived from the document ID
}

// API response type
interface Facility extends Omit<FirestoreFacility, 'createdAt'> {
  id: string
  createdAt: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const state = searchParams.get('state')
    
    const facilitiesRef = db.collection('facilities')
    
    // Create query based on state filter
    const query = state 
      ? facilitiesRef.where('state', '==', state)
      : facilitiesRef
    
    const response = await query.get()
    const items: Facility[] = []
    
    response.forEach(doc => {
      const data = doc.data() as FirestoreFacility
      items.push({
        id: doc.id,
        slug: doc.id, // Add slug to match the interface
        ...data,
        createdAt: data.createdAt.toDate().toISOString()
      })
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error in API route handler:', error)
    return NextResponse.json(
      { error: 'Failed to fetch facilities' },
      { status: 500 }
    )
  }
}

function createSlug(name: string, state: string): string {
  // Convert to lowercase and remove special characters
  const normalized = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Remove consecutive hyphens
    .trim()                       // Remove leading/trailing spaces
  
  return `${normalized}-${state.toLowerCase()}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, address, city, state, zipCode, phoneNumber } = body as Omit<FirestoreFacility, 'createdAt'>

    // Validate required fields
    if (!name || !address || !city || !state || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const slug = createSlug(name, state)

    // Add document to Firestore using the slug as the ID
    const facilitiesRef = db.collection('facilities')
    
    // Check if slug already exists
    const existingDoc = await facilitiesRef.doc(slug).get()
    if (existingDoc.exists) {
      return NextResponse.json(
        { error: 'A facility with this name and state already exists' },
        { status: 409 }
      )
    }

    const newFacility: FirestoreFacility = {
      name,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      createdAt: new Date() as unknown as FirebaseFirestore.Timestamp
    }
    
    await facilitiesRef.doc(slug).set(newFacility)

    return NextResponse.json({ id: slug }, { status: 201 })
  } catch (error) {
    console.error('Error adding facility:', error)
    return NextResponse.json(
      { error: 'Failed to add facility' },
      { status: 500 }
    )
  }
}