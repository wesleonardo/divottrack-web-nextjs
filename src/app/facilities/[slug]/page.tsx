interface Facility {
  id: string // This will be the slug
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber?: string
  createdAt: string
  slug: string
}

async function getFacility(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  const response = await fetch(`${API_URL}/api/facilities/${slug}`, {
    cache: 'no-store',
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch facility')
  }

  return response.json()
}

export default async function FacilityPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  let facility: Facility | null = null
  let error: string | null = null
  const { slug } = await params

  try {
    facility = await getFacility(slug)
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred'
    console.error("Error fetching facility:", error)
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded">
          {error}
        </div>
      </div>
    )
  }

  if (!facility) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          Facility not found
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {facility.name}
            </h1>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Location Information</h2>
              <div className="space-y-2 text-gray-600">
                <p>{facility.address}</p>
                <p>{facility.city}, {facility.state} {facility.zipCode}</p>
                {facility.phoneNumber && (
                  <p>
                    <span className="font-medium">Phone: </span>
                    {facility.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            
            {/* Add more sections here for course details, amenities, etc. */}
          </div>
        </div>
      </div>
    </div>
  )
}
