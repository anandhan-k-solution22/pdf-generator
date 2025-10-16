"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface EventReportProps {
  eventData: {
    title: string
    date: string
    city: string
    country: string
    venue: string
    state: string
    category: string
  }
  financialData: {
    allocatedBudget: number
    balance: number
    paid: number
    due: number
    totalSpent: number
    budgetUtilized: number
  }
  services: Array<{
    name: string
    percentage: number
    color: string
    items: Array<{
      sno: number
      item: string
      quantity: number
      estimation: number
      actualCost: number
      difference: number
      paid: number
      due: number
      profit: number
    }>
  }>
}

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6']

export function EventReport({ eventData, financialData, services }: EventReportProps) {
  // Prepare data for pie chart
  const pieData = [
    { name: 'Remaining Budget', value: 100 - financialData.budgetUtilized, color: '#10B981' },
    { name: 'Service 1', value: services[0]?.percentage || 0, color: '#EF4444' },
    { name: 'Service 2', value: services[1]?.percentage || 0, color: '#F59E0B' },
    { name: 'Service 3', value: services[2]?.percentage || 0, color: '#3B82F6' }
  ]

  return (
    <div className="bg-white">
      {/* Header with blue bar */}
      <div className="bg-blue-600 h-2 w-full"></div>
      
      <div className="p-6">
        {/* Logo and branding */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">budgeting</span>
        </div>

        {/* Event Details */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{eventData.title}</h1>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Date</div>
                <div className="font-semibold text-gray-900">{eventData.date}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">City</div>
                <div className="font-semibold text-gray-900">{eventData.city}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Country</div>
                <div className="font-semibold text-gray-900">{eventData.country}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Venue</div>
                <div className="font-semibold text-gray-900">{eventData.venue}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">State</div>
                <div className="font-semibold text-gray-900">{eventData.state}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Event Category</div>
                <div className="font-semibold text-gray-900">{eventData.category}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Summary</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Allocated Budget</div>
                <div className="text-2xl font-bold text-gray-900">${financialData.allocatedBudget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Balance</div>
                <div className="text-xl font-semibold text-green-600">${financialData.balance.toLocaleString()}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Paid</div>
                <div className="text-2xl font-bold text-gray-900">${financialData.paid.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Due</div>
                <div className="text-xl font-semibold text-gray-900">${financialData.due.toLocaleString()}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Spent</div>
                <div className="text-2xl font-bold text-gray-900">${financialData.totalSpent.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Budget Utilized</div>
                <div className="text-xl font-semibold text-gray-900">{financialData.budgetUtilized.toFixed(2)}%</div>
              </div>
            </div>
          </div>
          
          {/* Pie Chart */}
          <div className="mt-8 flex justify-center">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Service Details */}
        {services.map((service, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: service.color }}
              />
              <h3 className="text-lg font-semibold text-gray-900">{service.name} - {service.percentage.toFixed(2)}%</h3>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">S.No</TableHead>
                    <TableHead className="font-semibold text-gray-700">Items</TableHead>
                    <TableHead className="font-semibold text-gray-700">Quantity</TableHead>
                    <TableHead className="font-semibold text-gray-700">Estimation</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actual Cost</TableHead>
                    <TableHead className="font-semibold text-gray-700">Difference</TableHead>
                    <TableHead className="font-semibold text-gray-700">Paid</TableHead>
                    <TableHead className="font-semibold text-gray-700">Due</TableHead>
                    <TableHead className="font-semibold text-gray-700">Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.items.map((item, itemIndex) => (
                    <TableRow key={itemIndex} className="border-b border-gray-200">
                      <TableCell className="py-3">{item.sno}</TableCell>
                      <TableCell className="py-3 font-medium">{item.item}</TableCell>
                      <TableCell className="py-3">{item.quantity}</TableCell>
                      <TableCell className="py-3">${item.estimation.toLocaleString()}</TableCell>
                      <TableCell className="py-3">${item.actualCost.toLocaleString()}</TableCell>
                      <TableCell className={`py-3 font-medium ${item.difference >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${item.difference.toLocaleString()}
                      </TableCell>
                      <TableCell className="py-3">${item.paid.toLocaleString()}</TableCell>
                      <TableCell className="py-3">${item.due.toLocaleString()}</TableCell>
                      <TableCell className={`py-3 font-medium ${item.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${item.profit.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Total Row */}
                  <TableRow className="font-semibold bg-gray-100">
                    <TableCell className="py-3">Total</TableCell>
                    <TableCell className="py-3"></TableCell>
                    <TableCell className="py-3">{service.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                    <TableCell className="py-3">${service.items.reduce((sum, item) => sum + item.estimation, 0).toLocaleString()}</TableCell>
                    <TableCell className="py-3">${service.items.reduce((sum, item) => sum + item.actualCost, 0).toLocaleString()}</TableCell>
                    <TableCell className={`py-3 ${service.items.reduce((sum, item) => sum + item.difference, 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${service.items.reduce((sum, item) => sum + item.difference, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-3">${service.items.reduce((sum, item) => sum + item.paid, 0).toLocaleString()}</TableCell>
                    <TableCell className="py-3">${service.items.reduce((sum, item) => sum + item.due, 0).toLocaleString()}</TableCell>
                    <TableCell className={`py-3 ${service.items.reduce((sum, item) => sum + item.profit, 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${service.items.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
