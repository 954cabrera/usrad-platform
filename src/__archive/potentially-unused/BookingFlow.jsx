import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [scanType, setScanType] = useState('');
  const [zip, setZip] = useState('');
  const [matchedCenters, setMatchedCenters] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [selectedDate, setSelectedDate] = useState('');

  const handleMatchCenters = () => {
    setMatchedCenters([
      { name: 'Imaging Center of Miami', price: '$625', distance: '2.1 mi' },
      { name: 'Palm Diagnostics', price: '$580', distance: '3.4 mi' },
      { name: 'CoreScan Ft. Lauderdale', price: '$640', distance: '5.0 mi' },
    ]);
    setStep(3);
  };

  const handleFormSubmit = () => {
    console.log('Submitted:', { ...formData, selectedDate });
    alert('Thank you! A representative will contact you shortly.');
  };

  return (
    <div className="relative bg-white text-[#003087] font-manrope min-h-screen py-24 px-6">
      <div className="absolute -top-24 left-1/2 w-72 h-72 bg-[#cc9933] opacity-10 blur-3xl rounded-full -translate-x-1/2"></div>
      <div className="relative max-w-2xl mx-auto z-10">
        {step === 1 && (
          <motion.div {...slideUp}>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-[#003087]">
              What scan do you need?
            </h2>
            <select
              className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm"
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
            >
              <option value="">Select a scan type</option>
              <option value="mri">MRI</option>
              <option value="ct">CT</option>
              <option value="xray">X-Ray</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="mammogram">Mammogram</option>
            </select>
            <button
              disabled={!scanType}
              onClick={() => setStep(2)}
              className="bg-[#003087] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#002266] focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9933] transition transform hover:scale-105"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div {...slideUp}>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-[#003087]">
              Enter your ZIP code
            </h2>
            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <button
              disabled={!zip}
              onClick={handleMatchCenters}
              className="bg-[#003087] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#002266] focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9933] transition transform hover:scale-105"
            >
              Find Centers
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div {...fadeIn}>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 text-[#003087]">
              Top Matches Near You
            </h2>
            <div className="grid gap-6 mb-10">
              {matchedCenters.map((center, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-[#cc9933] p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition"
                >
                  <h3 className="text-xl font-semibold text-[#003087] mb-1">{center.name}</h3>
                  <p className="text-[#cc9933] font-bold text-lg">{center.price}</p>
                  <p className="text-sm text-gray-500">{center.distance} away</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button
                onClick={handleFormSubmit}
                className="mt-4 bg-[#cc9933] text-[#003087] px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#e6c378] focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9933] transition transform hover:scale-105"
              >
                Submit Request
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}