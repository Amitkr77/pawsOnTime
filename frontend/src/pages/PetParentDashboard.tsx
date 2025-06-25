import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Heart,
  MapPin,
  Clock,
  Plus,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddPetModal from "@/components/AddPetModal";
import TaskDetailsModal from "@/components/TaskDetailsModal";
import ScheduleCareModal from "@/components/ScheduleCareModal";
import BookConsultationModal from "@/components/BookConsultationModal";
import FindWalkerModal from "@/components/FindWalkerModal";
import NearbyServicesModal from "@/components/NearbyServicesModal";
import UserSettingsModal from "@/components/UserSettingsModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/axios";
import { Loader2 } from "lucide-react";

const PetParentDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showScheduleCareModal, setShowScheduleCareModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showWalkerModal, setShowWalkerModal] = useState(false);
  const [showNearbyModal, setShowNearbyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }

    if (!user.address || !user.bio || !user.phoneNumber) {
      toast({
        title: "Profile Incomplete",
        description: "Please complete your profile to unlock full access.",
        variant: "default",
      });
    }
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) return;

        const { _id } = JSON.parse(storedUser);
        const res = await api.get(`/users/${_id}/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPets(res.data.pets || []);
      } catch (err) {
        toast({
          title: "Failed to load pets",
          description: "We couldn’t fetch your pets from the server.",
          variant: "destructive",
        });
      } finally {
        setLoadingPets(false);
      }
    };

    fetchPets();
  }, []);

  const upcomingTasks = [
    {
      title: "Vaccination Due",
      pet: "Buddy",
      date: "Tomorrow",
      type: "medical",
    },
    {
      title: "Grooming Appointment",
      pet: "Luna",
      date: "Dec 28",
      type: "grooming",
    },
    { title: "Walker Booking", pet: "Max", date: "Today 5 PM", type: "walk" },
  ];

  const quickActions = [
    {
      title: "Schedule Care",
      icon: Calendar,
      description: "Set reminders for your pet",
      color: "from-blue-500 to-blue-600",
      action: () => setShowScheduleCareModal(true),
    },
    {
      title: "Book Consultation",
      icon: Heart,
      description: "Connect with a vet",
      color: "from-red-500 to-red-600",
      action: () => setShowConsultationModal(true),
    },
    {
      title: "Find Walker",
      icon: MapPin,
      description: "Book a pet walker",
      color: "from-green-500 to-green-600",
      action: () => setShowWalkerModal(true),
    },
    {
      title: "Nearby Services",
      icon: Clock,
      description: "Find shops & clinics",
      color: "from-orange-500 to-orange-600",
      action: () => setShowNearbyModal(true),
    },
  ];

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleAddPet = () => {
    setShowAddPetModal(true);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Paws On Time
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setShowSettingsModal(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userName}! 🐾
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your pets today
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Upcoming Tasks</span>
                </CardTitle>
                <CardDescription>
                  Don't miss these important pet care activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {task.pet} • {task.date}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewTask(task)}
                      >
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
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
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
                {loadingPets && (
                  <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
                  </div>
                )}

                {!loadingPets && pets.length === 0 && (
                  <p className="text-sm text-gray-600 text-center">
                    You haven’t added any pets yet.
                  </p>
                )}

                {!loadingPets &&
                  pets.map((pet) => (
                    <div
                      key={pet._id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:shadow-sm transition"
                    >
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl">
                        {pet.type === "dog"
                          ? "🐕"
                          : pet.type === "cat"
                          ? "🐱"
                          : pet.type === "bird"
                          ? "🦜"
                          : "🐾"}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{pet.name}</h3>
                        <p className="text-sm text-gray-600">
                          {pet.breed || "Unknown breed"}, {pet.age || "N/A"} yrs
                        </p>
                      </div>
                    </div>
                  ))}

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleAddPet}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Pet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddPetModal open={showAddPetModal} onOpenChange={setShowAddPetModal} />
      <TaskDetailsModal
        open={showTaskModal}
        onOpenChange={setShowTaskModal}
        task={selectedTask}
      />
      <ScheduleCareModal
        open={showScheduleCareModal}
        onOpenChange={setShowScheduleCareModal}
      />
      <BookConsultationModal
        open={showConsultationModal}
        onOpenChange={setShowConsultationModal}
      />
      <FindWalkerModal
        open={showWalkerModal}
        onOpenChange={setShowWalkerModal}
      />
      <NearbyServicesModal
        open={showNearbyModal}
        onOpenChange={setShowNearbyModal}
      />
      <UserSettingsModal
        open={showSettingsModal}
        onOpenChange={setShowSettingsModal}
      />
    </div>
  );
};

export default PetParentDashboard;
