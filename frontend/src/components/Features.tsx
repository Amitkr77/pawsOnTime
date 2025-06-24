
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, MapPin, Clock, Shield, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Never miss feeding, medication, or grooming appointments with intelligent reminders and calendar sync.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Vet Consultations",
      description: "Connect with certified veterinarians for video consultations and get prescriptions delivered.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: MapPin,
      title: "Nearby Services",
      description: "Find trusted pet walkers, shops, and clinics in your area with ratings and reviews.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Track your pet walker's location and get live updates during walks and services.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "All service providers are verified and background-checked for your pet's safety.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Family Sharing",
      description: "Share pet schedules and updates with family members to keep everyone informed.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Pet Care</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform brings together all the tools and services you need to keep your furry friends healthy, happy, and well-cared for.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
              <CardContent className="p-8">
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer group">
            Join Thousands of Happy Pet Parents
            <Heart className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
