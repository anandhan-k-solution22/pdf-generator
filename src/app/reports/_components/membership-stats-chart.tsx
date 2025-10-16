"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jul", active: 234, expired: 12, cancelled: 5 },
  { month: "Aug", active: 256, expired: 15, cancelled: 8 },
  { month: "Sep", active: 289, expired: 18, cancelled: 6 },
  { month: "Oct", active: 312, expired: 14, cancelled: 7 },
  { month: "Nov", active: 334, expired: 16, cancelled: 9 },
  { month: "Dec", active: 342, expired: 19, cancelled: 11 },
]

export function MembershipStatsChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Membership Statistics</CardTitle>
        <CardDescription className="text-muted-foreground">Active, expired, and cancelled memberships</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-1))" }}
            />
            <Line
              type="monotone"
              dataKey="expired"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-4))" }}
            />
            <Line
              type="monotone"
              dataKey="cancelled"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
