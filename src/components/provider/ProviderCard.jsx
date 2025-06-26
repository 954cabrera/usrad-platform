import React from 'react';

export default function ProviderCard({ provider }) {
  const {
    name,
    address,
    city,
    state,
    zip,
    pricing = {},
    distance,
    bookingAvailable = false,
    bestDeal = false,
    studies = [],
    savings = {},
  } = provider;

  const {
    usrad_rate = 0,
    medicare_rate = 0,
    savings_percent = 0,
    savings_amount = 0,
  } = pricing;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {name}
        </h3>
        {bestDeal && <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Best Deal</span>}
      </div>

      <div className="text-sm text-gray-600">
        <p>{address}</p>
        <p>{city}, {state} {zip}</p>
        {distance && <p className="text-xs text-gray-400 mt-1">{distance} miles away</p>}
      </div>

      {bookingAvailable && (
        <p className="text-xs text-emerald-600 font-medium">✅ Available for booking</p>
      )}

      {studies.length > 0 && (
        <div className="mt-3 text-sm text-gray-700">
          <p className="font-semibold mb-1">Studies Selected</p>
          <ul className="list-disc list-inside space-y-1">
            {studies.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-500">USRad Price</div>
        <div className="text-xl font-bold text-emerald-600">
          ${usrad_rate.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Medicare: ${medicare_rate.toLocaleString(undefined, { minimumFractionDigits: 2 })} · Save {savings_percent}%
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>You Save: <span className="font-semibold text-blue-600">${savings_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></p>
      </div>

      <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-xl font-semibold hover:bg-emerald-700 transition">
        Book Now & Save
      </button>
    </div>
  );
}
