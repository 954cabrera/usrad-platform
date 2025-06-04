// /src/pages/patient-dashboard/components/SkeletonBillingSystem.jsx
import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Receipt, Download, TrendingUp, Calendar, Plus, Settings } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-10 bg-gray-300 rounded-lg w-64 mb-3 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded-lg w-80 animate-pulse"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded-lg w-40 animate-pulse"></div>
      </div>
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="usrad-card p-6 text-center">
          <div className="h-8 bg-gray-300 rounded w-16 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-1 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>

    {/* Payment Methods Skeleton */}
    <div className="usrad-card p-6">
      <div className="h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Transactions Skeleton */}
    <div className="usrad-card p-6">
      <div className="h-6 bg-gray-300 rounded w-40 mb-4 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-300 rounded w-16 mb-1 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
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

const SkeletonBillingSystem = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

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
              <h1 className="text-4xl font-bold mb-3">Billing & Payments</h1>
              <p className="text-blue-100 text-xl">Manage your payments and track your healthcare savings</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5 mr-2 inline" />
              Add Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">$2,340</div>
          <div className="text-gray-700 font-medium mb-1">Total Saved</div>
          <div className="text-gray-500 text-sm">vs. hospital pricing</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold usrad-navy mb-2">$890</div>
          <div className="text-gray-700 font-medium mb-1">This Year</div>
          <div className="text-gray-500 text-sm">Total spent</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold usrad-gold mb-2">3</div>
          <div className="text-gray-700 font-medium mb-1">Transactions</div>
          <div className="text-gray-500 text-sm">Completed payments</div>
        </div>
        <div className="usrad-card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">$0</div>
          <div className="text-gray-700 font-medium mb-1">Outstanding</div>
          <div className="text-gray-500 text-sm">Current balance</div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-semibold">•••• •••• •••• 4532</div>
                  <div className="text-sm text-gray-600">Visa - Primary</div>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Active</span>
            </div>
          </div>
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div>
                  <div className="font-semibold">HSA Account</div>
                  <div className="text-sm text-gray-600">Health Savings</div>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">Connect</button>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
          <Plus className="w-6 h-6 mx-auto mb-2" />
          Add New Payment Method
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="usrad-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold usrad-navy">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-800 font-semibold">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { id: 1, type: 'Brain MRI', provider: 'Miami Lakes Medical', amount: 450, date: '2024-11-28', saved: 1200, status: 'Paid' },
            { id: 2, type: 'Knee MRI', provider: 'South Beach Radiology', amount: 520, date: '2024-11-08', saved: 890, status: 'Paid' },
            { id: 3, type: 'X-Ray Series', provider: 'Downtown Medical', amount: 120, date: '2024-10-15', saved: 320, status: 'Paid' }
          ].map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 usrad-gradient-navy rounded-lg flex items-center justify-center text-white font-bold">
                  💳
                </div>
                <div>
                  <div className="font-semibold">{transaction.type}</div>
                  <div className="text-sm text-gray-600">{transaction.provider} • {transaction.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">${transaction.amount}</div>
                <div className="text-sm text-green-600">Saved ${transaction.saved}</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{transaction.status}</span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Chart */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Your Savings vs. Hospital Pricing</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-green-600">$2,340</div>
              <div className="text-gray-600">Total Savings This Year</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">$890</div>
              <div className="text-gray-600">Amount You Paid</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full" style={{width: '72%'}}></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            You saved 72% compared to average hospital pricing
          </div>
        </div>
      </div>

      {/* Auto-Pay Settings */}
      <div className="usrad-card p-6">
        <h3 className="text-xl font-bold usrad-navy mb-4">Auto-Pay Settings</h3>
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-blue-600" />
            <div>
              <div className="font-semibold">Automatic Payments</div>
              <div className="text-sm text-gray-600">Pay appointments automatically after completion</div>
            </div>
          </div>
          <label className="flex items-center">
            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
            <span className="ml-2 font-medium">Enable</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBillingSystem;