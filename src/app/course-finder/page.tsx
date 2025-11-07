
"use client"

import { useState } from 'react'
import Link from 'next/link'

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// List of US states
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

async function getFacilitiesByState(state: string) {
  const response = await fetch(`${API_URL}/api/facilities?state=${state}`, {
    cache: 'no-store',
    method: 'GET',
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch facilities')
  }
  
  const data = await response.json()
  return data as Facility[]
}

export default function Page() {
  const [selectedState, setSelectedState] = useState<string>('')
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleStateChange = async (state: string) => {
    setSelectedState(state)
    if (!state) {
      setFacilities([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const data = await getFacilitiesByState(state)
      setFacilities(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch facilities')
      console.error("Error fetching facilities:", err)
    } finally {
      setIsLoading(false)
    }
  }
   
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Course Finder</h1>

      <div className="max-w-md mx-auto mb-8">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
          Select State
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a state...</option>
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-gray-500">Loading facilities...</div>
      ) : facilities.length === 0 ? (
        <p className="text-center text-gray-500">
          {selectedState ? 'No facilities found in this state.' : 'Select a state to see facilities.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Link
              href={`/facilities/${facility.slug}`}
              key={facility.slug}
              className="block border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:border-blue-300 group"
            >
              <h2 className="text-2xl font-semibold mb-3 text-blue-600 hover:text-blue-800">{facility.name}</h2>
              <div className="text-gray-600 space-y-1">
                <p>{facility.address}</p>
                <p>{facility.city}, {facility.state} {facility.zipCode}</p>
                {facility.phoneNumber && <p>{facility.phoneNumber}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}