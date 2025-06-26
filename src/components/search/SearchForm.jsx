import React, { useState } from 'react';

export default function SearchForm({ zip, cptCode, state, onSearch }) {
  const [localZip, setLocalZip] = useState(zip);
  const [localCpt, setLocalCpt] = useState(cptCode);
  const [localState, setLocalState] = useState(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ zip: localZip, cptCode: localCpt, state: localState });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        value={localZip}
        onChange={(e) => setLocalZip(e.target.value)}
        placeholder="ZIP Code"
        className="px-4 py-2 border rounded-xl shadow-sm"
      />
      <input
        type="text"
        value={localCpt}
        onChange={(e) => setLocalCpt(e.target.value)}
        placeholder="CPT Code"
        className="px-4 py-2 border rounded-xl shadow-sm"
      />
      <input
        type="text"
        value={localState}
        onChange={(e) => setLocalState(e.target.value)}
        placeholder="State (e.g., FL)"
        className="px-4 py-2 border rounded-xl shadow-sm"
      />
      <button
        type="submit"
        className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
