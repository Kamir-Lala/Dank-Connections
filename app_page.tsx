'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoyaltyProgram } from '@/components/LoyaltyProgram'

type Product = {
  id: string
  name: string
  type: string
  thc: string
  effects: string[]
  description: string
  image: string
  price: number
  category: 'Boutique' | 'Indoor'
  quantity: number
}

type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wedding Cake',
    type: 'Hybrid',
    thc: '25%',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    description: 'A potent hybrid strain with sweet vanilla and earthy pepper notes.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-G0IwwgZpLrcsUKg3Y5BDVDn2NSUUHA.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 0
  },
  {
    id: '2',
    name: 'Blue Dream',
    type: 'Hybrid',
    thc: '18%',
    effects: ['Creative', 'Focused', 'Calm'],
    description: 'A balanced hybrid offering full-body relaxation with gentle cerebral invigoration.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2)-12FhdoYBp3X5ogi8cFxQ2b9nkmXAw9.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 0
  },
  {
    id: '3',
    name: 'Purple Punch',
    type: 'Indica',
    thc: '20%',
    effects: ['Sleepy', 'Relaxed', 'Happy'],
    description: 'A sweet and sedating indica hybrid perfect for a nightcap.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(5)-ZX8lQR0Ltgg7Lft4uK9C2CbK0VGf6g.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 0
  },
  {
    id: '4',
    name: 'Green Crack',
    type: 'Sativa',
    thc: '22%',
    effects: ['Energetic', 'Focused', 'Creative'],
    description: 'A sharp and energetic sativa perfect for daytime use.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(6)-GlAJj8PopJwWOCUKyWHcLm4gKoCDsd.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 0
  },
  {
    id: '5',
    name: 'Gelato',
    type: 'Hybrid',
    thc: '23%',
    effects: ['Relaxed', 'Happy', 'Creative'],
    description: 'A sweet and creamy hybrid with powerful euphoric effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(4)-zrjrtTPvEQiHitJHDredkHep6vyUiM.jpeg',
    price: 180,
    category: 'Boutique',
    quantity: 0
  },
  {
    id: '6',
    name: 'Northern Lights',
    type: 'Indica',
    thc: '18%',
    effects: ['Relaxed', 'Sleepy', 'Happy'],
    description: 'A classic indica known for its resinous buds and relaxing effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(3)-nK8HeuawL7iBtnkO68YJ3efGMKeq8k.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 0
  },
  {
    id: '7',
    name: 'Sour Diesel',
    type: 'Sativa',
    thc: '20%',
    effects: ['Energetic', 'Happy', 'Uplifted'],
    description: 'A fast-acting strain delivering energizing, dreamy cerebral effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-FvIGdJHY3JMyhmZdrOjeR5AGrOrmdY.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 0
  },
  {
    id: '8',
    name: 'OG Kush',
    type: 'Hybrid',
    thc: '23%',
    effects: ['Relaxed', 'Happy', 'Euphoric'],
    description: 'A legendary strain with a unique terpene profile and balanced effects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-G0IwwgZpLrcsUKg3Y5BDVDn2NSUUHA.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 0
  },
  {
    id: '9',
    name: 'White Widow',
    type: 'Hybrid',
    thc: '19%',
    effects: ['Relaxed', 'Happy', 'Uplifted'],
    description: 'A balanced hybrid known for its white trichome-covered buds.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2)-12FhdoYBp3X5ogi8cFxQ2b9nkmXAw9.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 0
  },
  {
    id: '10',
    name: 'AK-47',
    type: 'Hybrid',
    thc: '20%',
    effects: ['Relaxed', 'Happy', 'Uplifted'],
    description: 'A long-lasting, complex blend of various landrace strains.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(5)-ZX8lQR0Ltgg7Lft4uK9C2CbK0VGf6g.jpeg',
    price: 140,
    category: 'Indoor',
    quantity: 0
  }
]

async function fetchLoyaltyData(phoneNumber: string) {
  try {
    const response = await fetch(`/api/loyalty/${phoneNumber}`);
    if (!response.ok) {
      throw new Error('Failed to fetch loyalty data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching loyalty data:', error);
    return null;
  }
}

export default function KioskInterface() {
  const [step, setStep] = useState<'welcome' | 'loyalty' | 'products' | 'review' | 'confirm'>('welcome')
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [referenceNumber, setReferenceNumber] = useState<string>('')
  const [confirmationType, setConfirmationType] = useState<'print' | 'email' | 'sms' | null>(null)
  const [loyaltyInfo, setLoyaltyInfo] = useState<{ phoneNumber: string, totalGrams: number, tier: LoyaltyTier } | null>(null)

  const handleSkipLoyalty = () => {
    setLoyaltyInfo(null);
    setStep('products');
  };

  const handleQuantityChange = (id: string, change: number) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, quantity: Math.max(0, product.quantity + change) }
        : product
    ))
  }

  const handleConfirmOrder = () => {
    setReferenceNumber(Math.random().toString(36).substring(2, 9).toUpperCase())
    setStep('confirm')
  }

  const selectedProducts = useMemo(() => products.filter(p => p.quantity > 0), [products])

  const boutiqueQuantity = useMemo(() => 
    selectedProducts.filter(p => p.category === 'Boutique').reduce((sum, p) => sum + p.quantity, 0),
    [selectedProducts]
  )

  const indoorQuantity = useMemo(() => 
    selectedProducts.filter(p => p.category === 'Indoor').reduce((sum, p) => sum + p.quantity, 0),
    [selectedProducts]
  )

  const boutiqueDiscountApplied = boutiqueQuantity >= 5
  const indoorDiscountApplied = indoorQuantity >= 5

  const loyaltyDiscount = useMemo(() => {
    if (!loyaltyInfo) return 0
    switch (loyaltyInfo.tier) {
      case 'Platinum': return 0.15
      case 'Gold': return 0.10
      case 'Silver': return 0.05
      default: return 0
    }
  }, [loyaltyInfo])

  const total = useMemo(() => {
    const subtotal = selectedProducts.reduce((sum, p) => {
      if (p.category === 'Boutique') {
        return sum + (boutiqueDiscountApplied ? 140 : 180) * p.quantity
      } else {
        return sum + (indoorDiscountApplied ? 120 : 140) * p.quantity
      }
    }, 0)
    return subtotal * (1 - loyaltyDiscount)
  }, [selectedProducts, boutiqueDiscountApplied, indoorDiscountApplied, loyaltyDiscount])

  const handleLoyaltyComplete = async (phoneNumber: string) => {
    const loyaltyData = await fetchLoyaltyData(phoneNumber);
    if (loyaltyData) {
      setLoyaltyInfo({
        phoneNumber: loyaltyData.phoneNumber,
        totalGrams: loyaltyData.totalGrams,
        tier: loyaltyData.loyaltyTier
      });
      setStep('products');
    } else {
      // Handle error (e.g., show an error message to the user)
    }
  }

  if (step === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white">
        <div className="text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2024-05-10.jpg-GvKEjJL947Bb8Z2eKPytldP9fN38Ua.jpeg"
            alt="Dank Connection Logo"
            width={500}
            height={500}
            className="mx-auto mb-12"
            priority
          />
          <Button 
            size="lg" 
            className="text-3xl px-12 py-8 bg-green-600 hover:bg-green-700"
            onClick={() => setStep('loyalty')}
          >
            Start Shopping
          </Button>
        </div>
      </div>
    )
  }

  if (step === 'loyalty') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
        <LoyaltyProgram onComplete={handleLoyaltyComplete} onSkip={handleSkipLoyalty} />
      </div>
    )
  }

  if (step === 'products') {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-7xl mx-auto pb-24">
          <div className="flex justify-between items-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2024-05-10.jpg-GvKEjJL947Bb8Z2eKPytldP9fN38Ua.jpeg"
              alt="Dank Connection Logo"
              width={200}
              height={200}
              className="mb-4"
              priority
            />
            {loyaltyInfo && (
              <div className="text-right">
                <p className="font-bold">Loyalty Tier: {loyaltyInfo.tier}</p>
                <p>Points: {loyaltyInfo.totalGrams}</p>
                <p>Discount: {(loyaltyDiscount * 100).toFixed(0)}%</p>
              </div>
            )}
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Boutique Strains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.category === 'Boutique').map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuantityChange={handleQuantityChange}
                  discountApplied={boutiqueDiscountApplied}
                  discountedPrice={140}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Indoor Strains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.category === 'Indoor').map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuantityChange={handleQuantityChange}
                  discountApplied={indoorDiscountApplied}
                  discountedPrice={120}
                />
              ))}
            </div>
          </div>
          {(boutiqueQuantity > 0 || indoorQuantity > 0) && (
            <div className="fixed bottom-8 right-8 left-8 z-10 bg-gray-100 bg-opacity-90 p-4 rounded-t-lg">
              <Button 
                size="lg"
                className="w-full text-3xl px-12 py-8 bg-green-600 hover:bg-green-700"
                onClick={() => setStep('review')}
              >
                Review Order (Boutique: {boutiqueQuantity}g, Indoor: {indoorQuantity}g)
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (step === 'review') {
    return (
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2024-05-10.jpg-GvKEjJL947Bb8Z2eKPytldP9fN38Ua.jpeg"
            alt="Dank Connection Logo"
            width={200}
            height={200}
            className="mx-auto mb-8"
            priority
          />
          <Card className="p-6">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center py-4 border-b">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-gray-600">
                      R{product.category === 'Boutique' 
                          ? (boutiqueDiscountApplied ? 140 : 180) 
                          : (indoorDiscountApplied ? 120 : 140)} × {product.quantity}g
                    </p>
                    <Badge>{product.category}</Badge>
                  </div>
                </div>
                <span className="text-xl font-bold">
                  R{(product.category === 'Boutique' 
                      ? (boutiqueDiscountApplied ? 140 : 180) 
                      : (indoorDiscountApplied ? 120 : 140)) * product.quantity}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-6">
              <span className="text-2xl font-bold">Subtotal</span>
              <span className="text-2xl font-bold">R{total / (1 - loyaltyDiscount)}</span>
            </div>
            {loyaltyInfo && loyaltyDiscount > 0 && (
              <div className="flex justify-between items-center pt-2 text-green-600">
                <span className="text-xl">Loyalty Discount ({loyaltyInfo.tier})</span>
                <span className="text-xl">-R{(total / (1 - loyaltyDiscount) * loyaltyDiscount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 text-2xl font-bold">
              <span>Total</span>
              <span>R{total.toFixed(2)}</span>
            </div>
            {boutiqueDiscountApplied && (
              <p className="text-green-600 mt-2 text-lg">Boutique bulk discount applied: R140/g (5g or more)</p>
            )}
            {indoorDiscountApplied && (
              <p className="text-green-600 mt-2 text-lg">Indoor bulk discount applied: R120/g (5g or more)</p>
            )}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                size="lg"
                variant="outline"
                className="text-xl py-6"
                onClick={() => setStep('products')}
              >
                Back to Products
              </Button>
              <Button
                size="lg"
                className="text-xl py-6 bg-green-600 hover:bg-green-700"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <Card className="max-w-2xl w-full p-8 text-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2024-05-10.jpg-GvKEjJL947Bb8Z2eKPytldP9fN38Ua.jpeg"
          alt="Dank Connection Logo"
          width={200}
          height={200}
          className="mx-auto mb-8"
          priority
        />
        <h2 className="text-4xl font-bold mb-8">Order Confirmed!</h2>
        <p className="text-2xl mb-4">Your reference number is:</p>
        <p className="text-5xl font-mono font-bold mb-8">{referenceNumber}</p>
        <div className="grid gap-4">
          <Button
            size="lg"
            className="text-xl py-6"
            onClick={() => setConfirmationType('print')}
          >
            Print Confirmation
          </Button>
          <Button
            size="lg"
            className="text-xl py-6"
            onClick={() => setConfirmationType('email')}
          >
            Email Confirmation
          </Button>
          <Button
            size="lg"
            className="text-xl py-6"
            onClick={() => setConfirmationType('sms')}
          >
            SMS Confirmation
          </Button>
        </div>
        {confirmationType && (
          <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-lg">
            Confirmation sent via {confirmationType}!
          </div>
        )}
      </Card>
    </div>
  )
}

function ProductCard({ product, onQuantityChange, discountApplied, discountedPrice }: {
  product: Product
  onQuantityChange: (id: string, change: number) => void
  discountApplied: boolean
  discountedPrice: number
}) {
  return (
    <Card className="p-4">
      <div className="relative h-64 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
      <div className="flex gap-2 mb-2">
        <Badge>{product.type}</Badge>
        <Badge variant="outline">THC: {product.thc}</Badge>
      </div>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex gap-2 mb-4">
        {product.effects.map(effect => (
          <Badge key={effect} variant="secondary">{effect}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">
          R{discountApplied ? discountedPrice : product.price}/g
          {discountApplied && (
            <span className="text-sm text-green-600 ml-2">Bulk Discount Applied</span>
          )}
        </span>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => onQuantityChange(product.id, -1)}
            disabled={product.quantity === 0}
            className="text-xl h-12 w-12"
          >
            -
          </Button>
          <span className="text-2xl w-12 text-center">{product.quantity}</span>
          <Button
            variant="outline"
            onClick={() => onQuantityChange(product.id, 1)}
            className="text-xl h-12 w-12"
          >
            +
          </Button>
        </div>
      </div>
    </Card>
  )
}

