import React, { useState, useEffect } from 'react';

const ProviderPortalDashboard = () => {
  const [supabase, setSupabase] = useState(null);
  const [user, setUser] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingStatus, setOnboardingStatus] = useState('not_started');
  const [showPSAModal, setShowPSAModal] = useState(false);
  const [centers, setCenters] = useState([]);

  // Initialize Supabase and load user data
  useEffect(() => {
    const initDashboard = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseClient = createClient(
          import.meta.env.PUBLIC_SUPABASE_URL,
          import.meta.env.PUBLIC_SUPABASE_ANON_KEY
        );
        setSupabase(supabaseClient);

        // Get current user
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
          window.location.href = '/providers/join';
          return;
        }
        setUser(session.user);

        // Load provider data
        const { data: provider, error } = await supabaseClient
          .from('provider_companies')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (provider) {
          setProviderData(provider);
          setOnboardingStatus(provider.status || 'not_started');

          // Load centers for this provider
          const { data: centersData, error: centersError } = await supabaseClient
            .from('provider_centers')
            .select('*')
            .eq('company_id', provider.id)
            .order('created_at', { ascending: true });

          if (centersData) {
            setCenters(centersData);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        setLoading(false);
      }
    };

    initDashboard();
  }, []);

  // Determine onboarding progress
  const getProgressInfo = () => {
    switch (onboardingStatus) {
      case 'not_started':
        return {
          step: 1,
          total: 3,
          status: 'Ready to Begin',
          description: 'Complete your provider onboarding to join the network',
          action: 'Start Onboarding',
          actionUrl: '/providers/onboard',
          color: 'blue'
        };
      case 'pending_psa':
        return {
          step: 2,
          total: 3,
          status: 'Registration Complete',
          description: 'Review and sign your Provider Service Agreement',
          action: 'Review Agreement',
          actionUrl: '/providers/psa-review',
          color: 'yellow'
        };
      case 'psa_signed':
        return {
          step: 3,
          total: 3,
          status: 'Agreement Signed',
          description: 'Begin credentialing process for your centers',
          action: 'Start Credentialing',
          actionUrl: '/providers/credentialing',
          color: 'green'
        };
      case 'active':
        return {
          step: 3,
          total: 3,
          status: 'Active Partner',
          description: 'You\'re all set! Manage your network partnership',
          action: 'View Dashboard',
          actionUrl: '/providers/dashboard',
          color: 'green'
        };
      default:
        return {
          step: 1,
          total: 3,
          status: 'Getting Started',
          description: 'Let\'s get your provider account set up',
          action: 'Continue Setup',
          actionUrl: '/providers/onboard',
          color: 'blue'
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#003087]"></div>
          <p className="text-gray-600 mt-4">Loading your portal...</p>
        </div>
      </div>
    );
  }

  const progress = getProgressInfo();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003087] to-[#002266] p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome
                {user?.user_metadata?.contact_name
                  ? `, ${user.user_metadata.contact_name}`
                  : ""}
                !
              </h2>
              <p className="text-blue-100 text-lg">
                {providerData?.legal_name ||
                  providerData?.facility_name ||
                  "Your Imaging Center"}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {progress.status}
              </h3>
              <p className="text-gray-600">{progress.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Progress</div>
              <div className="text-2xl font-bold text-[#003087]">
                {progress.step}/{progress.total}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Account Created</span>
              <span>Onboarding</span>
              <span>Active Partner</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  progress.color === "green"
                    ? "bg-green-500"
                    : progress.color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-[#003087]"
                }`}
                style={{ width: `${(progress.step / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Button */}
          <a
            href={progress.actionUrl}
            className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
              progress.color === "green"
                ? "bg-green-600 text-white hover:bg-green-700"
                : progress.color === "yellow"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-[#003087] text-white hover:bg-[#002266]"
            }`}
          >
            {progress.action} →
          </a>
        </div>
      </div>

      {/* My Centers Section - Always Show */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#003087] to-[#002266] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">My Imaging Centers</h3>
              <p className="text-blue-100">
                {centers.length > 0
                  ? `${centers.length} center${centers.length !== 1 ? "s" : ""} registered${
                      onboardingStatus === "psa_signed" ||
                      onboardingStatus === "active"
                        ? " and covered under your PSA"
                        : ""
                    }`
                  : "Register your imaging centers to join the network"}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {centers.length > 0 ? (
            <div className="space-y-4">
              {centers.map((center, index) => (
                <div
                  key={center.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {center.center_name}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            onboardingStatus === "active"
                              ? "bg-green-100 text-green-700"
                              : onboardingStatus === "psa_signed"
                                ? "bg-blue-100 text-blue-700"
                                : onboardingStatus === "pending_psa"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {onboardingStatus === "active"
                            ? "Active in Network"
                            : onboardingStatus === "psa_signed"
                              ? "PSA Signed"
                              : onboardingStatus === "pending_psa"
                                ? "PSA Pending"
                                : "Registered"}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>📍</span>
                          <span>
                            {center.address}, {center.city}, {center.state}{" "}
                            {center.zip_code}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>📞</span>
                          <span>{center.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
                          <span>🔧</span>
                          <span className="font-medium">Equipment:</span>
                          <span>
                            {Array.isArray(center.equipment)
                              ? center.equipment.join(", ")
                              : center.equipment}
                          </span>
                        </div>
                        {center.contact_name && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>👤</span>
                            <span>Contact: {center.contact_name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Added</div>
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(center.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#003087]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-[#003087]/60">🏥</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Register Your Imaging Centers
              </h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                Add your imaging center locations, equipment details, and
                contact information. Multiple centers can be covered under a
                single Provider Service Agreement.
              </p>

              {/* Progress Steps Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <h5 className="font-medium text-gray-900 mb-3">
                  What you'll add:
                </h5>
                <div className="space-y-2 text-sm text-gray-600 text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#003087] rounded-full"></span>
                    <span>Center names and addresses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#003087] rounded-full"></span>
                    <span>Equipment types (MRI, CT, X-Ray, etc.)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#003087] rounded-full"></span>
                    <span>Contact information per location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#003087] rounded-full"></span>
                    <span>Business details (Tax ID, NPI)</span>
                  </div>
                </div>
              </div>

              <a
                href="/providers/onboard"
                className="inline-flex items-center gap-2 bg-[#003087] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#002266] transition-all transform hover:scale-105"
              >
                <span>🏥</span>
                <span>Start Center Registration</span>
              </a>

              <p className="text-sm text-gray-500 mt-4">
                Takes about 5 minutes • Can add multiple centers • Save progress
                anytime
              </p>
            </div>
          )}

          {/* Add Center Action */}
          {centers.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              {onboardingStatus === "psa_signed" ||
              onboardingStatus === "active" ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg">⚠️</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-900 mb-2">
                        Adding New Centers
                      </h4>
                      <p className="text-yellow-800 text-sm mb-3">
                        Your PSA covers the {centers.length} center
                        {centers.length !== 1 ? "s" : ""} listed above. To add
                        new centers, you'll need to complete an agreement
                        addendum.
                      </p>
                      <button className="text-sm bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                        Request Center Addition →
                      </button>
                    </div>
                  </div>
                </div>
              ) : onboardingStatus === "pending_psa" ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 text-lg">ℹ️</span>
                    <div className="flex-1">
                      <p className="text-blue-800 text-sm">
                        You can still modify your centers before signing the
                        PSA.
                      </p>
                    </div>
                    <a
                      href="/providers/onboard"
                      className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Centers
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <a
                    href="/providers/onboard"
                    className="inline-flex items-center gap-2 text-[#003087] font-medium hover:text-[#002266] transition-colors"
                  >
                    <span>+</span>
                    <span>Add More Centers</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* PSA Review - NEW */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#cc9933]/10 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Provider Service Agreement
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Review the complete agreement terms before starting your onboarding
            process.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowPSAModal(true)}
              className="text-[#003087] font-medium hover:text-[#002266] transition-colors text-left"
            >
              View Agreement →
            </button>
            <a
              href="/documents/USRad-Provider-Service-Agreement.pdf"
              download
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              📥 Download PDF
            </a>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Account Settings
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Manage your profile, contact information, and account preferences.
          </p>
          <a
            href="/providers/settings"
            className="text-[#003087] font-medium hover:text-[#002266] transition-colors"
          >
            Manage Settings →
          </a>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Security</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Update password, enable 2FA, and manage security settings.
          </p>
          <a
            href="/providers/security"
            className="text-[#003087] font-medium hover:text-[#002266] transition-colors"
          >
            Security Settings →
          </a>
        </div>
      </div>

      {/* Support moved to separate row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Support */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mr-4">
              <span className="text-2xl">🎧</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Support</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Get help from our provider relations team whenever you need it.
          </p>
          <a
            href="#support"
            className="text-[#003087] font-medium hover:text-[#002266] transition-colors"
          >
            Contact Support →
          </a>
        </div>

        {/* PSA Status Card */}
        <div
          className={`rounded-2xl shadow-lg border p-6 ${
            onboardingStatus === "psa_signed" || onboardingStatus === "active"
              ? "bg-green-50 border-green-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  onboardingStatus === "psa_signed" ||
                  onboardingStatus === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {onboardingStatus === "psa_signed" ||
                onboardingStatus === "active"
                  ? "✓"
                  : "📋"}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Agreement Status
                </h4>
                <p className="text-sm text-gray-600">
                  {onboardingStatus === "psa_signed" ||
                  onboardingStatus === "active"
                    ? "PSA Signed & Complete"
                    : "Ready for your review"}
                </p>
              </div>
            </div>
            {(onboardingStatus === "not_started" ||
              onboardingStatus === "pending_psa") && (
              <button
                onClick={() => setShowPSAModal(true)}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review PSA
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Verification */}
        <div
          className={`rounded-2xl shadow-lg border p-6 ${
            user?.email_confirmed_at
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  user?.email_confirmed_at
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {user?.email_confirmed_at ? "✓" : "⚠️"}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Email Verification
                </h4>
                <p className="text-sm text-gray-600">
                  {user?.email_confirmed_at
                    ? "Verified"
                    : "Please verify your email"}
                </p>
              </div>
            </div>
            {!user?.email_confirmed_at && (
              <button className="text-sm bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                Resend Email
              </button>
            )}
          </div>
        </div>

        {/* 2FA Status */}
        <div className="bg-blue-50 border-blue-200 rounded-2xl shadow-lg border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                🔐
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-600">
                  Optional but recommended
                </p>
              </div>
            </div>
            <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {providerData && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Account created on{" "}
              {new Date(user?.created_at).toLocaleDateString()}
            </div>
            {providerData.created_at && (
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Company information added on{" "}
                {new Date(providerData.created_at).toLocaleDateString()}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
              Next: {progress.description}
            </div>
          </div>
        </div>
      )}

      {/* PSA Review Modal */}
      {showPSAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Provider Service Agreement
                </h3>
                <p className="text-gray-600 mt-1">
                  Review the complete terms before proceeding
                </p>
              </div>
              <button
                onClick={() => setShowPSAModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="prose prose-sm max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="text-blue-900 font-semibold mb-2">
                    🔍 Agreement Overview
                  </h4>
                  <p className="text-blue-800 text-sm">
                    This preview shows the key terms of our Provider Service
                    Agreement. The complete document will be available during
                    the signing process.
                  </p>
                </div>

                {/* PSA Content Preview */}
                <div className="space-y-6">
                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      1. Partnership Overview
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      This agreement establishes a healthcare technology
                      partnership between USRad and your imaging center(s). We
                      connect patients seeking affordable, quality imaging
                      services with your facility through our digital platform.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      2. Service Standards
                    </h4>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li>
                        • Maintain current accreditation standards (ACR, IAC, or
                        equivalent)
                      </li>
                      <li>
                        • Provide quality imaging services to USRad-referred
                        patients
                      </li>
                      <li>
                        • Honor scheduled appointment times and availability
                      </li>
                      <li>
                        • Deliver results promptly upon radiologist sign-off
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      3. Technology & Platform Access
                    </h4>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li>
                        • Access to USRad scheduling and patient management
                        platform
                      </li>
                      <li>
                        • Real-time appointment booking and calendar integration
                      </li>
                      <li>• Automated reporting and results delivery system</li>
                      <li>
                        • Provider portal for managing referrals and performance
                        metrics
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      4. Financial Terms
                    </h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <ul className="text-gray-700 space-y-2">
                        <li>
                          • <strong>Transparent pricing:</strong> Pre-negotiated
                          rates for all procedures
                        </li>
                        <li>
                          • <strong>Prompt payment:</strong> Guaranteed payment
                          within 15 business days
                        </li>
                        <li>
                          • <strong>No collection risk:</strong> USRad handles
                          all patient payments
                        </li>
                        <li>
                          • <strong>Competitive rates:</strong> Market-based
                          pricing that ensures profitability
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      5. Patient Referral Process
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      USRad will refer qualified patients to your facility based
                      on location, availability, and service offerings. All
                      referrals come with pre-authorization and guaranteed
                      payment.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      6. Quality Assurance
                    </h4>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li>
                        • Regular quality reviews and patient satisfaction
                        monitoring
                      </li>
                      <li>• Continuous improvement collaboration</li>
                      <li>• Performance metrics tracking and reporting</li>
                      <li>• Support for maintaining excellence standards</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      7. Agreement Term & Termination
                    </h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <ul className="text-gray-700 space-y-2">
                        <li>
                          • <strong>Initial term:</strong> 12 months with
                          automatic renewal
                        </li>
                        <li>
                          • <strong>Termination:</strong> Either party may
                          terminate with 30-day written notice
                        </li>
                        <li>
                          • <strong>Transition:</strong> Orderly wind-down of
                          pending appointments
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <h4 className="text-yellow-900 font-semibold mb-2">
                    📋 Next Steps
                  </h4>
                  <p className="text-yellow-800 text-sm">
                    When you're ready to proceed, complete your onboarding
                    process where you'll register your centers and then
                    digitally sign the complete agreement with all specific
                    terms and pricing details.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-4">
                  <a
                    href="/documents/USRad-Provider-Service-Agreement.pdf"
                    download
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    📥 Download Complete PDF
                  </a>
                  <span className="text-sm text-gray-400">|</span>
                  <span className="text-sm text-gray-500">
                    Last updated: January 2025
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPSAModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close Preview
                  </button>
                  {onboardingStatus === "not_started" && (
                    <a
                      href="/providers/onboard"
                      className="px-6 py-2 bg-[#003087] text-white rounded-lg hover:bg-[#002266] transition-colors"
                    >
                      Ready to Proceed →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderPortalDashboard;