// /src/pages/patient-dashboard/components/SkeletonReferralsSystem.jsx
import React, { useState, useEffect } from 'react';
import { Users, Share, Trophy, Gift, Copy, Facebook, Twitter, Mail, Star } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="text-center">
        <div className="h-10 bg-gray-300 rounded-lg w-72 mx-auto mb-3 animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded-lg w-96 mx-auto animate-pulse"></div>
      </div>
    </div>

    {/* Progress Card Skeleton */}
    <div className="usrad-card p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
        <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="bg-gray-300 h-4 rounded-full w-2/5 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-8 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Share Section Skeleton */}
    <div className="usrad-card p-6">
      <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        ))}
      </div>
    </div>

    {/* Friends List Skeleton */}
    <div className="usrad-card p-6">
      <div className="h-6 bg-gray-300 rounded w-40 mb-4 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
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

const SkeletonReferralsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [referralCode, setReferralCode] = useState('SARAH2024');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const friends = [
    { name: 'Jessica Miller', status: 'Signed Up', earnings: '$25', avatar: '👩' },
    { name: 'Mike Rodriguez', status: 'First Scan', earnings: '$50', avatar: '👨' },
    { name: 'Anna Chen', status: 'Pending', earnings: '$0', avatar: '👩' }
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
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Referral Rewards Program</h1>
          <p className="text-blue-100 text-xl">Share USRad with friends and earn credits for every successful referral</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="usrad-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold usrad-navy">Your Progress</h3>
          <div className="text-right">
            <div className="text-3xl font-bold usrad-gold">$75</div>
            <div className="text-gray-600">Credits Earned</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">2 of 5 referrals to $100 credit</span>
            <span className="text-sm text-gray-600">3 more to go!</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="usrad-gradient-gold h-4 rounded-full transition-all duration-1000" style={{width: '40%'}}></div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                i <= 2 ? 'usrad-gradient-gold text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {i <= 2 ? '✓' : i}
              </div>
              <div className="text-xs text-gray-600">
                {i <= 2 ? '$25' : '$25'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-800">🎉 Almost There!</div>
            <div className="text-yellow-700">Refer 3 more friends to unlock your $100 credit bonus!</div>
          </div>
        </div>
      </div>

      {/* Share Your Code */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Share Your Referral Code</h3>
        <div className="flex items-center space-x-4 mb-4">
          <input 
            type="text" 
            value={referralCode}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg font-mono text-lg font-bold text-center"
          />
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center">
            <Copy className="w-5 h-5 mr-2" />
            Copy
          </button>
        </div>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <Facebook className="w-5 h-5 mr-2" />
            Facebook
          </button>
          <button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <Twitter className="w-5 h-5 mr-2" />
            Twitter
          </button>
          <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2" />
            Email
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center">
            <Share className="w-5 h-5 mr-2" />
            More
          </button>
        </div>
      </div>

      {/* Your Referrals */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Your Referrals</h3>
        <div className="space-y-4">
          {friends.map((friend, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                  {friend.avatar}
                </div>
                <div>
                  <div className="font-semibold">{friend.name}</div>
                  <div className="text-sm text-gray-600">{friend.status}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold usrad-gold">{friend.earnings}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  friend.status === 'First Scan' ? 'bg-green-100 text-green-800' :
                  friend.status === 'Signed Up' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {friend.status}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {friends.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <div className="text-gray-600">No referrals yet</div>
            <div className="text-sm text-gray-500">Share your code to start earning!</div>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Community Leaderboard</h3>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'Maria G.', referrals: 12, badge: '🥇' },
            { rank: 2, name: 'John D.', referrals: 8, badge: '🥈' },
            { rank: 3, name: 'Sarah J.', referrals: 6, badge: '🥉' },
            { rank: 4, name: 'You', referrals: 2, badge: '⭐' }
          ].map((user) => (
            <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${
              user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{user.badge}</span>
                <div>
                  <div className={`font-semibold ${user.name === 'You' ? 'usrad-navy' : ''}`}>
                    #{user.rank} {user.name}
                  </div>
                  <div className="text-sm text-gray-600">{user.referrals} successful referrals</div>
                </div>
              </div>
              {user.name === 'You' && (
                <Trophy className="w-6 h-6 usrad-gold" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="usrad-card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <h3 className="text-xl font-bold usrad-navy mb-4">How Referrals Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 usrad-gradient-navy rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">1</div>
            <h4 className="font-semibold mb-2">Share Your Code</h4>
            <p className="text-sm text-gray-600">Send your unique referral code to friends and family</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 usrad-gradient-gold rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">2</div>
            <h4 className="font-semibold mb-2">They Book & Save</h4>
            <p className="text-sm text-gray-600">Your friends get their first scan and save money</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">3</div>
            <h4 className="font-semibold mb-2">You Earn Credits</h4>
            <p className="text-sm text-gray-600">Get $25 credit for each successful referral</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonReferralsSystem;