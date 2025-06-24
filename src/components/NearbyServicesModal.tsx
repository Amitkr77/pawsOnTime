
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Clock, Phone, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface NearbyServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NearbyServicesModal = ({ open, onOpenChange }: NearbyServicesModalProps) => {
  const { toast } = useToast();

  const petShops = [
    { id: "1", name: "Happy Paws Pet Store", rating: 4.8, distance: "0.3 miles", address: "123 Main St", phone: "(555) 123-4567", hours: "9AM - 8PM", type: "Pet Store" },
    { id: "2", name: "Pet Paradise", rating: 4.6, distance: "0.7 miles", address: "456 Oak Ave", phone: "(555) 234-5678", hours: "8AM - 9PM", type: "Pet Store" },
    { id: "3", name: "Furry Friends Supply", rating: 4.9, distance: "1.1 miles", address: "789 Pine Rd", phone: "(555) 345-6789", hours: "10AM - 7PM", type: "Pet Store" },
  ];

  const vetClinics = [
    { id: "1", name: "City Veterinary Clinic", rating: 4.9, distance: "0.5 miles", address: "321 Elm St", phone: "(555) 987-6543", hours: "24/7 Emergency", type: "Vet Clinic" },
    { id: "2", name: "Healthy Pets Animal Hospital", rating: 4.7, distance: "0.8 miles", address: "654 Maple Dr", phone: "(555) 876-5432", hours: "7AM - 10PM", type: "Vet Clinic" },
    { id: "3", name: "Pet Care Center", rating: 4.8, distance: "1.2 miles", address: "987 Cedar Ln", phone: "(555) 765-4321", hours: "8AM - 6PM", type: "Vet Clinic" },
  ];

  const groomingServices = [
    { id: "1", name: "Pampered Paws Grooming", rating: 4.8, distance: "0.4 miles", address: "159 Rose St", phone: "(555) 654-3210", hours: "9AM - 5PM", type: "Grooming" },
    { id: "2", name: "Spa for Pets", rating: 4.9, distance: "0.9 miles", address: "753 Violet Ave", phone: "(555) 543-2109", hours: "8AM - 6PM", type: "Grooming" },
  ];

  const handleCall = (phone: string, name: string) => {
    toast({
      title: "Calling...",
      description: `Calling ${name} at ${phone}`
    });
  };

  const handleDirections = (address: string, name: string) => {
    toast({
      title: "Opening Directions",
      description: `Getting directions to ${name} at ${address}`
    });
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{service.name}</h3>
        <Badge variant="outline">{service.type}</Badge>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{service.rating}</span>
          <span>•</span>
          <MapPin className="w-4 h-4" />
          <span>{service.distance}</span>
        </div>
        <p>{service.address}</p>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{service.hours}</span>
        </div>
      </div>
      <div className="flex space-x-2 mt-3">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleCall(service.phone, service.name)}
        >
          <Phone className="w-4 h-4 mr-1" />
          Call
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => handleDirections(service.address, service.name)}
        >
          <Navigation className="w-4 h-4 mr-1" />
          Directions
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span>Nearby Pet Services</span>
          </DialogTitle>
          <DialogDescription>
            Find pet shops, veterinary clinics, and grooming services near you
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Search by location or service..." />
            <Button variant="outline">
              <MapPin className="w-4 h-4" />
              Search
            </Button>
          </div>

          <Tabs defaultValue="shops" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shops">Pet Shops</TabsTrigger>
              <TabsTrigger value="clinics">Vet Clinics</TabsTrigger>
              <TabsTrigger value="grooming">Grooming</TabsTrigger>
            </TabsList>
            
            <TabsContent value="shops" className="space-y-4 mt-4">
              {petShops.map((shop) => (
                <ServiceCard key={shop.id} service={shop} />
              ))}
            </TabsContent>
            
            <TabsContent value="clinics" className="space-y-4 mt-4">
              {vetClinics.map((clinic) => (
                <ServiceCard key={clinic.id} service={clinic} />
              ))}
            </TabsContent>
            
            <TabsContent value="grooming" className="space-y-4 mt-4">
              {groomingServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NearbyServicesModal;
