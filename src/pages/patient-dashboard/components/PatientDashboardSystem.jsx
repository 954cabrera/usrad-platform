import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Heart, 
  TrendingUp, 
  FileText, 
  Users, 
  Phone, 
  Download, 
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  DollarSign,
  Shield,
  Gift,
  Zap,
  Activity,
  Award,
  Bell,
  User,
  Settings,
  ChevronRight,
  AlertCircle,
  Camera,
  Stethoscope,
  Brain,
  Eye,
  Building,
  MapPin,
  ExternalLink,
  Share2
} from 'lucide-react';

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { Progress } from "../../../components/ui/progress";

const PatientDashboardSystem = ({ patientData, appointmentData, educationContent }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [referralProgress, setReferralProgress] = useState(patientData?.referralProgress || 2);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getScanIcon = (type) => {
    if (type.includes('Brain') || type.includes('Head')) return <Brain className="w-5 h-5" />;
    if (type.includes('CT') || type.includes('Chest')) return <Activity className="w-5 h-5" />;
    if (type.includes('Eye')) return <Eye className="w-5 h-5" />;
    return <Stethoscope className="w-5 h-5" />;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const nextAppointment = appointmentData?.upcoming?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Premium Header with USRad Branding - Matching Provider Dashboard */}
      <div className="usrad-card p-8 mb-8 usrad-gradient-navy text-white relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#cc9933] rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white drop-shadow-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {getGreeting()}, {patientData?.firstName}! 👋
                </h1>
                <p className="text-blue-100 text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Your health journey with USRad
                </p>
                </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-blue-100 text-sm">Member since</p>
                <p className="text-white font-semibold">
                  {new Date(patientData?.memberSince).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Settings className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>

          {/* Key Health Metrics - Matching Provider Dashboard Style */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Next Appointment</p>
                  <p className="text-white font-bold text-lg">
                    {nextAppointment ? 
                      `${new Date(nextAppointment.date).toLocaleDateString()} ${nextAppointment.time}` : 
                      'None scheduled'
                    }
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-[#cc9933]" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Savings</p>
                  <p className="text-white font-bold text-lg">${patientData?.totalSavings?.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-[#cc9933]" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Health Score</p>
                  <p className="text-white font-bold text-lg">{patientData?.healthScore}/100</p>
                </div>
                <Heart className="w-8 h-8 text-[#cc9933]" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Completed Scans</p>
                  <p className="text-white font-bold text-lg">{patientData?.completedScans}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#cc9933]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointment Alert */}
      {nextAppointment && (
        <Alert className="usrad-card mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Bell className="h-5 w-5 text-blue-600" />
          <AlertTitle className="text-blue-800 font-bold">Upcoming Appointment Reminder</AlertTitle>
          <AlertDescription className="text-blue-700">
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="font-semibold text-lg">{nextAppointment.type} - {new Date(nextAppointment.date).toLocaleDateString()} at {nextAppointment.time}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-1" />
                    {nextAppointment.provider}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {nextAppointment.location}
                  </span>
                  {nextAppointment.prepRequired && (
                    <span className="flex items-center text-yellow-700">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Prep Required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Provider
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-8">
          {/* Upcoming Appointments */}
          <Card className="usrad-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="usrad-gradient-navy text-white">
              <CardTitle className="flex items-center text-xl" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <Calendar className="w-6 h-6 mr-3" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription className="text-blue-100">
                Your scheduled imaging appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {appointmentData?.upcoming?.length > 0 ? (
                <div className="space-y-4">
                  {appointmentData.upcoming.map((appointment) => (
                    <div key={appointment.id} className="bg-gradient-to-r from-blue-50 to-transparent rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 usrad-gradient-navy rounded-xl flex items-center justify-center shadow-lg text-white">
                            {getScanIcon(appointment.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {appointment.type}
                            </h3>
                            <p className="text-gray-600 font-medium">{appointment.provider}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-green-500" />
                                {appointment.location}
                              </span>
                              {appointment.contrast && (
                                <Badge className="bg-purple-100 text-purple-800 text-xs">With Contrast</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(appointment.status)}
                            {getStatusBadge(appointment.status)}
                          </div>
                          <p className="text-sm text-green-600 font-semibold">Saving ${appointment.savings}</p>
                        </div>
                      </div>
                      {appointment.prepRequired && (
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                              <p className="text-yellow-800 font-medium">Preparation instructions required</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <BookOpen className="w-4 h-4 mr-2" />
                              View Instructions
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">No upcoming appointments</h3>
                  <p className="text-gray-500 mb-4">Book your next imaging appointment today</p>
                  <Button className="usrad-gradient-navy text-white">
                    <Camera className="w-4 h-4 mr-2" />
                    Book New Imaging
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Appointments & Reports */}
          <Card className="usrad-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-xl usrad-navy" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <FileText className="w-6 h-6 mr-3" />
                Recent Appointments & Reports
              </CardTitle>
              <CardDescription>
                Your imaging history and available reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointmentData?.recent?.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-white">
                      {getScanIcon(appointment.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.type}</h4>
                      <p className="text-sm text-gray-600">{appointment.provider}</p>
                      <p className="text-xs text-gray-500">{new Date(appointment.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      {getStatusBadge(appointment.status)}
                      <p className="text-xs text-green-600 mt-1">Saved ${appointment.savings}</p>
                    </div>
                    {appointment.reportAvailable && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="usrad-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-xl usrad-navy" style={{ fontFamily: 'Manrope, sans-serif' }}>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full usrad-gradient-navy hover:shadow-xl transition-all duration-300 text-white">
                <Camera className="w-5 h-5 mr-2" />
                Book New Imaging
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-5 h-5 mr-2" />
                View All Reports
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="w-5 h-5 mr-2" />
                Share with Doctor
              </Button>
            </CardContent>
          </Card>

          {/* Referral Program */}
          <Card className="usrad-card bg-gradient-to-br from-[#cc9933]/10 to-yellow-50 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="text-xl text-[#cc9933] flex items-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <Gift className="w-6 h-6 mr-2" />
                Referral Rewards
              </CardTitle>
              <CardDescription>
                Earn $100 credit for every 5 referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#cc9933] mb-2">{referralProgress}/5</div>
                  <p className="text-sm text-gray-600">Referrals completed</p>
                </div>
                <Progress value={(referralProgress / 5) * 100} className="h-3" />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    {5 - referralProgress} more referrals to earn <span className="font-bold text-[#cc9933]">$100 credit!</span>
                  </p>
                  <Button className="w-full bg-[#cc9933] hover:bg-[#b8822e] text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Refer Friends
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Tracker */}
          <Card className="usrad-card bg-gradient-to-br from-green-50 to-emerald-50 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-xl text-green-800 flex items-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <TrendingUp className="w-6 h-6 mr-2" />
                Your Savings
              </CardTitle>
              <CardDescription>
                Total saved vs. hospital pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className="text-4xl font-bold text-green-600">${patientData?.totalSavings?.toLocaleString()}</div>
                  <p className="text-green-700 font-medium">Total Saved This Year</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">68%</div>
                    <div className="text-gray-600">Avg Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{patientData?.completedScans}</div>
                    <div className="text-gray-600">Scans</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Health Education */}
          <Card className="usrad-card animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <CardHeader>
              <CardTitle className="text-xl usrad-navy flex items-center" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <BookOpen className="w-6 h-6 mr-2" />
                Health Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {educationContent?.slice(0, 2).map((content) => (
                <div key={content.id} className={`p-3 rounded-lg border ${
                  content.featured ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'
                }`}>
                  <h4 className={`font-semibold text-sm ${
                    content.featured ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {content.title}
                  </h4>
                  <p className={`text-xs mt-1 ${
                    content.featured ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {content.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${
                      content.featured ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {content.readTime}
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 p-1">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Articles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardSystem;