"use client"

import { useState } from "react";

type FormState = {
  username: string
  password: string
  confirmPassword: string
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  terms: boolean
}

export default function Page(){
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    terms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const name = target.name as keyof FormState
  const { value, checked } = target

    if (name === "terms") {
      setForm(prev => ({ ...prev, terms: checked }))
      return
    }

    // other fields are strings
    setForm(prev => ({ ...prev, [name]: value } as unknown as FormState))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormState, string>> = {}
    // required fields
    const requiredFields: (keyof FormState)[] = ["username", "email", "password", "confirmPassword","firstName", "lastName", "city", "state"]
    requiredFields.forEach(field => {
      const value = form[field]
      if (!value || value.toString().trim() === "") {
        newErrors[field] = "This field is required"
      }
    })

    // password match
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.password = "Passwords do not match"
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // placeholder - integrate with your API
    console.log("submit", form)
  }

  const isValidEmail = (value: string) => {
    // simple email regex — fine for client-side validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const validateField = (name: keyof FormState, value: string) => {
    const required: (keyof FormState)[] = ["username", "email", "firstName", "lastName", "city", "state", "password", "confirmPassword"]
    if (required.includes(name) && !value.trim()) {
      return "This field is required"
    }

    if (name === "email" && value && !isValidEmail(value)) {
      return "Enter a valid email address"
    }

    if (name === "confirmPassword" && value) {
      if (value !== form.password) return "Passwords do not match"
    }

    return ""
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

  <form onSubmit={handleSubmit} className="bg-gray-100 border border-gray-200 shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">Username <span className="text-red-600">*</span></label>
            <input id="username" name="username" value={form.username} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, username: validateField('username', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, email: validateField('email', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="firstName">First name <span className="text-red-600">*</span></label>
            <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, firstName: validateField('firstName', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last name <span className="text-red-600">*</span></label>
            <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, lastName: validateField('lastName', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, password: validateField('password', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm password <span className="text-red-600">*</span></label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, confirmPassword: validateField('confirmPassword', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
            <input id="address" name="address" value={form.address} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">City <span className="text-red-600">*</span></label>
            <input id="city" name="city" value={form.city} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, city: validateField('city', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="state">State <span className="text-red-600">*</span></label>
            <input id="state" name="state" value={form.state} onChange={handleChange} onBlur={(e)=> setErrors(prev => ({...prev, state: validateField('state', e.target.value)}))} className={`w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`} />
            {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="zip">ZIP</label>
            <input id="zip" name="zip" value={form.zip} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mt-4 flex items-start">
          <input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={handleChange} className="mt-1 mr-2" />
          <label htmlFor="terms" className="text-sm">I agree to the <a href="#" className="text-blue-600 underline">terms and conditions</a>.</label>
        </div>

        <div className="mt-6">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Create account</button>
        </div>
      </form>
    </div>
  )
}
