"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

const productsData = [
  {
    id: "1",
    name: "Tennis Racket Pro",
    category: "Equipment",
    sold: 89,
    revenue: 12450,
    trend: 12.5,
    stock: 45,
  },
  {
    id: "2",
    name: "Sports Water Bottle",
    category: "Accessories",
    sold: 234,
    revenue: 4680,
    trend: 8.3,
    stock: 120,
  },
  {
    id: "3",
    name: "Badminton Shuttlecock Set",
    category: "Equipment",
    sold: 156,
    revenue: 3120,
    trend: -3.2,
    stock: 78,
  },
  {
    id: "4",
    name: "Grip Tape",
    category: "Accessories",
    sold: 312,
    revenue: 2496,
    trend: 15.7,
    stock: 200,
  },
  {
    id: "5",
    name: "Basketball",
    category: "Equipment",
    sold: 67,
    revenue: 2010,
    trend: 5.4,
    stock: 34,
  },
]

export function TopProductsTable() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Products</CardTitle>
        <CardDescription className="text-muted-foreground">Best selling products and inventory status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Product</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground text-right">Units Sold</TableHead>
              <TableHead className="text-muted-foreground text-right">Revenue</TableHead>
              <TableHead className="text-muted-foreground text-right">Trend</TableHead>
              <TableHead className="text-muted-foreground text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((product) => (
              <TableRow key={product.id} className="border-border hover:bg-muted/50">
                <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-border text-foreground">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-foreground">{product.sold}</TableCell>
                <TableCell className="text-right text-foreground">${product.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {product.trend > 0 ? (
                      <TrendingUpIcon className="h-4 w-4 text-chart-3" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${product.trend > 0 ? "text-chart-3" : "text-destructive"}`}>
                      {Math.abs(product.trend)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="secondary"
                    className={`${
                      product.stock < 50 ? "bg-destructive/20 text-destructive" : "bg-chart-3/20 text-chart-3"
                    } border-0`}
                  >
                    {product.stock}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}