import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Hospital, Activity } from "lucide-react";
import BloodGroupCard from "@/components/BloodGroupCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const Home = () => {
  const [pingResult, setPingResult] = useState<string | null>(null);
  const bloodGroups = [
    { type: "A+", availability: "Available" },
    { type: "B+", availability: "Available" },
    { type: "O+", availability: "High Demand" },
    { type: "AB+", availability: "Available" },
    { type: "A-", availability: "Low Stock" },
    { type: "B-", availability: "Available" },
    { type: "O-", availability: "Critical Need" },
    { type: "AB-", availability: "Available" },
  ];

  const stats = [
    { icon: Heart, label: "Lives Saved", value: "10,000+" },
    { icon: Users, label: "Active Donors", value: "5,000+" },
    { icon: Hospital, label: "Partner Hospitals", value: "150+" },
    { icon: Activity, label: "Blood Units", value: "25,000+" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Backend ping test */}
        <div className="flex justify-center my-4">
          <Button
            onClick={async () => {
              try {
                const res = await fetch("http://localhost:5000/api/ping");
                const data = await res.json();
                setPingResult(data.message);
              } catch (e) {
                setPingResult("Failed to connect");
              }
            }}
            variant="outline"
          >
            Test Backend Connection
          </Button>
          {pingResult && (
            <div className="ml-4 text-lg font-semibold">
              Backend says: <span className="text-primary">{pingResult}</span>
            </div>
          )}
        </div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Donate Blood, Save Lives
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Join our mission to connect blood donors with those in need. 
              Every donation can save up to three lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/register">Register as Donor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/request">Request Blood</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blood Groups Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Blood Group Availability
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check the current availability status of different blood groups in our network
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {bloodGroups.map((group) => (
                <BloodGroupCard
                  key={group.type}
                  bloodGroup={group.type}
                  availability={group.availability}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Your blood donation can be the difference between life and death. 
              Register today and become a lifesaver.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/register">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
