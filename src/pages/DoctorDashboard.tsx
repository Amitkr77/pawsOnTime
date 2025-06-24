
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Star, Clock, FileText, Video, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AppointmentModal from "@/components/AppointmentModal";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const todayAppointments = [
    { id: 1, time: "10:00 AM", pet: "Buddy", owner: "John Smith", type: "Consultation", status: "upcoming" },
    { id: 2, time: "2:30 PM", pet: "Luna", owner: "Sarah Wilson", type: "Follow-up", status: "completed" },
    { id: 3, time: "4:00 PM", pet: "Max", owner: "Mike Johnson", type: "Emergency", status: "pending" },
  ];

  const recentReviews = [
    { owner: "John Smith", rating: 5, comment: "Excellent care for my dog Buddy!" },
    { owner: "Sarah Wilson", rating: 5, comment: "Very professional and caring." },
    { owner: "Mike Johnson", rating: 4, comment: "Quick response and helpful advice." },
  ];

  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleStartConsultation = (appointment: any) => {
    toast({ 
      title: "Starting consultation", 
      description: `Video call with ${appointment.owner}` 
    });
  };

  const handleSendMessage = (appointment: any) => {
    toast({ 
      title: "Opening chat", 
      description: `Messaging ${appointment.owner}` 
    });
  };

  const handleUploadPrescription = (appointment: any) => {
    toast({ 
      title: "Upload prescription", 
      description: `For ${appointment.pet}` 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Dr. Anderson! 👨‍⚕️</h1>
          <p className="text-gray-600">You have 3 appointments scheduled for today</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-gray-600">Prescriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Today's Appointments</span>
              </CardTitle>
              <CardDescription>Manage your consultation schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{appointment.time}</span>
                        <Badge variant={appointment.status === 'completed' ? 'default' : appointment.status === 'pending' ? 'secondary' : 'outline'}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.pet} • {appointment.owner}</p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewAppointment(appointment)}>
                        View
                      </Button>
                      {appointment.status === 'upcoming' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleStartConsultation(appointment)}>
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleSendMessage(appointment)}>
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleUploadPrescription(appointment)}>
                            <FileText className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Recent Reviews</span>
              </CardTitle>
              <CardDescription>What pet parents are saying</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">{review.owner}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AppointmentModal 
        open={showAppointmentModal} 
        onOpenChange={setShowAppointmentModal} 
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default DoctorDashboard;
