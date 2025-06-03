import React, { useState } from 'react';

const PatientReferralsSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('email');
  const [referralEmail, setReferralEmail] = useState('');
  const [referralName, setReferralName] = useState('');

  // Mock referrals data
  const mockReferralsData = {
    stats: {
      totalReferrals: 7,
      activeReferrals: 2,
      completedReferrals: 5,
      totalEarned: 200,
      availableCredit: 100,
      nextMilestone: 10,
      nextReward: 100,
      currentTier: "Silver",
      lifetimeValue: 350,
      monthlyReferrals: 2,
      conversionRate: 71,
    },
    progress: {
      current: 2,
      target: 5,
      percentage: 40,
      nextRewardAmount: 100,
      rewardsEarned: [
        {
          milestone: 5,
          amount: 100,
          dateEarned: "2025-04-15",
          status: "claimed",
        },
        {
          milestone: 10,
          amount: 100,
          dateEarned: "2025-03-10",
          status: "claimed",
        },
      ],
    },
    referrals: [
      {
        id: 1,
        friendName: "Jennifer Martinez",
        friendEmail: "jennifer.m@email.com",
        dateSent: "2025-05-20",
        status: "completed",
        appointmentDate: "2025-05-25",
        scanType: "Knee MRI",
        provider: "Advanced Imaging Center of Davie",
        rewardEarned: 50,
        rewardStatus: "pending",
        friendSavings: 320,
        notes: "Referred for sports injury follow-up",
      },
      {
        id: 2,
        friendName: "Michael Rodriguez",
        friendEmail: "mike.rodriguez@email.com",
        dateSent: "2025-05-15",
        status: "scheduled",
        appointmentDate: "2025-06-08",
        scanType: "Brain MRI",
        provider: "Precision Imaging Coral Springs",
        estimatedReward: 50,
        estimatedSavings: 420,
        notes: "Colleague needing neurological imaging",
      },
      {
        id: 3,
        friendName: "Lisa Thompson",
        friendEmail: "lisa.thompson@email.com",
        dateSent: "2025-05-10",
        status: "pending",
        remindersSent: 2,
        lastReminder: "2025-05-18",
        notes: "Friend interested in preventive screening",
      },
      {
        id: 4,
        friendName: "David Chen",
        friendEmail: "david.chen@email.com",
        dateSent: "2025-04-20",
        status: "completed",
        appointmentDate: "2025-04-28",
        scanType: "Chest CT",
        provider: "South Florida Diagnostic Center",
        rewardEarned: 50,
        rewardStatus: "claimed",
        friendSavings: 290,
        notes: "Family member - routine check-up",
      },
      {
        id: 5,
        friendName: "Sarah Wilson",
        friendEmail: "sarah.wilson@email.com",
        dateSent: "2025-04-05",
        status: "completed",
        appointmentDate: "2025-04-15",
        scanType: "Abdominal Ultrasound",
        provider: "South Florida Diagnostic Center",
        rewardEarned: 50,
        rewardStatus: "claimed",
        friendSavings: 185,
        notes: "Neighbor needing diagnostic imaging",
      },
    ],
    rewards: [
      {
        id: 1,
        type: "milestone_bonus",
        amount: 100,
        description: "5 successful referrals milestone",
        dateEarned: "2025-04-15",
        status: "claimed",
        claimDate: "2025-04-16",
      },
      {
        id: 2,
        type: "referral_bonus",
        amount: 50,
        description: "Jennifer Martinez completed appointment",
        dateEarned: "2025-05-25",
        status: "pending",
      },
      {
        id: 3,
        type: "loyalty_bonus",
        amount: 25,
        description: "Monthly activity bonus",
        dateEarned: "2025-05-01",
        status: "claimed",
        claimDate: "2025-05-02",
      },
    ],
    milestones: [
      {
        count: 1,
        reward: 25,
        status: "completed",
        description: "First referral bonus",
      },
      {
        count: 5,
        reward: 100,
        status: "completed",
        description: "High-five milestone",
      },
      {
        count: 10,
        reward: 150,
        status: "current",
        description: "Perfect ten bonus",
      },
      {
        count: 25,
        reward: 300,
        status: "upcoming",
        description: "Super referrer status",
      },
      {
        count: 50,
        reward: 500,
        status: "upcoming",
        description: "Ultimate advocate",
      },
    ],
    socialSharing: {
      referralCode: "SARAH2025",
      personalLink: "https://usrad.com/ref/SARAH2025",
      shareTemplates: [
        {
          platform: "email",
          subject: "Save big on medical imaging with USRad",
          message: "I've been using USRad for my medical imaging needs and have saved over $2,800 compared to hospital prices! Use my referral link to get started and we both earn $50 credit.",
        },
        {
          platform: "text",
          message: "Check out USRad - I've saved $2,800+ on medical imaging! Use my link to save money and we both get $50 credit: https://usrad.com/ref/SARAH2025",
        },
        {
          platform: "social",
          message: "Just saved another $420 on my Brain MRI with @USRad! 68% off hospital prices. Use my referral link and we both earn $50 credit! #HealthcareSavings #USRad",
        },
      ],
    },
    leaderboard: [
      { rank: 1, name: "Amanda K.", referrals: 23, earnings: 950, badge: "Gold" },
      { rank: 2, name: "Michael R.", referrals: 18, earnings: 725, badge: "Silver" },
      { rank: 3, name: "Jennifer L.", referrals: 15, earnings: 625, badge: "Silver" },
      { rank: 4, name: "You", referrals: 7, earnings: 200, badge: "Bronze" },
      { rank: 5, name: "David M.", referrals: 6, earnings: 175, badge: "Bronze" },
    ],
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'referrals', name: 'My Referrals', icon: '👥' },
    { id: 'rewards', name: 'Rewards', icon: '🎁' },
    { id: 'share', name: 'Share & Earn', icon: '🔗' },
    { id: 'leaderboard', name: 'Leaderboard', icon: '🏆' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRewardStatusColor = (status) => {
    switch (status) {
      case 'claimed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatus = (milestone) => {
    if (milestone.status === 'completed') return 'bg-green-100 border-green-300 text-green-800';
    if (milestone.status === 'current') return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-gray-100 border-gray-300 text-gray-600';
  };

  const handleSendReferral = () => {
    if (referralEmail && referralName) {
      alert(`Referral sent to ${referralName} (${referralEmail})! They'll receive an email with your referral link.`);
      setReferralEmail('');
      setReferralName('');
      setShareModalOpen(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockReferralsData.socialSharing.personalLink);
    alert('Referral link copied to clipboard!');
  };

  const handleSocialShare = (platform) => {
    const template = mockReferralsData.socialSharing.shareTemplates.find(t => t.platform === platform);
    if (template) {
      if (platform === 'email') {
        window.location.href = `mailto:?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.message)}`;
      } else {
        alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} sharing would open here with: ${template.message}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Referrals Header */}
      <div className="usrad-card p-8 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Program</h1>
            <p className="text-gray-600 text-lg">Earn rewards by helping friends save on medical imaging</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">$50 per successful referral</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Milestone bonuses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-gray-600 text-sm">Easy sharing tools</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">${mockReferralsData.stats.totalEarned}</div>
              <div className="text-gray-600 text-sm">Total Earned</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">{mockReferralsData.stats.totalReferrals}</div>
              <div className="text-gray-600 text-sm">Total Referrals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="usrad-card p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Progress Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Progress</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Progress to next milestone</span>
                    <span className="font-bold text-blue-600">{mockReferralsData.progress.current}/{mockReferralsData.progress.target} referrals</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div className="bg-blue-600 h-4 rounded-full transition-all duration-300" style={{width: `${mockReferralsData.progress.percentage}%`}}></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {mockReferralsData.progress.target - mockReferralsData.progress.current} more referrals to earn ${mockReferralsData.progress.nextRewardAmount}!
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                    <div className="text-2xl font-bold text-green-600">{mockReferralsData.stats.completedReferrals}</div>
                    <div className="text-green-700 text-sm">Completed</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockReferralsData.stats.activeReferrals}</div>
                    <div className="text-blue-700 text-sm">Active</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center">
                    <div className="text-2xl font-bold text-yellow-600">${mockReferralsData.stats.availableCredit}</div>
                    <div className="text-yellow-700 text-sm">Available Credit</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
                    <div className="text-2xl font-bold text-purple-600">{mockReferralsData.stats.conversionRate}%</div>
                    <div className="text-purple-700 text-sm">Conversion Rate</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-xl text-white">
                  <h4 className="font-semibold mb-2">🎯 Quick Referral</h4>
                  <p className="text-sm opacity-90 mb-4">Send a referral link to a friend</p>
                  <button
                    onClick={() => setShareModalOpen(true)}
                    className="w-full bg-white text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Refer a Friend
                  </button>
                </div>
                <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-xl text-white">
                  <h4 className="font-semibold mb-2">💰 Current Tier</h4>
                  <p className="text-2xl font-bold">{mockReferralsData.stats.currentTier}</p>
                  <p className="text-sm opacity-90">Member Status</p>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Referral Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {mockReferralsData.milestones.map((milestone) => (
                  <div
                    key={milestone.count}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${getMilestoneStatus(milestone)}`}
                  >
                    <div className="text-2xl mb-2">
                      {milestone.status === 'completed' ? '✅' : 
                       milestone.status === 'current' ? '🎯' : '⭐'}
                    </div>
                    <div className="text-lg font-bold">{milestone.count}</div>
                    <div className="text-sm">Referrals</div>
                    <div className="text-xs mt-2 font-medium">${milestone.reward} reward</div>
                    <div className="text-xs mt-1">{milestone.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">My Referrals</h3>
              <button
                onClick={() => setShareModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + Send New Referral
              </button>
            </div>

            <div className="space-y-4">
              {mockReferralsData.referrals.map((referral) => (
                <div key={referral.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{referral.friendName}</h4>
                      <p className="text-gray-600">{referral.friendEmail}</p>
                      <p className="text-sm text-gray-500">Sent: {new Date(referral.dateSent).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(referral.status)}`}>
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </div>

                  {referral.appointmentDate && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-600">Appointment:</span>
                        <p className="font-medium">{new Date(referral.appointmentDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Scan Type:</span>
                        <p className="font-medium">{referral.scanType}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Provider:</span>
                        <p className="font-medium">{referral.provider}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-6">
                      {referral.rewardEarned && (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Your Reward</div>
                          <div className="font-bold text-green-600">${referral.rewardEarned}</div>
                          <div className={`text-xs px-2 py-1 rounded ${getRewardStatusColor(referral.rewardStatus)}`}>
                            {referral.rewardStatus}
                          </div>
                        </div>
                      )}
                      {referral.friendSavings && (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Friend Saved</div>
                          <div className="font-bold text-blue-600">${referral.friendSavings}</div>
                        </div>
                      )}
                      {referral.estimatedReward && (
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Estimated Reward</div>
                          <div className="font-bold text-yellow-600">${referral.estimatedReward}</div>
                        </div>
                      )}
                    </div>
                    
                    {referral.status === 'pending' && (
                      <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                        Send Reminder
                      </button>
                    )}
                  </div>

                  {referral.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-800">{referral.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Rewards & Earnings</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">${mockReferralsData.stats.availableCredit}</div>
                <div className="text-sm text-gray-600">Available to Use</div>
              </div>
            </div>

            <div className="space-y-4">
              {mockReferralsData.rewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">
                        {reward.type === 'milestone_bonus' ? '🎯' :
                         reward.type === 'referral_bonus' ? '👥' :
                         reward.type === 'loyalty_bonus' ? '⭐' : '💰'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">${reward.amount} {reward.type.replace('_', ' ')}</h4>
                      <p className="text-gray-600 text-sm">{reward.description}</p>
                      <p className="text-xs text-gray-500">Earned: {new Date(reward.dateEarned).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRewardStatusColor(reward.status)}`}>
                      {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                    </span>
                    {reward.claimDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Claimed: {new Date(reward.claimDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share & Earn Tab */}
        {activeTab === 'share' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share Your Referral Link</h3>
              <p className="text-gray-600 mb-6">
                Share your unique link and earn $50 for every friend who books their first scan
              </p>
            </div>

            {/* Referral Link */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Link</label>
              <div className="flex">
                <input
                  type="text"
                  value={mockReferralsData.socialSharing.personalLink}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg bg-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  📋 Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your referral code: <span className="font-mono font-semibold">{mockReferralsData.socialSharing.referralCode}</span>
              </p>
            </div>

            {/* Social Sharing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleSocialShare('email')}
                className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">📧</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <p className="text-sm text-gray-600">Send personalized emails to friends</p>
              </button>

              <button
                onClick={() => handleSocialShare('text')}
                className="p-6 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">💬</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Text Message</h4>
                <p className="text-sm text-gray-600">Share via SMS or messaging apps</p>
              </button>

              <button
                onClick={() => handleSocialShare('social')}
                className="p-6 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">📱</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                <p className="text-sm text-gray-600">Post to Facebook, Twitter, etc.</p>
              </button>
            </div>

            {/* Manual Referral */}
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-4">Send Direct Referral</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Friend's name"
                  value={referralName}
                  onChange={(e) => setReferralName(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Friend's email"
                  value={referralEmail}
                  onChange={(e) => setReferralEmail(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleSendReferral}
                className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                Send Referral
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Referral Leaderboard</h3>
              <p className="text-gray-600">See how you rank among our top referrers</p>
            </div>

            <div className="space-y-4">
              {mockReferralsData.leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-6 rounded-xl border-2 ${
                    entry.name === 'You' 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
                      entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {entry.rank === 1 ? '🥇' :
                       entry.rank === 2 ? '🥈' :
                       entry.rank === 3 ? '🥉' :
                       entry.rank}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${entry.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                        {entry.name}
                      </h4>
                      <p className="text-sm text-gray-600">{entry.badge} Member</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{entry.referrals} referrals</div>
                    <div className="text-sm text-green-600">${entry.earnings} earned</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send Referral</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Friend's name"
                value={referralName}
                onChange={(e) => setReferralName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Friend's email"
                value={referralEmail}
                onChange={(e) => setReferralEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSendReferral}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Referral
                </button>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientReferralsSystem;