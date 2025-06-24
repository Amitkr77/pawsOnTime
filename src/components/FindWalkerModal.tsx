
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Star, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface FindWalkerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FindWalkerModal = ({ open, onOpenChange }: FindWalkerModalProps) => {
  const { toast } = useToast();
  const [selectedWalker, setSelectedWalker] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const availableWalkers = [
    { id: "1", name: "Alex Thompson", rating: 4.9, experience: "3 years", rate: "$15/30min", distance: "0.5 miles", available: true, specialties: ["Large Dogs", "Training"] },
    { id: "2", name: "Maria Garcia", rating: 4.8, experience: "5 years", rate: "$12/30min", distance: "0.8 miles", available: true, specialties: ["Small Dogs", "Senior Pets"] },
    { id: "3", name: "James Wilson", rating: 4.7, experience: "2 years", rate: "$10/30min", distance: "1.2 miles", available: false, specialties: ["Puppies", "Active Dogs"] },
  ];

  const handleBookWalker = () => {
    const walker = availableWalkers.find(w => w.id === selectedWalker);
    toast({
      title: "Walker Booked! 🚶",
      description: `${walker?.name} will walk your pet on ${date} at ${time} for ${duration}`
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <span>Find Pet Walker</span>
          </DialogTitle>
          <DialogDescription>
            Book trusted pet walkers in your neighborhood
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Walk Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">15 minutes</SelectItem>
                  <SelectItem value="30min">30 minutes</SelectItem>
                  <SelectItem value="45min">45 minutes</SelectItem>
                  <SelectItem value="1hour">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preferred Time</Label>
            <Input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Available Walkers Nearby</Label>
            {availableWalkers.map((walker) => (
              <div 
                key={walker.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedWalker === walker.id ? 'border-green-500 bg-green-50' : 'hover:border-gray-300'
                } ${!walker.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => walker.available && setSelectedWalker(walker.id)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{walker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{walker.name}</h3>
                      <Badge variant={walker.available ? 'default' : 'secondary'}>
                        {walker.available ? 'Available' : 'Busy'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{walker.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{walker.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{walker.rate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{walker.distance}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {walker.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {walker.available && selectedWalker === walker.id && (
                    <Badge className="bg-green-500">Selected</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBookWalker}
              disabled={!selectedWalker || !duration || !date || !time}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Book Walker
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FindWalkerModal;
