import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [scanType, setScanType] = useState('');
  const [zip, setZip] = useState('');
  const [matchedCenters, setMatchedCenters] = useState([]);

  const handleMatchCenters = () => {
    // Simulated center matches
    setMatchedCenters([
      { name: 'Imaging Center of Miami', price: '$625', distance: '2.1 mi' },
      { name: 'Palm Diagnostics', price: '$580', distance: '3.4 mi' },
      { name: 'CoreScan Ft. Lauderdale', price: '$640', distance: '5.0 mi' },
    ]);
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-3xl font-semibold mb-4 font-manrope">What scan do you need?</h2>
          <select
            className="w-full p-4 border rounded-xl mb-6 font-manrope text-[#003087]"
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
            className="bg-[#003087] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#002266] transition"
          >
            Next
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-3xl font-semibold mb-4 font-manrope">Enter your ZIP code</h2>
          <input
            type="text"
            placeholder="ZIP Code"
            className="w-full px-4 py-3 border rounded-lg mb-4 font-manrope text-[#003087]"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button
            disabled={!zip}
            onClick={handleMatchCenters}
            className="bg-[#003087] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#002266] transition"
          >
            Find Centers
          </button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-3xl font-semibold mb-6 font-manrope">Top Matches Near You</h2>
          <div className="grid gap-4">
            {matchedCenters.map((center, idx) => (
              <div key={idx} className="border rounded-xl p-6 shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-1 font-manrope text-[#003087]">{center.name}</h3>
                <p className="text-[#cc9933] font-bold font-manrope">{center.price}</p>
                <p className="text-sm text-gray-500 font-manrope">{center.distance} away</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={() => alert('Continue to booking or contact form')}
              className="bg-[#cc9933] text-[#003087] px-6 py-3 rounded-lg font-bold hover:bg-[#e6c378] transition"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
