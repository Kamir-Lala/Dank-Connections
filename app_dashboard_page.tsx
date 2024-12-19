'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from '@/components/ProductForm'
import { ProductList } from '@/components/ProductList'
import { SalesReport } from '@/components/SalesReport'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'sales'>('products')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    setProducts(data)
  }

  const handleProductCreate = async (product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (response.ok) {
      fetchProducts()
    }
  }

  const handleProductUpdate = async (product) => {
    const response = await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (response.ok) {
      fetchProducts()
    }
  }

  const handleProductDelete = async (id) => {
    const response = await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (response.ok) {
      fetchProducts()
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Dashboard</CardTitle>
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab('products')}
              variant={activeTab === 'products' ? 'default' : 'outline'}
            >
              Product Management
            </Button>
            <Button
              onClick={() => setActiveTab('sales')}
              variant={activeTab === 'sales' ? 'default' : 'outline'}
            >
              Sales Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'products' && (
            <div className="space-y-8">
              <ProductForm onSubmit={handleProductCreate} />
              <ProductList
                products={products}
                onUpdate={handleProductUpdate}
                onDelete={handleProductDelete}
              />
            </div>
          )}
          {activeTab === 'sales' && <SalesReport products={products} />}
        </CardContent>
      </Card>
    </div>
  )
}

