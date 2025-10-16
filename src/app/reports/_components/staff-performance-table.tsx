"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const staffData = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Manager",
    bookings: 234,
    revenue: 45600,
    rating: 4.8,
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Receptionist",
    bookings: 189,
    revenue: 38900,
    rating: 4.6,
    status: "active",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Coach",
    bookings: 156,
    revenue: 34200,
    rating: 4.9,
    status: "active",
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Receptionist",
    bookings: 145,
    revenue: 29800,
    rating: 4.5,
    status: "active",
  },
]

export function StaffPerformanceTable() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Staff Performance</CardTitle>
        <CardDescription className="text-muted-foreground">
          Top performing staff members by bookings and revenue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Staff Member</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground text-right">Bookings</TableHead>
              <TableHead className="text-muted-foreground text-right">Revenue</TableHead>
              <TableHead className="text-muted-foreground text-right">Rating</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff.id} className="border-border hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{staff.role}</TableCell>
                <TableCell className="text-right text-foreground">{staff.bookings}</TableCell>
                <TableCell className="text-right text-foreground">${staff.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span className="text-chart-3 font-medium">{staff.rating}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-chart-3/20 text-chart-3 border-0">
                    {staff.status}
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
