
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, MessageCircle, Video, FileText, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    id: number;
    time: string;
    pet: string;
    owner: string;
    type: string;
    status: string;
  } | null;
}

const AppointmentModal = ({ open, onOpenChange, appointment }: AppointmentModalProps) => {
  const { toast } = useToast();

  if (!appointment) return null;

  const handleStartConsultation = () => {
    toast({
      title: "Starting Video Consultation",
      description: `Launching video call with ${appointment.owner}`
    });
    onOpenChange(false);
  };

  const handleSendMessage = () => {
    toast({
      title: "Opening Chat",
      description: `Chat opened with ${appointment.owner}`
    });
    onOpenChange(false);
  };

  const handleUploadPrescription = () => {
    toast({
      title: "Upload Prescription",
      description: `Opening prescription upload for ${appointment.pet}`
    });
    onOpenChange(false);
  };

  const handleCall = () => {
    toast({
      title: "Calling Patient",
      description: `Calling ${appointment.owner}...`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Appointment Details</span>
          </DialogTitle>
          <DialogDescription>
            {appointment.type} scheduled for {appointment.time}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{appointment.owner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{appointment.owner}</h3>
              <p className="text-sm text-gray-600">Pet: {appointment.pet}</p>
              <Badge variant={appointment.status === 'completed' ? 'default' : appointment.status === 'pending' ? 'secondary' : 'outline'}>
                {appointment.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <p className="text-sm font-medium text-gray-500">Appointment Time</p>
              <p className="font-semibold">{appointment.time}</p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="font-semibold">{appointment.type}</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Pet Information</h4>
            <p className="text-sm text-gray-600">
              Patient: {appointment.pet}<br/>
              Owner: {appointment.owner}<br/>
              Last Visit: 2 weeks ago<br/>
              Condition: Regular checkup
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={handleCall}>
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button size="sm" variant="outline" onClick={handleSendMessage}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            {appointment.status === 'upcoming' && (
              <>
                <Button size="sm" variant="outline" onClick={handleStartConsultation}>
                  <Video className="w-4 h-4 mr-2" />
                  Start Call
                </Button>
                <Button size="sm" onClick={handleUploadPrescription}>
                  <FileText className="w-4 h-4 mr-2" />
                  Prescription
                </Button>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {appointment.status === 'upcoming' && (
              <Button>
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
