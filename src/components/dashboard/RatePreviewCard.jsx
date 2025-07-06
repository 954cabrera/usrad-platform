// RatePreviewCard.jsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const rateSamples = [
  { modality: 'MRI', cpt: '70551', desc: 'MRI Brain w/o Contrast', rate: 231.45 },
  { modality: 'MRI', cpt: '72148', desc: 'MRI Lumbar Spine w/o Contrast', rate: 219.33 },
  { modality: 'CT', cpt: '74177', desc: 'CT Abdomen/Pelvis w/ Contrast', rate: 193.22 },
  { modality: 'X-Ray', cpt: '71046', desc: 'Chest X-Ray, 2 Views', rate: 34.56 },
  { modality: 'Ultrasound', cpt: '76700', desc: 'US Abdomen Complete', rate: 105.18 },
];

export default function RatePreviewCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        📊 Preview What 100% Medicare Rates Look Like
      </h2>
      <p className="text-gray-600 mb-4">
        Curious what you’d be reimbursed at Medicare-aligned pricing?
        These rates are national 2025 CMS global rates, and reflect what
        most USRad providers choose.
      </p>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark"
      >
        View Sample Reimbursement Rates
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Sample 2025 Medicare Reimbursement Rates
              </h3>
              <p className="text-gray-600 text-sm">
                Based on 100% of CMS Global Allowable, National Average
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="py-2 px-3 font-medium text-gray-700">Modality</th>
                    <th className="py-2 px-3 font-medium text-gray-700">CPT Code</th>
                    <th className="py-2 px-3 font-medium text-gray-700">Description</th>
                    <th className="py-2 px-3 font-medium text-gray-700">Rate (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {rateSamples.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-900">{row.modality}</td>
                      <td className="py-2 px-3 text-gray-900">{row.cpt}</td>
                      <td className="py-2 px-3 text-gray-900">{row.desc}</td>
                      <td className="py-2 px-3 text-gray-900">${row.rate.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
