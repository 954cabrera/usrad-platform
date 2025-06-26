// ProviderCard.jsx
export default function ProviderCard({ provider }) {
    const name = provider.name || provider.facility_name;
    const address = `${provider.street_address}, ${provider.city}, ${provider.state} ${provider.zip_code}`;
    const price = provider.pricing?.patient_price ?? 0;
    const savings = provider.pricing?.patient_savings ?? 0;
  
    return (
      <div className="bg-white shadow-md rounded-xl p-6 border provider-card hover:shadow-xl transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
            ${price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-700">{address}</p>
        <p className="text-sm text-gray-500 mt-2">
          Save ${savings.toFixed(2)} vs hospital rates
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          📅 Schedule at {name}
        </button>
      </div>
    );
  }
  