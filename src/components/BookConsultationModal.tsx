
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Star, Video, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface BookConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookConsultationModal = ({ open, onOpenChange }: BookConsultationModalProps) => {
  const { toast } = useToast();
  const [selectedVet, setSelectedVet] = useState("");
  const [consultationType, setConsultationType] = useState("");

  const availableVets = [
    { id: "1", name: "Dr. Sarah Johnson", specialization: "General Practice", rating: 4.8, experience: "8 years", available: true },
    { id: "2", name: "Dr. Michael Chen", specialization: "Surgery", rating: 4.9, experience: "12 years", available: true },
    { id: "3", name: "Dr. Emily Davis", specialization: "Dermatology", rating: 4.7, experience: "6 years", available: false },
  ];

  const handleBookConsultation = () => {
    const vet = availableVets.find(v => v.id === selectedVet);
    toast({
      title: "Consultation Booked! 🩺",
      description: `Appointment scheduled with ${vet?.name} for ${consultationType} consultation`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Book Veterinary Consultation</span>
          </DialogTitle>
          <DialogDescription>
            Find and book appointments with qualified veterinarians
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Consultation Type</Label>
            <Select value={consultationType} onValueChange={setConsultationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Checkup</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="surgery">Surgery Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Available Veterinarians</Label>
            {availableVets.map((vet) => (
              <div 
                key={vet.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedVet === vet.id ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                } ${!vet.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => vet.available && setSelectedVet(vet.id)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{vet.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{vet.name}</h3>
                      <Badge variant={vet.available ? 'default' : 'secondary'}>
                        {vet.available ? 'Available' : 'Busy'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{vet.specialization} • {vet.experience}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{vet.rating}</span>
                    </div>
                  </div>
                  {vet.available && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Describe Symptoms or Concerns</Label>
            <Textarea 
              id="symptoms" 
              placeholder="Please describe your pet's symptoms or the reason for consultation..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookConsultation}
              disabled={!selectedVet || !consultationType}
            >
              <Heart className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookConsultationModal;
