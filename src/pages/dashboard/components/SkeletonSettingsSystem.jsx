// /src/pages/dashboard/components/SkeletonSettingsSystem.jsx
import React, { useState, useEffect } from 'react';

const SkeletonLoader = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="mb-8 animate-pulse">
      <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 mb-2"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-80"></div>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Settings Skeleton */}
      <div className="xl:col-span-2 space-y-8">
        {/* Profile Information Skeleton */}
        <div className="usrad-card p-8 animate-pulse" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64"></div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl"></div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2"></div>
                <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
              <div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2"></div>
                <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            </div>
            
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-32"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20"></div>
            </div>
          </div>
        </div>

        {/* Imaging Center Settings Skeleton */}
        <div className="usrad-card p-8 animate-pulse" style={{animationDelay: '0.2s'}}>
          <div className="mb-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-72"></div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2"></div>
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mb-2"></div>
                  <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2"></div>
                  <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            
            <div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-2"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="h-12 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg w-36"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20"></div>
            </div>
          </div>
        </div>

        {/* Security Settings Skeleton */}
        <div className="usrad-card p-8 animate-pulse" style={{animationDelay: '0.3s'}}>
          <div className="mb-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-36 mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-68"></div>
          </div>
          
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-2"></div>
                <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            ))}
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg w-36"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="space-y-8">
        {/* Account Status Skeleton */}
        <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.4s'}}>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                <div className={`h-6 bg-gradient-to-r ${
                  i === 0 ? 'from-blue-200 to-blue-300' :
                  i === 1 ? 'from-green-200 to-green-300' :
                  'from-gray-200 to-gray-300'
                } rounded-full w-24`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings Skeleton */}
        <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.5s'}}>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                <div className="w-5 h-5 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Skeleton */}
        <div className="usrad-card p-6 animate-pulse" style={{animationDelay: '0.6s'}}>
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-28"></div>
            ))}
          </div>
        </div>

        {/* Danger Zone Skeleton */}
        <div className="usrad-card p-6 animate-pulse border-red-200" style={{animationDelay: '0.7s'}}>
          <div className="h-5 bg-gradient-to-r from-red-200 to-red-300 rounded w-24 mb-4"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-4"></div>
          <div className="space-y-3">
            <div className="h-10 bg-gradient-to-r from-red-200 to-red-300 rounded-lg w-full"></div>
            <div className="h-10 bg-gradient-to-r from-red-300 to-red-400 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsContent = ({ user, imagingCenter }) => (
  <div className="space-y-8">
    {/* Page Header */}
    <div className="mb-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold usrad-navy mb-2" style={{fontFamily: "'Manrope', sans-serif"}}>Settings</h1>
      <p className="text-gray-600">Manage your profile and imaging center preferences</p>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Settings */}
      <div className="xl:col-span-2 space-y-8">
        {/* Profile Information */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>Profile Information</h2>
              <p className="text-gray-600 mt-1">Update your personal details and contact information</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-usrad-gold to-yellow-400 rounded-xl flex items-center justify-center font-bold text-white text-2xl shadow-lg">
              {user.firstName?.[0] || user.email[0].toUpperCase()}
            </div>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" defaultValue={user.firstName || ''} placeholder="Enter first name" />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" defaultValue={user.lastName || ''} placeholder="Enter last name" />
              </div>
            </div>
            
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue={user.email} placeholder="Enter email address" />
            </div>
            
            <div>
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" defaultValue={user.phone || ''} placeholder="Enter phone number" />
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button type="button" className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold">
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Imaging Center Settings */}
        {imagingCenter && (
          <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="mb-6">
              <h2 className="text-xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>Imaging Center Settings</h2>
              <p className="text-gray-600 mt-1">Configure your imaging center information and preferences</p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="form-label">Center Name</label>
                <input type="text" className="form-input" defaultValue={imagingCenter.name} placeholder="Enter center name" />
              </div>
              
              <div>
                <label className="form-label">Address</label>
                <textarea className="form-input" rows={3} placeholder="Enter complete address" defaultValue={imagingCenter.address}></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" defaultValue={imagingCenter.city || ''} placeholder="City" />
                </div>
                <div>
                  <label className="form-label">State</label>
                  <input type="text" className="form-input" defaultValue={imagingCenter.state || ''} placeholder="State" />
                </div>
                <div>
                  <label className="form-label">ZIP Code</label>
                  <input type="text" className="form-input" defaultValue={imagingCenter.zipCode || ''} placeholder="ZIP" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" defaultValue={imagingCenter.phone || ''} placeholder="Center phone" />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" defaultValue={imagingCenter.email || ''} placeholder="Center email" />
                </div>
              </div>
              
              <div>
                <label className="form-label">License Number</label>
                <input type="text" className="form-input" defaultValue={imagingCenter.licenseNumber || ''} placeholder="Medical license number" />
              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <button type="submit" className="btn-secondary">
                  Update Center Info
                </button>
                <button type="button" className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Security Settings */}
        <div className="usrad-card p-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="mb-6">
            <h2 className="text-xl font-bold usrad-navy" style={{fontFamily: "'Manrope', sans-serif"}}>Security Settings</h2>
            <p className="text-gray-600 mt-1">Update your password and security preferences</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="form-label">Current Password</label>
              <input type="password" className="form-input" placeholder="Enter current password" />
            </div>
            
            <div>
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" placeholder="Enter new password" />
            </div>
            
            <div>
              <label className="form-label">Confirm New Password</label>
              <input type="password" className="form-input" placeholder="Confirm new password" />
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <button type="submit" className="btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        {/* Account Status */}
        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h3 className="text-lg font-bold usrad-navy mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>Account Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Account Type</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {user.role === 'imaging_center' ? 'Imaging Center' : user.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Member Since</span>
              <span className="text-gray-900 font-medium">
                {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <h3 className="text-lg font-bold usrad-navy mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">SMS Alerts</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Appointment Reminders</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">System Updates</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </label>
          </div>
        </div>

        {/* Support */}
        <div className="usrad-card p-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h3 className="text-lg font-bold usrad-navy mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>Support</h3>
          <div className="space-y-3">
            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
              📖 Documentation
            </a>
            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
              💬 Contact Support
            </a>
            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
              🎥 Video Tutorials
            </a>
            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
              ❓ FAQ
            </a>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="usrad-card p-6 animate-fade-in-up border-red-200" style={{animationDelay: '0.7s'}}>
          <h3 className="text-lg font-bold text-red-600 mb-4" style={{fontFamily: "'Manrope', sans-serif"}}>Danger Zone</h3>
          <p className="text-gray-600 text-sm mb-4">These actions cannot be undone.</p>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 font-semibold">
              Export Data
            </button>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonSettingsSystem = ({ user, imagingCenter }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second for settings

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <style>{`
        .usrad-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.08);
          transition: all 0.3s ease;
        }
        
        .usrad-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }
        
        .usrad-navy { color: #003087; }
        .usrad-gold { color: #cc9933; }
        .bg-usrad-navy { background-color: #003087; }
        .bg-usrad-gold { background-color: #cc9933; }
        
        .usrad-gradient-navy {
          background: linear-gradient(135deg, #003087 0%, #001a4d 100%);
        }
        
        .usrad-gradient-gold {
          background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          font-family: 'Manrope', sans-serif;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #003087;
          box-shadow: 0 0 0 3px rgba(0, 48, 135, 0.1);
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-family: 'Manrope', sans-serif;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #003087, #0040a0);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Manrope', sans-serif;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 48, 135, 0.3);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #cc9933, #e6b84d);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Manrope', sans-serif;
        }
        
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(204, 153, 51, 0.3);
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-pulse {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
          background-size: 200px;
        }
      `}</style>

      {isLoading ? <SkeletonLoader /> : <SettingsContent user={user} imagingCenter={imagingCenter} />}
    </div>
  );
};

export default SkeletonSettingsSystem;