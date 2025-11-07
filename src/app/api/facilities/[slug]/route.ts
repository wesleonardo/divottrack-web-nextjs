import { NextResponse, NextRequest } from 'next/server'
import { db } from '@/lib/firestore'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  try {
    const facilityDoc = await db.collection('facilities').doc(slug).get()
    
    if (!facilityDoc.exists) {
      return NextResponse.json(
        { error: 'Facility not found' },
        { status: 404 }
      )
    }

    const data = facilityDoc.data()
    return NextResponse.json({
      id: facilityDoc.id, // This will be the slug
      slug: facilityDoc.id,
      ...data,
      createdAt: data?.createdAt.toDate().toISOString()
    })
  } catch (error) {
    console.error('Error fetching facility:', error)
    return NextResponse.json(
      { error: 'Failed to fetch facility' },
      { status: 500 }
    )
  }
}