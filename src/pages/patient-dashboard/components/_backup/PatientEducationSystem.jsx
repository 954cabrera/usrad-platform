import React, { useState } from 'react';

const PatientEducationSystem = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeContentType, setActiveContentType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock education data
  const mockEducationData = {
    stats: {
      articlesRead: 12,
      videosWatched: 8,
      coursesCompleted: 2,
      totalProgress: 65,
      streakDays: 7,
      pointsEarned: 340,
      certificatesEarned: 1
    },
    featured: [
      {
        id: 1,
        type: "article",
        title: "Preparing for Your First MRI: A Complete Guide",
        description: "Everything you need to know before your MRI appointment, from what to expect to preparation tips.",
        readTime: "8 min read",
        category: "preparation",
        author: "Dr. Jennifer Martinez, MD",
        publishDate: "2025-05-28",
        featured: true,
        difficulty: "beginner",
        tags: ["MRI", "preparation", "anxiety", "safety"],
        thumbnail: "/images/education/mri-guide.jpg",
        progress: 0
      },
      {
        id: 2,
        type: "video",
        title: "Understanding Your CT Scan Results",
        description: "Learn how to read and understand your CT scan report with explanations from radiologists.",
        duration: "12 minutes",
        category: "understanding_results",
        author: "Dr. Robert Chen, MD",
        publishDate: "2025-05-25",
        featured: true,
        difficulty: "intermediate",
        tags: ["CT scan", "results", "radiology", "interpretation"],
        thumbnail: "/images/education/ct-results.jpg",
        progress: 75
      },
      {
        id: 3,
        type: "course",
        title: "Medical Imaging Basics Certificate Course",
        description: "Comprehensive course covering all major imaging modalities and when they're used.",
        estimatedTime: "2 hours",
        category: "comprehensive",
        author: "USRad Education Team",
        publishDate: "2025-05-20",
        featured: true,
        difficulty: "intermediate",
        modules: 8,
        completedModules: 3,
        certificateAvailable: true,
        tags: ["imaging", "education", "certificate", "comprehensive"],
        thumbnail: "/images/education/imaging-basics.jpg",
        progress: 38
      }
    ],
    categories: [
      {
        id: "preparation",
        name: "Scan Preparation",
        description: "How to prepare for different types of imaging scans",
        icon: "📋",
        color: "blue",
        articleCount: 15,
        popular: true
      },
      {
        id: "understanding_results",
        name: "Understanding Results",
        description: "Learn to interpret your imaging reports and results",
        icon: "🔍",
        color: "green",
        articleCount: 12,
        popular: true
      },
      {
        id: "safety",
        name: "Safety & Contrast",
        description: "Important safety information and contrast agent details",
        icon: "🛡️",
        color: "red",
        articleCount: 8,
        popular: false
      },
      {
        id: "conditions",
        name: "Medical Conditions",
        description: "How different conditions are diagnosed through imaging",
        icon: "🩺",
        color: "purple",
        articleCount: 20,
        popular: true
      },
      {
        id: "technology",
        name: "Imaging Technology",
        description: "Learn about different imaging technologies and equipment",
        icon: "⚙️",
        color: "indigo",
        articleCount: 10,
        popular: false
      },
      {
        id: "billing",
        name: "Insurance & Billing",
        description: "Understanding healthcare costs and insurance coverage",
        icon: "💳",
        color: "yellow",
        articleCount: 6,
        popular: false
      }
    ],
    recentContent: [
      {
        id: 4,
        type: "article",
        title: "What to Expect During a Breast MRI",
        description: "Comprehensive guide to breast MRI procedures and preparation",
        readTime: "6 min read",
        category: "preparation",
        publishDate: "2025-05-30",
        progress: 100,
        completed: true,
        author: "Dr. Sarah Kim, MD",
        difficulty: "beginner"
      },
      {
        id: 5,
        type: "video",
        title: "Reducing Anxiety Before Medical Imaging",
        description: "Techniques and tips for managing scan anxiety",
        duration: "8 minutes",
        category: "wellness",
        publishDate: "2025-05-28",
        progress: 50,
        author: "Dr. Amanda Wilson, MD",
        difficulty: "beginner"
      },
      {
        id: 6,
        type: "article",
        title: "Contrast Agents: Types and Safety Information",
        description: "Everything you need to know about imaging contrast materials",
        readTime: "10 min read",
        category: "safety",
        publishDate: "2025-05-26",
        progress: 0,
        author: "Dr. Michael Thompson, MD",
        difficulty: "intermediate"
      },
      {
        id: 7,
        type: "course",
        title: "MRI Safety Fundamentals",
        description: "Essential safety knowledge for MRI procedures",
        estimatedTime: "45 minutes",
        category: "safety",
        publishDate: "2025-05-24",
        progress: 25,
        modules: 4,
        completedModules: 1,
        author: "USRad Safety Team",
        difficulty: "beginner"
      }
    ],
    myProgress: [
      {
        contentId: 3,
        title: "Medical Imaging Basics Certificate Course",
        type: "course",
        progress: 38,
        lastAccessed: "2025-05-29",
        estimatedTimeRemaining: "1.2 hours",
        nextModule: "CT Scan Fundamentals"
      },
      {
        contentId: 2,
        title: "Understanding Your CT Scan Results",
        type: "video",
        progress: 75,
        lastAccessed: "2025-05-27",
        estimatedTimeRemaining: "3 minutes"
      }
    ],
    achievements: [
      {
        id: 1,
        title: "First Article",
        description: "Read your first educational article",
        icon: "📖",
        dateEarned: "2025-04-15",
        points: 10
      },
      {
        id: 2,
        title: "Week Streak",
        description: "Engaged with education content for 7 consecutive days",
        icon: "📅",
        dateEarned: "2025-05-28",
        points: 50
      },
      {
        id: 3,
        title: "Course Graduate",
        description: "Completed your first certificate course",
        icon: "🎓",
        dateEarned: "2025-04-30",
        points: 100
      }
    ]
  };

  const contentTypes = [
    { id: 'all', name: "All Content", count: 45 },
    { id: 'article', name: "Articles", count: 28 },
    { id: 'video', name: "Videos", count: 12 },
    { id: 'course', name: "Courses", count: 5 }
  ];

  const allContent = [...mockEducationData.featured, ...mockEducationData.recentContent];

  const filteredContent = allContent.filter(content => {
    const matchesType = activeContentType === 'all' || content.type === activeContentType;
    const matchesCategory = activeCategory === 'all' || content.category === activeCategory;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return '📖';
      case 'video': return '🎥';
      case 'course': return '🎓';
      default: return '📄';
    }
  };

  const getCategoryColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };
    return colors[color] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const handleContentClick = (content) => {
    alert(`Opening: ${content.title}\n\nThis would start the ${content.type} content.`);
  };

  return (
    <div className="space-y-8">
      {/* Education Header */}
      <div className="usrad-card p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Education Center</h1>
            <p className="text-gray-600 text-lg">Learn about medical imaging and take control of your health journey</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Expert-reviewed content</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Interactive learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Earn certificates</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{mockEducationData.stats.totalProgress}%</div>
              <div className="text-gray-600 text-sm">Learning Progress</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{mockEducationData.stats.pointsEarned}</div>
              <div className="text-gray-600 text-sm">Points Earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="usrad-card p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">📖</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockEducationData.stats.articlesRead}</div>
          <div className="text-gray-600 text-sm">Articles Read</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🎥</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockEducationData.stats.videosWatched}</div>
          <div className="text-gray-600 text-sm">Videos Watched</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🎓</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockEducationData.stats.coursesCompleted}</div>
          <div className="text-gray-600 text-sm">Courses Completed</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🔥</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockEducationData.stats.streakDays}</div>
          <div className="text-gray-600 text-sm">Day Streak</div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="usrad-card p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Browse by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEducationData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${getCategoryColor(category.color)} ${
                activeCategory === category.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{category.icon}</span>
                {category.popular && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                    Popular
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className="text-xs font-medium">
                {category.articleCount} articles available
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="usrad-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, videos, and courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveContentType(type.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeContentType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{type.name}</span>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{type.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Content List */}
        <div className="xl:col-span-3">
          <div className="usrad-card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {activeCategory === 'all' ? 'All Content' : 
                 mockEducationData.categories.find(c => c.id === activeCategory)?.name || 'Content'}
              </h3>
              <p className="text-gray-600 mt-1">
                {filteredContent.length} item{filteredContent.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredContent.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse different categories
                  </p>
                </div>
              ) : (
                filteredContent.map((content) => (
                  <div key={content.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{getTypeIcon(content.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                              onClick={() => handleContentClick(content)}>
                            {content.title}
                          </h4>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(content.difficulty)}`}>
                              {content.difficulty}
                            </span>
                            {content.featured && (
                              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-semibold">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{content.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>By {content.author}</span>
                            <span>•</span>
                            <span>{new Date(content.publishDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>
                              {content.readTime || content.duration || 
                               (content.estimatedTime && `${content.estimatedTime} course`) || 
                               'Quick read'}
                            </span>
                            {content.modules && (
                              <>
                                <span>•</span>
                                <span>{content.modules} modules</span>
                              </>
                            )}
                          </div>
                          
                          {content.progress !== undefined && (
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                  style={{width: `${content.progress}%`}}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{content.progress}%</span>
                            </div>
                          )}
                        </div>

                        {content.tags && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {content.tags.map((tag) => (
                              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Continue Learning */}
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h3>
            <div className="space-y-4">
              {mockEducationData.myProgress.map((item) => (
                <div key={item.contentId} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-2">{item.title}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{width: `${item.progress}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-blue-700">{item.progress}%</span>
                  </div>
                  <div className="text-xs text-blue-600">
                    <p>Last accessed: {new Date(item.lastAccessed).toLocaleDateString()}</p>
                    <p>Time remaining: {item.estimatedTimeRemaining}</p>
                    {item.nextModule && <p>Next: {item.nextModule}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              {mockEducationData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{achievement.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-yellow-600">+{achievement.points} points</span>
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.dateEarned).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-left">
                📖 Browse All Articles
              </button>
              <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-left">
                🎥 Watch Featured Videos
              </button>
              <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-left">
                🎓 Start a Certificate Course
              </button>
              <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-left">
                📧 Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEducationSystem;