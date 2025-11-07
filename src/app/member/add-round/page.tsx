"use client"

import { useState } from "react"

type HoleData = {
  strokes: string
  putts: string
  gir: boolean
  fairwayHit: "Yes" | "Left" | "Right" | ""
  sandStrokes: string
}

type RoundData = {
  holes: HoleData[]
}

const initialHoleData: HoleData = {
  strokes: "",
  putts: "",
  gir: false,
  fairwayHit: "",
  sandStrokes: ""
}

const initialRoundData: RoundData = {
  holes: Array(18).fill(null).map(() => ({ ...initialHoleData }))
}

export default function Page() {
  const [roundData, setRoundData] = useState<RoundData>(initialRoundData)

  const handleHoleChange = (holeIndex: number, field: keyof HoleData, value: string | boolean) => {
    setRoundData(prev => ({
      ...prev,
      holes: prev.holes.map((hole, index) => 
        index === holeIndex
          ? { ...hole, [field]: value }
          : hole
      )
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Round data:", roundData)
  }

  const renderHoleInputs = (start: number, end: number, label: string) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{label}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2">Hole</th>
              {Array.from({ length: end - start + 1 }, (_, i) => (
                <th key={i} className="border p-2 text-center">{start + i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-medium">Strokes</td>
              {Array.from({ length: end - start + 1 }, (_, i) => (
                <td key={i} className="border p-1">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={roundData.holes[start + i].strokes}
                    onChange={(e) => handleHoleChange(start + i, "strokes", e.target.value)}
                    className="w-16 p-1 border rounded text-center"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-medium">Putts</td>
              {Array.from({ length: end - start + 1 }, (_, i) => (
                <td key={i} className="border p-1">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={roundData.holes[start + i].putts}
                    onChange={(e) => handleHoleChange(start + i, "putts", e.target.value)}
                    className="w-16 p-1 border rounded text-center"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-medium">GIR</td>
              {Array.from({ length: end - start + 1 }, (_, i) => (
                <td key={i} className="border p-1 text-center">
                  <input
                    type="checkbox"
                    checked={roundData.holes[start + i].gir}
                    onChange={(e) => handleHoleChange(start + i, "gir", e.target.checked)}
                    className="w-4 h-4"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-medium">Fairway</td>
              {Array.from({ length: end - start + 1 }, (_, i) => (
                <td key={i} className="border p-1">
                  <select
                    value={roundData.holes[start + i].fairwayHit}
                    onChange={(e) => handleHoleChange(start + i, "fairwayHit", e.target.value)}
                    className="w-full p-1 border rounded text-sm"
                  >
                    <option value="">-</option>
                    <option value="Yes">Yes</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border p-2 font-medium">Sand</td>
              {Array.from({ length: end - start + 1 }, (_, i) => (
                <td key={i} className="border p-1">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={roundData.holes[start + i].sandStrokes}
                    onChange={(e) => handleHoleChange(start + i, "sandStrokes", e.target.value)}
                    className="w-16 p-1 border rounded text-center"
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add Round</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        {renderHoleInputs(0, 8, "Front Nine")}
        {renderHoleInputs(9, 17, "Back Nine")}
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Round
          </button>
        </div>
      </form>
    </div>
  )
}