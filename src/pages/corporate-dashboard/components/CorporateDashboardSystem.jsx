import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Building2, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Clock,
  Star,
  Shield,
  ArrowUp,
  ArrowDown,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

// Skeleton Loading Component
const SkeletonCard = () => (
  <Card className="border-0 shadow-lg">
    <CardHeader className="pb-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
      </div>
    </CardContent>
  </Card>
);

const SkeletonMetricCard = ({ color = "bg-blue-600" }) => (
  <Card className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white`}>
    <CardHeader className="pb-2">
      <div className="h-4 bg-white/20 rounded animate-pulse w-2/3"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="h-8 bg-white/20 rounded animate-pulse w-1/2"></div>
        <div className="h-4 bg-white/20 rounded animate-pulse w-3/4"></div>
      </div>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <div className="h-16 w-16 bg-white/20 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

const CorporateDashboardSystem = ({ userContext = {} }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate loading time for demo
  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(loadingTimer);
  }, [selectedTimeframe]);

  // Reset loading when timeframe changes
  useEffect(() => {
    setIsLoading(true);
  }, [selectedTimeframe]);

  // Mock real-time data that would come from your analytics backend
  const platformMetrics = {
    today: {
      scans: 847,
      scansChange: 12,
      revenue: 127400,
      revenueChange: 18,
      activeProviders: 1247,
      providersChange: 3,
      newPatients: 342,
      patientsChange: 25,
      platformHealth: 94,
      conversionRate: 23.8,
      avgBookingValue: 450
    },
    week: {
      scans: 5234,
      scansChange: 15,
      revenue: 892800,
      revenueChange: 22,
      activeProviders: 1247,
      providersChange: 8,
      newPatients: 2156,
      patientsChange: 31,
      platformHealth: 96,
      conversionRate: 24.2,
      avgBookingValue: 465
    },
    month: {
      scans: 18947,
      scansChange: 28,
      revenue: 3458920,
      revenueChange: 35,
      activeProviders: 1247,
      providersChange: 89,
      newPatients: 8934,
      patientsChange: 42,
      platformHealth: 95,
      conversionRate: 25.1,
      avgBookingValue: 475
    }
  };

  const currentMetrics = platformMetrics[selectedTimeframe];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTimeframeSuffix = () => {
    switch(selectedTimeframe) {
      case 'today': return 'vs yesterday';
      case 'week': return 'vs last week';
      case 'month': return 'vs last month';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex space-x-2">
        {['today', 'week', 'month'].map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedTimeframe === timeframe
                ? 'bg-[#003087] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border'
            }`}
          >
            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          </button>
        ))}
      </div>

      {/* Alert Center */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>System Health:</strong> All platforms operational (99.8% uptime)
          </AlertDescription>
        </Alert>
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Capacity Alert:</strong> Miami market at 85% provider utilization
          </AlertDescription>
        </Alert>
        <Alert className="border-blue-200 bg-blue-50">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Growth Opportunity:</strong> 12 new high-value providers pending onboarding
          </AlertDescription>
        </Alert>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <SkeletonMetricCard />
            <SkeletonMetricCard />
            <SkeletonMetricCard />
            <SkeletonMetricCard />
          </>
        ) : (
          <>
            {/* Total Scans */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary to-blue-800 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-100 flex items-center font-manrope">
                  <Calendar className="h-4 w-4 mr-2" />
                  Total Scans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 font-manrope">{formatNumber(currentMetrics.scans)}</div>
                <div className="flex items-center text-sm text-blue-100">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+{currentMetrics.scansChange}% {getTimeframeSuffix()}</span>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Calendar className="h-16 w-16" />
                </div>
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-600 to-green-700 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-100 flex items-center font-manrope">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Platform Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 font-manrope">{formatCurrency(currentMetrics.revenue)}</div>
                <div className="flex items-center text-sm text-green-100">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+{currentMetrics.revenueChange}% {getTimeframeSuffix()}</span>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <DollarSign className="h-16 w-16" />
                </div>
              </CardContent>
            </Card>

            {/* Active Providers */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-600 to-purple-700 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-100 flex items-center font-manrope">
                  <Building2 className="h-4 w-4 mr-2" />
                  Active Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 font-manrope">{formatNumber(currentMetrics.activeProviders)}</div>
                <div className="flex items-center text-sm text-purple-100">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+{currentMetrics.providersChange} new {selectedTimeframe === 'today' ? 'today' : `this ${selectedTimeframe}`}</span>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Building2 className="h-16 w-16" />
                </div>
              </CardContent>
            </Card>

            {/* New Patients */}
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-accent to-yellow-600 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-100 flex items-center font-manrope">
                  <Users className="h-4 w-4 mr-2" />
                  New Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2 font-manrope">{formatNumber(currentMetrics.newPatients)}</div>
                <div className="flex items-center text-sm text-yellow-100">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>+{currentMetrics.patientsChange}% {getTimeframeSuffix()}</span>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Users className="h-16 w-16" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {/* Platform Health Score */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-primary flex items-center font-manrope">
                  <Activity className="h-5 w-5 mr-2" />
                  Platform Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2 font-manrope">{currentMetrics.platformHealth}/100</div>
                    <Badge variant="outline" className="text-green-600 border-green-600">Excellent</Badge>
                  </div>
                  <Progress value={currentMetrics.platformHealth} className="h-3" />
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>System Uptime</span>
                      <span className="font-medium">99.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Performance</span>
                      <span className="font-medium">98ms avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Satisfaction</span>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Metrics */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-primary flex items-center font-manrope">
                  <Target className="h-5 w-5 mr-2" />
                  Conversion Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2 font-manrope">{currentMetrics.conversionRate}%</div>
                    <Badge variant="outline" className="text-green-600 border-green-600">Above Target</Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Search to View</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>View to Book</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guest vs Registered</span>
                      <span className="font-medium">60% / 40%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Average Booking Value */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-primary flex items-center font-manrope">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Avg Scan Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2 font-manrope">{formatCurrency(currentMetrics.avgBookingValue)}</div>
                    <Badge variant="outline" className="text-green-600 border-green-600">+8% vs target</Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>MRI Scans</span>
                      <span className="font-medium">$685</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CT Scans</span>
                      <span className="font-medium">$425</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ultrasound</span>
                      <span className="font-medium">$285</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Geographic Performance & Executive Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            {/* Top Markets */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-primary flex items-center justify-between font-manrope">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Top Performing Markets
                  </div>
                  <Button variant="outline" size="sm">
                    View All Markets
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { market: 'Miami-Dade, FL', bookings: 142, growth: 28, gmv: 89400 },
                    { market: 'Los Angeles, CA', bookings: 118, growth: 22, gmv: 76500 },
                    { market: 'Houston, TX', bookings: 94, growth: 15, gmv: 58200 },
                    { market: 'Phoenix, AZ', bookings: 87, growth: 31, gmv: 52800 },
                    { market: 'Atlanta, GA', bookings: 73, growth: 18, gmv: 45100 }
                  ].map((market, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-backgroundAlt transition-colors cursor-pointer">
                      <div>
                        <div className="font-medium text-primary font-manrope">{market.market}</div>
                        <div className="text-sm text-gray-600">{market.bookings} scans • {formatCurrency(market.gmv)} revenue</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          +{market.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Executive Quick Actions */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-primary flex items-center font-manrope">
                  <Star className="h-5 w-5 mr-2" />
                  Executive Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-between bg-gradient-to-r from-primary to-blue-800 hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <div className="text-left">
                      <div className="font-medium font-manrope">Generate Board Report</div>
                      <div className="text-sm text-blue-100">Monthly KPI summary with insights</div>
                    </div>
                    <BarChart3 className="h-5 w-5" />
                  </Button>
                  <Button 
                    className="w-full justify-between bg-gradient-to-r from-accent to-yellow-600 hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <div className="text-left">
                      <div className="font-medium font-manrope">Market Expansion Analysis</div>
                      <div className="text-sm text-yellow-100">Identify high-opportunity regions</div>
                    </div>
                    <Globe className="h-5 w-5" />
                  </Button>
                  <Button 
                    className="w-full justify-between bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <div className="text-left">
                      <div className="font-medium font-manrope">Provider Network Review</div>
                      <div className="text-sm text-green-100">Capacity optimization opportunities</div>
                    </div>
                    <Building2 className="h-5 w-5" />
                  </Button>
                  <Button 
                    className="w-full justify-between bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-lg transition-all"
                    size="lg"
                  >
                    <div className="text-left">
                      <div className="font-medium font-manrope">Competitive Intelligence</div>
                      <div className="text-sm text-purple-100">RadNet & SimonMed analysis</div>
                    </div>
                    <Shield className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Device & Platform Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#003087] flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Mobile Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#003087] mb-2">67%</div>
                  <div className="text-sm text-gray-600">of all bookings</div>
                  <Progress value={67} className="mt-3 h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#003087] flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Desktop Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#003087] mb-2">33%</div>
                  <div className="text-sm text-gray-600">of all bookings</div>
                  <Progress value={33} className="mt-3 h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#003087] flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Avg Session Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#003087] mb-2">8:42</div>
                  <div className="text-sm text-gray-600">minutes per session</div>
                  <Badge variant="outline" className="mt-2 text-green-600 border-green-600">+15% vs industry</Badge>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default CorporateDashboardSystem;