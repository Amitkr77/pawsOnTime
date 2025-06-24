
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

interface TaskDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: {
    title: string;
    pet: string;
    date: string;
    type: string;
  } | null;
}

const TaskDetailsModal = ({ open, onOpenChange, task }: TaskDetailsModalProps) => {
  if (!task) return null;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return '💉';
      case 'grooming':
        return '✂️';
      case 'walk':
        return '🚶';
      default:
        return '📋';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{getTaskIcon(task.type)}</span>
            <span>{task.title}</span>
          </DialogTitle>
          <DialogDescription>
            Task details for {task.pet}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Scheduled Date</p>
                <p className="text-sm text-gray-600">{task.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Pet</p>
                <p className="text-sm text-gray-600">{task.pet}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="capitalize">
                {task.type}
              </Badge>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Task Notes</h4>
            <p className="text-sm text-gray-600">
              {task.type === 'medical' && "Remember to bring vaccination records and any questions for the vet."}
              {task.type === 'grooming' && "Full grooming session including bath, nail trim, and ear cleaning."}
              {task.type === 'walk' && "30-minute walk in the neighborhood park. Bring water and waste bags."}
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              Mark Complete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
