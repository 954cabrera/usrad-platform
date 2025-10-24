// /src/pages/patient-dashboard/components/SkeletonSupportSystem.jsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, Search, HelpCircle, Download, Clock, CheckCircle } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="text-center">
        <div className="h-10 bg-gray-300 rounded-lg w-64 mx-auto mb-3 animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded-lg w-80 mx-auto animate-pulse"></div>
      </div>
    </div>

    {/* Quick Actions Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="usrad-card p-6 text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded w-32 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-40 mx-auto mb-4 animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded-lg w-full animate-pulse"></div>
        </div>
      ))}
    </div>

    {/* FAQ Skeleton */}
    <div className="usrad-card p-6">
      <div className="h-6 bg-gray-300 rounded w-48 mb-4 animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>

    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-pulse {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
    `}</style>
  </div>
);

const SkeletonSupportSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const faqs = [
    {
      question: "How do I prepare for my MRI scan?",
      answer: "Remove all metal objects, inform us of any implants, and follow fasting instructions if required. Arrive 15 minutes early."
    },
    {
      question: "When will my results be available?",
      answer: "Most results are available within 24-48 hours. You'll receive an email notification when your report is ready."
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule up to 24 hours before your appointment through your dashboard or by calling us."
    },
    {
      question: "Do you accept my insurance?",
      answer: "We work with most major insurance providers. Check your specific coverage in the billing section of your dashboard."
    }
  ];

  return (
    <div className="space-y-8">
      <style jsx>{`
        .usrad-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.08);
          transition: all 0.3s ease;
        }
        .usrad-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
        .usrad-navy { color: #003087; }
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
      `}</style>

      {/* Header */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Help & Support Center</h1>
          <p className="text-blue-100 text-xl">We're here to help with any questions about your imaging experience</p>
        </div>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="usrad-card p-6 text-center hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-bold usrad-navy mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Get instant help from our support team</p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
            Chat Now - We're Online
          </button>
          <p className="text-xs text-gray-500 mt-2">Average response: 30 seconds</p>
        </div>

        <div className="usrad-card p-6 text-center hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold usrad-navy mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Speak directly with a patient advocate</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Call (305) 555-USRAD
          </button>
          <p className="text-xs text-gray-500 mt-2">Mon-Fri 8AM-8PM, Sat 9AM-5PM</p>
        </div>

        <div className="usrad-card p-6 text-center hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold usrad-navy mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us a detailed message</p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
            Send Email
          </button>
          <p className="text-xs text-gray-500 mt-2">Response within 2 hours</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Frequently Asked Questions</h3>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="usrad-card p-6">
          <h3 className="text-lg font-bold usrad-navy mb-4">Helpful Resources</h3>
          <div className="space-y-3">
            {[
              'Patient Preparation Guide',
              'Insurance Coverage Information',
              'Appointment Scheduling Help',
              'Understanding Your Results',
              'Payment Options & Billing'
            ].map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium">{resource}</span>
                <Download className="w-4 h-4 text-blue-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="usrad-card p-6">
          <h3 className="text-lg font-bold usrad-navy mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Booking System</span>
              </div>
              <span className="text-green-600 font-semibold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Report Access</span>
              </div>
              <span className="text-green-600 font-semibold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span>Payment Processing</span>
              </div>
              <span className="text-yellow-600 font-semibold">Maintenance</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Last updated: 2 minutes ago</p>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="usrad-card p-6 bg-red-50 border-2 border-red-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-bold">!</span>
          </div>
          <div>
            <h3 className="font-bold text-red-900">Medical Emergency</h3>
            <p className="text-red-800 text-sm">For medical emergencies, call 911 immediately. This platform is for scheduling and support only.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSupportSystem;