import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-orange-600/5"></div>
      
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Paws On Time
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-700 hover:text-blue-600" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-fade-in">
              🐾 Trusted by 10,000+ Pet Parents
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in">
              Everything Your Pet Needs,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                On Time
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed animate-fade-in">
              From health routines to trusted consultations, manage your pet's complete care with our all-in-one platform. Schedule, consult, and connect with the best pet care professionals near you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg group" asChild>
                <Link to="/register">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50">
                Watch Demo
              </Button> */}
            </div>
            
            <div className="flex items-center space-x-8 pt-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Schedule Care</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-600">Vet Consultations</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">Find Services</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-orange-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-orange-600/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-pulse">🐕‍🦺</div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute top-4 right-4 bg-white p-3 rounded-xl shadow-lg animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-xs font-medium">Next: Walk at 3 PM</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium">Dr. Sarah Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
