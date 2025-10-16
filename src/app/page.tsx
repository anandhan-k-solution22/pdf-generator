import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileChartPie, CalendarIcon, UsersIcon, DollarSignIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sports Facility Management</h1>
          <p className="text-xl text-muted-foreground">Comprehensive analytics and reporting dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileChartPie className="h-5 w-5 text-primary" />
                Reports & Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive insights into your sports facility performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/reports">
                <Button className="w-full">
                  View Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Bookings
              </CardTitle>
              <CardDescription>
                Manage and track facility bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-primary" />
                Members
              </CardTitle>
              <CardDescription>
                Customer and membership management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileChartPie className="h-5 w-5 text-primary" />
                Event Reports
              </CardTitle>
              <CardDescription>
                Detailed event budgeting and financial reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/event-report">
                <Button className="w-full">
                  View Event Report
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <DollarSignIcon className="h-5 w-5 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">$124,567</div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">1,234</div>
                  <div className="text-sm text-muted-foreground">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">567</div>
                  <div className="text-sm text-muted-foreground">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">890</div>
                  <div className="text-sm text-muted-foreground">Products Sold</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
