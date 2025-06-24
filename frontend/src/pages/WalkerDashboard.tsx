
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dog, Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";

const WalkerDashboard = () => {
  const bookingRequests = [
    { pet: "Buddy", owner: "John Smith", time: "3:00 PM", duration: "30 min", location: "Central Park", price: "$25" },
    { pet: "Luna", owner: "Sarah Wilson", time: "5:30 PM", duration: "15 min", location: "Madison Square", price: "$15" },
    { pet: "Max", owner: "Mike Johnson", time: "7:00 PM", duration: "30 min", location: "Riverside Park", price: "$25" },
  ];

  const completedWalks = [
    { pet: "Charlie", owner: "Emma Davis", date: "Dec 26", duration: "30 min", earned: "$25" },
    { pet: "Bella", owner: "Tom Wilson", date: "Dec 25", duration: "15 min", earned: "$15" },
    { pet: "Milo", owner: "Lisa Brown", date: "Dec 24", duration: "30 min", earned: "$25" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, Alex! 🚶‍♂️</h1>
          <p className="text-gray-600">You have 3 new booking requests waiting</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Dog className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-gray-600">Walks This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600">Today's Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">$486</p>
                  <p className="text-sm text-gray-600">This Week's Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">Available</p>
                  <p className="text-sm text-gray-600">Toggle your status</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>New Booking Requests</span>
              </CardTitle>
              <CardDescription>Accept or decline walk requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingRequests.map((request, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{request.pet}</h3>
                        <p className="text-sm text-gray-600">{request.owner}</p>
                      </div>
                      <Badge variant="outline">{request.price}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{request.time} • {request.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{request.location}</span>
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">Accept</Button>
                      <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Recent Walks</span>
              </CardTitle>
              <CardDescription>Your completed walk history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedWalks.map((walk, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{walk.pet}</h3>
                      <p className="text-sm text-gray-600">{walk.owner}</p>
                      <p className="text-xs text-gray-500">{walk.date} • {walk.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{walk.earned}</p>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalkerDashboard;
