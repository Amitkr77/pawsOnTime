
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ScheduleCareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduleCareModal = ({ open, onOpenChange }: ScheduleCareModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pet: "",
    careType: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Care Scheduled! 📅",
      description: `${formData.careType} scheduled for ${formData.pet} on ${formData.date} at ${formData.time}`
    });
    onOpenChange(false);
    setFormData({ pet: "", careType: "", date: "", time: "", notes: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>Schedule Pet Care</span>
          </DialogTitle>
          <DialogDescription>
            Set up reminders and schedule care activities for your pets
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet">Select Pet</Label>
            <Select value={formData.pet} onValueChange={(value) => setFormData({...formData, pet: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your pet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buddy">Buddy (Golden Retriever)</SelectItem>
                <SelectItem value="luna">Luna (Persian Cat)</SelectItem>
                <SelectItem value="max">Max (German Shepherd)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="careType">Care Type</Label>
            <Select value={formData.careType} onValueChange={(value) => setFormData({...formData, careType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select care type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="deworming">Deworming</SelectItem>
                <SelectItem value="grooming">Grooming</SelectItem>
                <SelectItem value="feeding">Feeding Reminder</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time" 
                type="time" 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Any special instructions or notes..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Heart className="w-4 h-4 mr-2" />
              Schedule Care
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleCareModal;
