import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, LogIn, Droplet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HospitalDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const bloodStock = [
    { type: "A+", units: 25, status: "good" },
    { type: "A-", units: 8, status: "low" },
    { type: "B+", units: 18, status: "good" },
    { type: "B-", units: 5, status: "critical" },
    { type: "O+", units: 30, status: "good" },
    { type: "O-", units: 3, status: "critical" },
    { type: "AB+", units: 12, status: "medium" },
    { type: "AB-", units: 6, status: "low" },
  ];

  const requests = [
    { id: 1, patient: "John Doe", bloodGroup: "O-", units: 2, urgency: "critical" },
    { id: 2, patient: "Jane Smith", bloodGroup: "B+", units: 1, urgency: "high" },
    { id: 3, patient: "Mike Johnson", bloodGroup: "A+", units: 3, urgency: "medium" },
  ];

  const getStockBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-500">Good Stock</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-orange-500">Low Stock</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return null;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      default:
        return <Badge>Low</Badge>;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl">Hospital Login</CardTitle>
              <CardDescription>
                Access your hospital dashboard to manage blood inventory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hospital ID</label>
                <Input placeholder="Enter hospital ID" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter password" />
              </div>
              <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Hospital Dashboard</h1>
              <p className="text-muted-foreground">City General Hospital</p>
            </div>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>

          {/* Blood Stock Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Blood Stock</CardTitle>
              <CardDescription>Real-time inventory of blood units</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bloodStock.map((item) => (
                  <Card key={item.type}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Droplet className="h-5 w-5 text-primary fill-primary" />
                          <span className="text-xl font-bold">{item.type}</span>
                        </div>
                      </div>
                      <p className="text-2xl font-semibold mb-2">{item.units} units</p>
                      {getStockBadge(item.status)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Incoming Requests Section */}
          <Card>
            <CardHeader>
              <CardTitle>Incoming Blood Requests</CardTitle>
              <CardDescription>Recent requests from patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1 mb-3 md:mb-0">
                      <h3 className="font-semibold">{request.patient}</h3>
                      <div className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Droplet className="h-4 w-4 text-primary fill-primary" />
                        <span>{request.bloodGroup}</span>
                        <span>•</span>
                        <span>{request.units} unit{request.units > 1 ? "s" : ""}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {getUrgencyBadge(request.urgency)}
                      <Button size="sm">Review Request</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HospitalDashboard;
