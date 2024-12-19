import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'None'

interface LoyaltyProgramProps {
  onComplete: (phoneNumber: string, totalGrams: number, loyaltyTier: LoyaltyTier) => void;
  onSkip: () => void;
}

export function LoyaltyProgram({ onComplete, onSkip }: LoyaltyProgramProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    // Simulate fetching loyalty data from a backend
    const totalGrams = Math.floor(Math.random() * 150) // Random number between 0 and 149
    const loyaltyTier = getLoyaltyTier(totalGrams)

    onComplete(phoneNumber, totalGrams, loyaltyTier)
  }

  const getLoyaltyTier = (totalGrams: number): LoyaltyTier => {
    if (totalGrams >= 100) return 'Platinum'
    if (totalGrams >= 50) return 'Gold'
    if (totalGrams >= 20) return 'Silver'
    if (totalGrams >= 10) return 'Bronze'
    return 'None'
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Dank Connection Loyalty Program</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full">Check Loyalty Status</Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={onSkip}>
            Skip Loyalty Program
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

