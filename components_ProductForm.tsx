'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductForm({ onSubmit, initialData = {} }) {
  const [product, setProduct] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(product)
    setProduct({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        value={product.name || ''}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <Select
        name="type"
        value={product.type || ''}
        onValueChange={(value) => setProduct(prev => ({ ...prev, type: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Hybrid">Hybrid</SelectItem>
          <SelectItem value="Sativa">Sativa</SelectItem>
          <SelectItem value="Indica">Indica</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="thc"
        value={product.thc || ''}
        onChange={handleChange}
        placeholder="THC %"
        required
      />
      <Input
        name="effects"
        value={product.effects ? product.effects.join(', ') : ''}
        onChange={(e) => setProduct(prev => ({ ...prev, effects: e.target.value.split(', ') }))}
        placeholder="Effects (comma separated)"
        required
      />
      <Textarea
        name="description"
        value={product.description || ''}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <Input
        name="image"
        value={product.image || ''}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <Input
        name="price"
        type="number"
        value={product.price || ''}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <Select
        name="category"
        value={product.category || ''}
        onValueChange={(value) => setProduct(prev => ({ ...prev, category: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Boutique">Boutique</SelectItem>
          <SelectItem value="Indoor">Indoor</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">
        {initialData.id ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  )
}

