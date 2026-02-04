'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setMessage('If that email exists you will receive a reset link.')
      else setMessage('Failed to request reset. Please try again.')
    } catch {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Reset your password</h1>
  <p className="text-sm text-gray-600 mb-6">Enter your email and we&apos;ll send a password reset link.</p>

        {message && <div className="mb-4 text-sm text-green-700">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">Remembered? <Link href="/signin" className="text-green-600">Sign in</Link></p>
      </div>
    </main>
  )
}
