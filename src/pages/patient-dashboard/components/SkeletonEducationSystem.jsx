// /src/pages/patient-dashboard/components/SkeletonEducationSystem.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Award, Star, Clock, Users, Search, Filter, CheckCircle } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-10 bg-gray-300 rounded-lg w-72 mb-3 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded-lg w-96 animate-pulse"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded-lg w-48 animate-pulse"></div>
      </div>
    </div>

    {/* Progress Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="usrad-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gray-300 h-2 rounded-full w-3/4 animate-pulse"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      ))}
    </div>

    {/* Categories Skeleton */}
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 bg-gray-200 rounded-full w-32 flex-shrink-0 animate-pulse"></div>
      ))}
    </div>

    {/* Content Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="usrad-card p-6">
          <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded-full w-20 animate-pulse"></div>
          </div>
        </div>
      ))}
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

const SkeletonEducationSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const categories = ['all', 'preparation', 'safety', 'results', 'technology'];
  
  const courses = [
    {
      id: 1,
      title: 'MRI Preparation Guide',
      description: 'Complete guide to preparing for your MRI scan',
      category: 'preparation',
      duration: '15 min',
      type: 'video',
      progress: 100,
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      title: 'Understanding CT Scan Results',
      description: 'Learn how to read and understand your CT scan reports',
      category: 'results',
      duration: '20 min',
      type: 'article',
      progress: 60,
      rating: 4.9,
      students: 890
    },
    {
      id: 3,
      title: 'Radiation Safety in Medical Imaging',
      description: 'Everything you need to know about radiation safety',
      category: 'safety',
      duration: '12 min',
      type: 'video',
      progress: 0,
      rating: 4.7,
      students: 2100
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
        .usrad-gold { color: #cc9933; }
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
        .usrad-gradient-gold { background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%); }
      `}</style>

      {/* Header */}
      <div className="usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">Health Education Center</h1>
              <p className="text-blue-100 text-xl">Learn about medical imaging and prepare for your scans</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">
              <Award className="w-5 h-5 mr-2 inline" />
              View Certificates
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="usrad-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold usrad-navy">Courses Completed</h3>
            <span className="text-2xl font-bold usrad-gold">3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="usrad-gradient-gold h-2 rounded-full" style={{width: '60%'}}></div>
          </div>
          <p className="text-sm text-gray-600">3 of 5 courses</p>
        </div>
        <div className="usrad-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold usrad-navy">Learning Time</h3>
            <span className="text-2xl font-bold text-blue-600">2.5h</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
          <p className="text-sm text-gray-600">This month</p>
        </div>
        <div className="usrad-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold usrad-navy">Certificates Earned</h3>
            <span className="text-2xl font-bold text-green-600">2</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-green-500 h-2 rounded-full" style={{width: '40%'}}></div>
          </div>
          <p className="text-sm text-gray-600">Patient Safety, MRI Prep</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="usrad-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, articles, or videos..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
              activeCategory === category
                ? 'usrad-gradient-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="usrad-card p-6 hover:shadow-xl transition-all duration-300">
            <div className="relative">
              <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                {course.type === 'video' ? (
                  <Play className="w-12 h-12 text-blue-600" />
                ) : (
                  <BookOpen className="w-12 h-12 text-purple-600" />
                )}
              </div>
              {course.progress > 0 && (
                <div className="absolute top-2 right-2">
                  {course.progress === 100 ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <div className="bg-white rounded-full p-1 shadow-sm">
                      <div className="w-4 h-4 bg-blue-200 rounded-full relative">
                        <div 
                          className="absolute inset-0 bg-blue-600 rounded-full"
                          style={{
                            background: `conic-gradient(#2563eb ${course.progress * 3.6}deg, #e5e7eb 0deg)`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-bold usrad-navy mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>

            {course.progress > 0 && course.progress < 100 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{width: `${course.progress}%`}}
                  ></div>
                </div>
              </div>
            )}

            <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              course.progress === 100
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : course.progress > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start Course'}
            </button>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Your Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Award className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="font-semibold text-yellow-800">MRI Preparation Expert</div>
              <div className="text-yellow-700 text-sm">Completed MRI preparation course</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Award className="w-8 h-8 text-green-600" />
            <div>
              <div className="font-semibold text-green-800">Safety First</div>
              <div className="text-green-700 text-sm">Completed radiation safety course</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
            <Award className="w-8 h-8 text-gray-400" />
            <div>
              <div className="font-semibold text-gray-600">CT Scan Specialist</div>
              <div className="text-gray-500 text-sm">Complete CT scan course to unlock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonEducationSystem;