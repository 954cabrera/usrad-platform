import React, { useState } from 'react';

const PatientSupportSystem = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  // Mock FAQ data
  const faqs = [
    {
      id: 1,
      category: 'appointments',
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by clicking "Book Imaging" in your dashboard, selecting your scan type, choosing a provider, and confirming your preferred time slot.',
      helpful: 15,
      notHelpful: 2
    },
    {
      id: 2,
      category: 'billing',
      question: 'How much will my scan cost?',
      answer: 'All scan prices are displayed upfront when you book. USRad offers transparent pricing that\'s typically 50-80% less than hospital rates. You can see exact costs before booking.',
      helpful: 23,
      notHelpful: 1
    },
    {
      id: 3,
      category: 'preparation',
      question: 'How should I prepare for my MRI?',
      answer: 'Remove all metal objects including jewelry, watches, and clothing with metal. Arrive 30 minutes early. If contrast is needed, fast for 4 hours beforehand. Detailed prep instructions are sent after booking.',
      helpful: 18,
      notHelpful: 0
    },
    {
      id: 4,
      category: 'reports',
      question: 'When will I get my results?',
      answer: 'Most results are available within 24-48 hours after your scan. You\'ll receive an email notification when your report is ready to view in your dashboard.',
      helpful: 12,
      notHelpful: 1
    },
    {
      id: 5,
      category: 'technical',
      question: 'I can\'t access my dashboard. What should I do?',
      answer: 'Try clearing your browser cache and cookies, or use an incognito/private browsing window. If you\'re still having issues, contact our support team for immediate assistance.',
      helpful: 8,
      notHelpful: 3
    },
    {
      id: 6,
      category: 'insurance',
      question: 'Do you accept my insurance?',
      answer: 'Many of our providers accept various insurance plans. During booking, you can filter providers by insurance acceptance. For cash-pay patients, our prices are often lower than insurance copays.',
      helpful: 14,
      notHelpful: 2
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: faqs.length },
    { id: 'appointments', name: 'Appointments', icon: '📅', count: faqs.filter(f => f.category === 'appointments').length },
    { id: 'billing', name: 'Billing & Pricing', icon: '💰', count: faqs.filter(f => f.category === 'billing').length },
    { id: 'preparation', name: 'Scan Preparation', icon: '📋', count: faqs.filter(f => f.category === 'preparation').length },
    { id: 'reports', name: 'Results & Reports', icon: '📊', count: faqs.filter(f => f.category === 'reports').length },
    { id: 'technical', name: 'Technical Support', icon: '🔧', count: faqs.filter(f => f.category === 'technical').length },
    { id: 'insurance', name: 'Insurance', icon: '🛡️', count: faqs.filter(f => f.category === 'insurance').length }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTicketSubmit = () => {
    alert('Support ticket submitted! We\'ll respond within 2 hours during business hours.');
    setTicketForm({ subject: '', category: '', priority: 'medium', description: '' });
  };

  return (
    <div className="space-y-8">
      {/* Support Header */}
      <div className="usrad-card p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤝</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">How can we help you?</h1>
          <p className="text-gray-600 text-lg mb-6">
            Get instant answers or reach out to our support team
          </p>
          
          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setChatOpen(true)}
              className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              💬 Live Chat
              <div className="text-sm opacity-90">Average response: 2 min</div>
            </button>
            <a
              href="tel:+19545550123"
              className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              📞 Call Support
              <div className="text-sm opacity-90">(954) 555-0123</div>
            </a>
            <a
              href="mailto:support@usrad.com"
              className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              ✉️ Email Us
              <div className="text-sm opacity-90">support@usrad.com</div>
            </a>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="usrad-card p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-xl">🔍</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="xl:col-span-1">
          <div className="usrad-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Topics</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="xl:col-span-3">
          <div className="usrad-card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {activeCategory === 'all' ? 'Frequently Asked Questions' : 
                 categories.find(c => c.id === activeCategory)?.name + ' Questions'}
              </h3>
              <p className="text-gray-600 mt-1">
                {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">Q</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      {/* Helpful Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Was this helpful?</span>
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                              <span>👍</span>
                              <span className="text-sm">{faq.helpful}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                              <span>👎</span>
                              <span className="text-sm">{faq.notHelpful}</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {categories.find(c => c.id === faq.category)?.icon}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {categories.find(c => c.id === faq.category)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❓</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or browse a different category
                </p>
                <button
                  onClick={() => setChatOpen(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Ask Our Support Team
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support Form */}
      <div className="usrad-card p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Still Need Help?</h3>
            <p className="text-gray-600">
              Submit a support ticket and our team will get back to you within 2 hours during business hours
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="appointments">Appointments</option>
                  <option value="billing">Billing & Pricing</option>
                  <option value="technical">Technical Issues</option>
                  <option value="reports">Results & Reports</option>
                  <option value="general">General Question</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex space-x-4">
                {['low', 'medium', 'high', 'urgent'].map((priority) => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={ticketForm.priority === priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      className="mr-2"
                    />
                    <span className="capitalize text-sm font-medium">{priority}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide as much detail as possible about your issue or question"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleTicketSubmit}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Support Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Chat Support</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                🟢 Our support team is online and ready to help! Average response time: 2 minutes
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => alert('Starting live chat...')}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Start Live Chat
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSupportSystem;