'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from './ProductForm'
import Image from 'next/image'

export function ProductList({ products, onUpdate, onDelete }) {
  const [editingProduct, setEditingProduct] = useState(null)

  return (
    <div className="space-y-4">
      {products.map(product => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {editingProduct === product.id ? (
              <ProductForm
                initialData={product}
                onSubmit={(updatedProduct) => {
                  onUpdate(updatedProduct)
                  setEditingProduct(null)
                }}
              />
            ) : (
              <div className="flex space-x-4">
                <div className="w-1/4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="w-3/4 space-y-2">
                  <p><strong>Type:</strong> {product.type}</p>
                  <p><strong>THC:</strong> {product.thc}</p>
                  <p><strong>Effects:</strong> {product.effects.join(', ')}</p>
                  <p><strong>Description:</strong> {product.description}</p>
                  <p><strong>Price:</strong> R{product.price}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={() => setEditingProduct(product.id)}>Edit</Button>
                    <Button variant="destructive" onClick={() => onDelete(product.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

