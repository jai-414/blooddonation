import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, MapPin, Droplet } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Donor {
  id: number;
  name: string;
  bloodGroup: string;
  location: string;
  phone: string;
  lastDonation: string;
}

const mockDonors: Donor[] = [
  { id: 1, name: "John Smith", bloodGroup: "O+", location: "New York", phone: "+1 (555) 123-4567", lastDonation: "2024-01-15" },
  { id: 2, name: "Sarah Johnson", bloodGroup: "A+", location: "New York", phone: "+1 (555) 234-5678", lastDonation: "2024-02-20" },
  { id: 3, name: "Michael Brown", bloodGroup: "B+", location: "Boston", phone: "+1 (555) 345-6789", lastDonation: "2024-01-10" },
  { id: 4, name: "Emily Davis", bloodGroup: "O-", location: "Chicago", phone: "+1 (555) 456-7890", lastDonation: "2024-03-05" },
  { id: 5, name: "David Wilson", bloodGroup: "AB+", location: "New York", phone: "+1 (555) 567-8901", lastDonation: "2024-02-15" },
  { id: 6, name: "Lisa Anderson", bloodGroup: "A-", location: "Boston", phone: "+1 (555) 678-9012", lastDonation: "2024-01-25" },
];

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>(mockDonors);

  const handleSearch = () => {
    const filtered = mockDonors.filter((donor) => {
      const matchesBloodGroup = !bloodGroup || donor.bloodGroup === bloodGroup;
      const matchesLocation = !location || donor.location.toLowerCase().includes(location.toLowerCase());
      return matchesBloodGroup && matchesLocation;
    });
    setFilteredDonors(filtered);
  };

  const handleReset = () => {
    setBloodGroup("");
    setLocation("");
    setFilteredDonors(mockDonors);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Search Blood Donors</h1>
            <p className="text-muted-foreground">
              Find available donors in your area by blood group and location
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filter Donors</CardTitle>
              <CardDescription>Search by blood group and location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={bloodGroup} onValueChange={setBloodGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Enter location (city)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <div className="flex gap-2">
                  <Button onClick={handleSearch} className="flex-1">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {filteredDonors.length} Donor{filteredDonors.length !== 1 ? "s" : ""} Found
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDonors.map((donor) => (
                <Card key={donor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{donor.name}</h3>
                        <Badge variant="secondary" className="text-sm">
                          <Droplet className="h-3 w-3 mr-1 fill-primary text-primary" />
                          {donor.bloodGroup}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{donor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{donor.phone}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Last Donation: {new Date(donor.lastDonation).toLocaleDateString()}
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      Contact Donor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchDonors;
