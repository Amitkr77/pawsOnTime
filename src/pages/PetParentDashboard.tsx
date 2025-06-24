
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin, Clock, Plus, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AddPetModal from "@/components/AddPetModal";
import TaskDetailsModal from "@/components/TaskDetailsModal";

const PetParentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const upcomingTasks = [
    { title: "Vaccination Due", pet: "Buddy", date: "Tomorrow", type: "medical" },
    { title: "Grooming Appointment", pet: "Luna", date: "Dec 28", type: "grooming" },
    { title: "Walker Booking", pet: "Max", date: "Today 5 PM", type: "walk" },
  ];

  const quickActions = [
    { 
      title: "Schedule Care", 
      icon: Calendar, 
      description: "Set reminders for your pet", 
      color: "from-blue-500 to-blue-600",
      action: () => handleScheduleCare()
    },
    { 
      title: "Book Consultation", 
      icon: Heart, 
      description: "Connect with a vet", 
      color: "from-red-500 to-red-600",
      action: () => handleBookConsultation()
    },
    { 
      title: "Find Walker", 
      icon: MapPin, 
      description: "Book a pet walker", 
      color: "from-green-500 to-green-600",
      action: () => handleFindWalker()
    },
    { 
      title: "Nearby Services", 
      icon: Clock, 
      description: "Find shops & clinics", 
      color: "from-orange-500 to-orange-600",
      action: () => handleNearbyServices()
    },
  ];

  const handleScheduleCare = () => {
    toast({ 
      title: "Schedule Care 📅", 
      description: "Opening pet care scheduler..." 
    });
    // Here you would typically navigate to scheduler page
    // navigate("/scheduler");
  };

  const handleBookConsultation = () => {
    toast({ 
      title: "Find Veterinarians 🩺", 
      description: "Searching for available vets in your area..." 
    });
    // navigate("/consultation");
  };

  const handleFindWalker = () => {
    toast({ 
      title: "Find Pet Walker 🚶", 
      description: "Looking for available pet walkers nearby..." 
    });
    // navigate("/walker");
  };

  const handleNearbyServices = () => {
    toast({ 
      title: "Nearby Services 📍", 
      description: "Finding pet shops and clinics in your area..." 
    });
    // navigate("/nearby");
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleAddPet = () => {
    setShowAddPetModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 🐾</h1>
          <p className="text-gray-600">Here's what's happening with your pets today</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Upcoming Tasks</span>
                </CardTitle>
                <CardDescription>Don't miss these important pet care activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-md transition-shadow">
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.pet} • {task.date}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleViewTask(task)}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get things done quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <div 
                      key={index} 
                      className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={action.action}
                    >
                      <div className="p-6 bg-white border rounded-xl">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Your Pets</CardTitle>
                <CardDescription>Manage your furry friends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    🐕
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Buddy</h3>
                    <p className="text-sm text-gray-600">Golden Retriever, 3 years</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                    🐱
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Luna</h3>
                    <p className="text-sm text-gray-600">Persian Cat, 2 years</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={handleAddPet}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Pet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddPetModal 
        open={showAddPetModal} 
        onOpenChange={setShowAddPetModal} 
      />
      <TaskDetailsModal 
        open={showTaskModal} 
        onOpenChange={setShowTaskModal} 
        task={selectedTask}
      />
    </div>
  );
};

export default PetParentDashboard;
