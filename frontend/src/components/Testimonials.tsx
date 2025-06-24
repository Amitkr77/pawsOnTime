
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Pet Parent",
      content: "Paws On Time has made managing my dog's care so much easier. The scheduling feature is a lifesaver!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Dr. Michael Chen",
      role: "Veterinarian",
      content: "The platform connects me with pet parents seamlessly. Video consultations work perfectly.",
      rating: 5,
      avatar: "👨‍⚕️"
    },
    {
      name: "Alex Rivera",
      role: "Pet Walker",
      content: "I love how easy it is to manage my bookings and connect with pet owners in my area.",
      rating: 5,
      avatar: "🚶‍♂️"
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by Pet Parents & Professionals
          </h2>
          <p className="text-xl text-gray-600">See what our community says about Paws On Time</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
