'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function SalesReport({ products }) {
  const [timeFrame, setTimeFrame] = useState('weekly')

  // This is still mock data for the chart. In a real application, you'd fetch this from your backend
  const salesData = [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 2000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 1890 },
    { name: "Sat", sales: 2390 },
    { name: "Sun", sales: 3490 },
  ]

  const totalSales = useMemo(() => {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0)
  }, [products])

  const topProduct = useMemo(() => {
    return products.reduce((top, product) => 
      (product.quantity > (top?.quantity || 0)) ? product : top
    , null)
  }, [products])

  const totalQuantity = useMemo(() => {
    return products.reduce((sum, product) => sum + product.quantity, 0)
  }, [products])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Report</CardTitle>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger>
            <SelectValue placeholder="Select time frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>Total Sales:</strong> R{totalSales.toFixed(2)}</p>
          <p><strong>Total Quantity Sold:</strong> {totalQuantity} units</p>
          {topProduct && (
            <p><strong>Top Selling Product:</strong> {topProduct.name} ({topProduct.quantity} units)</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

