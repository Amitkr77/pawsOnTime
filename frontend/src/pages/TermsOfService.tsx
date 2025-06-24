
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Paws On Time
              </span>
            </Link>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-gray-600">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using Paws On Time, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily use Paws On Time for personal, non-commercial 
              transitory viewing only.
            </p>

            <h2>Service Description</h2>
            <p>
              Paws On Time is a platform that connects pet parents with veterinarians, pet walkers, 
              and other pet care services.
            </p>

            <h2>User Responsibilities</h2>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Respect other users and service providers</li>
            </ul>

            <h2>Service Providers</h2>
            <p>
              All service providers on our platform are independent contractors. Paws On Time 
              facilitates connections but does not directly provide veterinary or pet care services.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Paws On Time shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages.
            </p>

            <h2>Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to{" "}
              <a href="mailto:legal@pawsontime.com" className="text-blue-600">
                legal@pawsontime.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
