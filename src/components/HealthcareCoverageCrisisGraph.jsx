import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label, ResponsiveContainer } from 'recharts';

const HealthcareCoverageCrisisGraph = () => {
  // Data with focus on 2015-2035 timeframe
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

  // State for enhancing interactive effects
  const [activePoint, setActivePoint] = useState(null);

  // Custom tooltip to enhance user experience
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md text-sm">
          <p className="font-semibold text-[#003087]">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} million`}
            </p>
          ))}
          {label === 2024 && (
            <p className="text-xs italic mt-1 text-gray-600">Current state</p>
          )}
          {label > 2024 && (
            <p className="text-xs italic mt-1 text-gray-600">Projected</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Enhanced dot for data points - increases visual appeal
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, dataKey, value, index } = props;
    const isActive = activePoint === `${dataKey}-${index}`;
    
    // Make the 2024 point more prominent (current state)
    const isCurrentYear = props.payload.year === 2024;
    
    const radius = isCurrentYear ? 6 : (isActive ? 5 : 3);
    const strokeWidth = isCurrentYear ? 2 : (isActive ? 2 : 1);
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={radius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={isCurrentYear ? "#fff" : (isActive ? "#fff" : stroke)}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setActivePoint(`${dataKey}-${index}`)}
        onMouseLeave={() => setActivePoint(null)}
      />
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">America's Healthcare Coverage Crisis: 2015-2035</h3>
      <div className="text-sm text-center text-gray-600 -mt-2 mb-3">Increasing opportunity for direct-pay imaging services</div>
      <div className="h-80"> {/* Slightly increased height for better visibility */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            onMouseLeave={() => setActivePoint(null)}
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
              
              {/* Add glossy effect to the graph */}
              <linearGradient id="graphGloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity={0.7} />
                <stop offset="100%" stopColor="white" stopOpacity={0} />
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
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ fontSize: '12px' }}
            />
            
            {/* Vertical line marking 2024 with enhanced label */}
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
            />
            
            {/* The three lines on the graph with distinct colors and interactive dots */}
            <Area 
              type="monotone" 
              dataKey="uninsured" 
              stroke="#4169E1" 
              fillOpacity={1} 
              fill="url(#colorUninsured)" 
              name="Uninsured"
              strokeWidth={2}
              dot={<CustomizedDot />}
              activeDot={{ r: 6, stroke: "#4169E1", strokeWidth: 2, fill: "white" }}
            />
            <Area 
              type="monotone" 
              dataKey="underinsured" 
              stroke="#E6C378" 
              fillOpacity={1} 
              fill="url(#colorUnderinsured)" 
              name="Underinsured"
              strokeWidth={2}
              dot={<CustomizedDot />}
              activeDot={{ r: 6, stroke: "#E6C378", strokeWidth: 2, fill: "white" }}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="#003087" 
              fillOpacity={1} 
              fill="url(#colorTotal)" 
              name="Total (Combined)"
              strokeWidth={3}
              dot={<CustomizedDot />}
              activeDot={{ r: 7, stroke: "#003087", strokeWidth: 2, fill: "white" }}
            />
            
            {/* Add glossy overlay for enhanced visual appeal */}
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="transparent" 
              fill="url(#graphGloss)" 
              fillOpacity={0.3}
              name=""
              legendType="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Enhanced source citation with more professional styling */}
      <div className="mt-3 text-xs text-gray-600 border-t border-gray-100 pt-2 flex justify-between items-center">
        <p>Data sources: Kaiser Family Foundation, Commonwealth Fund, HHS</p>
        
        {/* Projection indicator with clearer styling */}
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-100 opacity-70 mr-2"></div>
          <span className="text-xs text-gray-600">Projections after 2024</span>
        </div>
      </div>
    </div>
  );
};

export default HealthcareCoverageCrisisGraph;