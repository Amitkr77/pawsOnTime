
import { Heart, Users, Star, Calendar } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Happy Pet Parents", color: "from-blue-500 to-blue-600" },
    { icon: Heart, value: "500+", label: "Certified Vets", color: "from-red-500 to-red-600" },
    { icon: Star, value: "4.9", label: "Average Rating", color: "from-yellow-500 to-yellow-600" },
    { icon: Calendar, value: "50K+", label: "Appointments", color: "from-green-500 to-green-600" },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
