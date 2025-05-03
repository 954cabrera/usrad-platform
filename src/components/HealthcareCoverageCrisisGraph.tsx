import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label, ResponsiveContainer } from 'recharts';

const HealthcareCoverageCrisisGraph = () => {
  // Updated data with focus on 2015-2035 timeframe
  const data = [
    { year: 2015, uninsured: 28, underinsured: 42, total: 70 },
    { year: 2018, uninsured: 29, underinsured: 46, total: 75 },
    { year: 2020, uninsured: 30, underinsured: 50, total: 80 },
    { year: 2022, uninsured: 24, underinsured: 58, total: 82 },
    { year: 2024, uninsured: 25, underinsured: 65, total: 90 },
    // Projections start after 2024
    { year: 2027, uninsured: 28, underinsured: 72, total: 100 },
    { year: 2030, uninsured: 32, underinsured: 78, total: 110 },
    { year: 2035, uninsured: 38, underinsured: 82, total: 120 },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">America's Healthcare Coverage Crisis: 2015-2035</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorUninsured" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4169E1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4169E1" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorUnderinsured" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E6C378" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E6C378" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#003087" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#003087" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12, fill: "#555" }}
              tickCount={7}
            />
            <YAxis 
              label={{ value: 'Millions of Americans', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: "#555" } }} 
              tick={{ fontSize: 12, fill: "#555" }}
            />
            <Tooltip 
              formatter={(value) => [`${value} million`, undefined]}
              labelFormatter={(label) => `Year: ${label}`}
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
            />
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ fontSize: '12px' }}
            />
            
            {/* MUCH more prominent vertical line marking 2024 with enhanced label */}
            <ReferenceLine 
              x="2024" 
              stroke="#003087" 
              strokeWidth={2}
              label={
                <Label 
                  value="TODAY: 90 MILLION" 
                  position="top" 
                  fill="#003087" 
                  fontSize={13}
                  fontWeight="bold"
                  offset={15}
                />
              }
            >
            </ReferenceLine>
            
            {/* Enhanced reference line area to make it more visible */}
            <ReferenceLine 
              x="2024" 
              stroke="#003087" 
              strokeDasharray="3 3" 
              strokeWidth={1}
              ifOverflow="extendDomain"
            />
            
            {/* The three lines on the graph with distinct colors */}
            <Area 
              type="monotone" 
              dataKey="uninsured" 
              stroke="#4169E1" 
              fillOpacity={1} 
              fill="url(#colorUninsured)" 
              name="Uninsured"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="underinsured" 
              stroke="#E6C378" 
              fillOpacity={1} 
              fill="url(#colorUnderinsured)" 
              name="Underinsured"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="#003087" 
              fillOpacity={1} 
              fill="url(#colorTotal)" 
              name="Total (Combined)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Source citation with updated styling */}
      <div className="mt-3 text-xs text-gray-600">
        <p>Data sources: Kaiser Family Foundation, Commonwealth Fund, U.S. Department of Health and Human Services</p>
      </div>
      
      {/* Projection indicator with clearer styling */}
      <div className="flex items-center mt-2">
        <div className="w-3 h-3 bg-blue-100 opacity-70 mr-2"></div>
        <span className="text-xs text-gray-600">Shaded area indicates projected trend</span>
      </div>
      
      {/* Added a clear division line between history and projection */}
      <div className="flex items-center mt-1">
        <div className="w-4 border-t-2 border-blue-900 border-dashed mr-2"></div>
        <span className="text-xs text-gray-600">Vertical line marks current state (2024)</span>
      </div>
    </div>
  );
};

export default HealthcareCoverageCrisisGraph;