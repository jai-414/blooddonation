import { Card, CardContent } from "@/components/ui/card";
import { Droplet } from "lucide-react";

interface BloodGroupCardProps {
  bloodGroup: string;
  availability: string;
}

const BloodGroupCard = ({ bloodGroup, availability }: BloodGroupCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="bg-primary/10 p-4 rounded-full">
            <Droplet className="h-8 w-8 text-primary fill-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">{bloodGroup}</h3>
        <p className="text-sm text-muted-foreground">{availability}</p>
      </CardContent>
    </Card>
  );
};

export default BloodGroupCard;
