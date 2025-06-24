
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="py-24 bg-gradient-to-r from-blue-600 to-orange-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Give Your Pet the Best Care?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of pet parents who trust Paws On Time for their pet's health and happiness.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg group" asChild>
          <Link to="/register">
            Start Your Journey Today
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTA;
