import React from 'react';

const steps = [
  'Organization Info',
  'Facility Setup',
  'Market Education',
  'Contract Terms',
  'Agreement Confirmation',
  'Sign PSA',
];

export default function OnboardingStepper({ currentStep = 0 }) {
  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <div className="flex justify-between items-center text-sm text-gray-600">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : isActive
                      ? 'bg-white text-blue-600 border-blue-600'
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="text-xs text-center mt-1 whitespace-nowrap w-32">
  {label}
</div>

              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
