import React, { useState, useRef, useEffect, useCallback } from 'react';

const MultiModalViewer = () => {
  const [activeModality, setActiveModality] = useState('mri');
  const [currentSlice, setCurrentSlice] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(300);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const modalityConfig = {
    mri: {
      name: 'MRI',
      fullName: 'Magnetic Resonance Imaging',
      icon: '🧠',
      color: 'blue',
      totalSlices: 30,
      description: 'No radiation, detailed soft tissue imaging',
      benefits: ['No radiation exposure', 'Excellent soft tissue contrast', 'Multiple imaging planes'],
      commonUses: ['Brain imaging', 'Spine evaluation', 'Joint assessment', 'Organ visualization']
    },
    ct: {
      name: 'CT',
      fullName: 'Computed Tomography',
      icon: '💀',
      color: 'red',
      totalSlices: 25,
      description: 'Fast imaging with excellent bone detail',
      benefits: ['Rapid acquisition', 'Excellent bone detail', 'Emergency imaging'],
      commonUses: ['Bone fractures', 'Chest imaging', 'Abdominal pain', 'Trauma evaluation']
    },
    ultrasound: {
      name: 'Ultrasound',
      fullName: 'Ultrasound Imaging',
      icon: '👶',
      color: 'green',
      totalSlices: 20,
      description: 'Real-time imaging with no radiation',
      benefits: ['Real-time imaging', 'No radiation', 'Portable technology'],
      commonUses: ['Pregnancy monitoring', 'Heart evaluation', 'Abdominal organs', 'Blood flow assessment']
    },
    pet: {
      name: 'PET',
      fullName: 'Positron Emission Tomography',
      icon: '⚡',
      color: 'purple',
      totalSlices: 22,
      description: 'Functional imaging showing metabolism',
      benefits: ['Functional information', 'Cancer detection', 'Metabolic activity'],
      commonUses: ['Cancer staging', 'Brain function', 'Heart metabolism', 'Infection detection']
    }
  };
  
  const anatomyData = {
    mri: [
      { name: "Superior Frontal Gyrus", function: "Executive functions, working memory", intensity: "High T1 signal" },
      { name: "Middle Frontal Gyrus", function: "Cognitive control, attention", intensity: "Moderate T1 signal" },
      { name: "Precentral Gyrus", function: "Primary motor control", intensity: "Gray matter signal" },
      { name: "Corpus Callosum", function: "Interhemispheric communication", intensity: "White matter signal" },
      { name: "Caudate Nucleus", function: "Movement, learning", intensity: "Deep gray matter" },
      { name: "Putamen", function: "Motor control", intensity: "Deep gray matter" },
      { name: "Thalamus", function: "Sensory relay", intensity: "Deep gray matter" },
      { name: "Hippocampus", function: "Memory formation", intensity: "Gray matter" },
      { name: "Amygdala", function: "Fear processing", intensity: "Gray matter" },
      { name: "Midbrain", function: "Visual/auditory reflexes", intensity: "Brainstem signal" },
      { name: "Pons", function: "Sleep, motor control", intensity: "Brainstem signal" },
      { name: "Medulla", function: "Vital functions", intensity: "Brainstem signal" },
      { name: "Cerebellum", function: "Motor coordination", intensity: "Cerebellar signal" },
      { name: "Occipital Lobe", function: "Visual processing", intensity: "Cortical signal" },
      { name: "Temporal Lobe", function: "Auditory processing", intensity: "Cortical signal" }
    ],
    ct: [
      { name: "Frontal Bone", function: "Skull protection", intensity: "High attenuation" },
      { name: "Frontal Sinus", function: "Air cavity", intensity: "Low attenuation" },
      { name: "Brain Parenchyma", function: "Neural tissue", intensity: "Moderate attenuation" },
      { name: "Lateral Ventricles", function: "CSF spaces", intensity: "Low attenuation" },
      { name: "Basal Ganglia", function: "Movement control", intensity: "Moderate attenuation" },
      { name: "Thalamus", function: "Relay center", intensity: "Moderate attenuation" },
      { name: "Temporal Bone", function: "Skull protection", intensity: "High attenuation" },
      { name: "Cerebellum", function: "Balance coordination", intensity: "Moderate attenuation" },
      { name: "Occipital Bone", function: "Skull protection", intensity: "High attenuation" },
      { name: "Brainstem", function: "Vital functions", intensity: "Moderate attenuation" }
    ],
    ultrasound: [
      { name: "Liver Parenchyma", function: "Metabolic processing", intensity: "Moderate echogenicity" },
      { name: "Gallbladder", function: "Bile storage", intensity: "Anechoic" },
      { name: "Portal Vein", function: "Hepatic blood flow", intensity: "Anechoic" },
      { name: "Hepatic Artery", function: "Arterial blood supply", intensity: "Anechoic" },
      { name: "Kidney Cortex", function: "Filtration", intensity: "Moderate echogenicity" },
      { name: "Kidney Medulla", function: "Concentration", intensity: "Low echogenicity" },
      { name: "Renal Pelvis", function: "Urine collection", intensity: "Anechoic" },
      { name: "Pancreas", function: "Enzyme production", intensity: "Moderate echogenicity" },
      { name: "Spleen", function: "Blood filtration", intensity: "Moderate echogenicity" },
      { name: "Aorta", function: "Main arterial supply", intensity: "Anechoic" }
    ],
    pet: [
      { name: "Frontal Cortex", function: "Executive functions", intensity: "High FDG uptake" },
      { name: "Cingulate Cortex", function: "Attention/emotion", intensity: "Moderate FDG uptake" },
      { name: "Basal Ganglia", function: "Movement control", intensity: "High FDG uptake" },
      { name: "Thalamus", function: "Relay center", intensity: "Moderate FDG uptake" },
      { name: "Visual Cortex", function: "Visual processing", intensity: "Variable FDG uptake" },
      { name: "Temporal Cortex", function: "Memory/language", intensity: "Moderate FDG uptake" },
      { name: "Cerebellum", function: "Motor coordination", intensity: "High FDG uptake" },
      { name: "Brainstem", function: "Vital functions", intensity: "Moderate FDG uptake" },
      { name: "White Matter", function: "Neural connections", intensity: "Low FDG uptake" },
      { name: "Ventricles", function: "CSF spaces", intensity: "No FDG uptake" }
    ]
  };
  
  const generateModalityTexture = useCallback((modality, sliceIndex) => {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const config = modalityConfig[modality];
    const slicePos = sliceIndex / config.totalSlices;
    
    // Generate modality-specific patterns
    switch(modality) {
      case 'mri':
        generateMRITexture(ctx, centerX, centerY, size, slicePos);
        break;
      case 'ct':
        generateCTTexture(ctx, centerX, centerY, size, slicePos);
        break;
      case 'ultrasound':
        generateUltrasoundTexture(ctx, centerX, centerY, size, slicePos);
        break;
      case 'pet':
        generatePETTexture(ctx, centerX, centerY, size, slicePos);
        break;
    }
    
    return canvas;
  }, []);
  
  const generateMRITexture = (ctx, centerX, centerY, size, slicePos) => {
    // Brain outline
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.35, size * 0.4, 0, 0, 2 * Math.PI);
    ctx.clip();
    
    // Gray matter
    const grayGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 0.35);
    grayGradient.addColorStop(0, `rgba(${120 + slicePos * 40}, ${120 + slicePos * 40}, ${120 + slicePos * 40}, 0.8)`);
    grayGradient.addColorStop(0.7, `rgba(${80 + slicePos * 30}, ${80 + slicePos * 30}, ${80 + slicePos * 30}, 0.6)`);
    grayGradient.addColorStop(1, 'rgba(40, 40, 40, 0.3)');
    ctx.fillStyle = grayGradient;
    ctx.fillRect(0, 0, size, size);
    
    // White matter
    if (slicePos > 0.2 && slicePos < 0.8) {
      const whiteGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 0.25);
      whiteGradient.addColorStop(0, `rgba(${180 + slicePos * 30}, ${180 + slicePos * 30}, ${180 + slicePos * 30}, 0.9)`);
      whiteGradient.addColorStop(1, `rgba(${120 + slicePos * 20}, ${120 + slicePos * 20}, ${120 + slicePos * 20}, 0.4)`);
      ctx.fillStyle = whiteGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, size * 0.25, size * 0.3, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Ventricles
    if (slicePos > 0.3 && slicePos < 0.7) {
      ctx.fillStyle = 'rgba(20, 20, 20, 0.9)';
      ctx.beginPath();
      ctx.ellipse(centerX - 40, centerY - 20, 12, 20, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + 40, centerY - 20, 12, 20, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
  };
  
  const generateCTTexture = (ctx, centerX, centerY, size, slicePos) => {
    // Skull
    ctx.strokeStyle = 'rgba(220, 220, 220, 0.9)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.4, size * 0.45, 0, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Brain parenchyma
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.35, size * 0.4, 0, 0, 2 * Math.PI);
    ctx.clip();
    
    const brainGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 0.35);
    brainGradient.addColorStop(0, `rgba(${100 + slicePos * 20}, ${100 + slicePos * 20}, ${100 + slicePos * 20}, 0.7)`);
    brainGradient.addColorStop(1, 'rgba(60, 60, 60, 0.5)');
    ctx.fillStyle = brainGradient;
    ctx.fillRect(0, 0, size, size);
    
    // Bone structures (high attenuation)
    if (slicePos > 0.1 && slicePos < 0.9) {
      ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
      // Temporal bones
      ctx.beginPath();
      ctx.ellipse(centerX - size * 0.3, centerY, 15, 25, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + size * 0.3, centerY, 15, 25, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Ventricles (low attenuation)
    if (slicePos > 0.3 && slicePos < 0.7) {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
      ctx.beginPath();
      ctx.ellipse(centerX - 35, centerY - 15, 10, 18, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(centerX + 35, centerY - 15, 10, 18, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
  };
  
  const generateUltrasoundTexture = (ctx, centerX, centerY, size, slicePos) => {
    // Ultrasound fan shape
    ctx.save();
    ctx.translate(centerX, size * 0.9);
    
    // Create fan gradient
    const fanGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.8);
    fanGradient.addColorStop(0, `rgba(${100 + slicePos * 50}, ${100 + slicePos * 50}, ${100 + slicePos * 50}, 0.8)`);
    fanGradient.addColorStop(0.5, `rgba(${80 + slicePos * 30}, ${80 + slicePos * 30}, ${80 + slicePos * 30}, 0.6)`);
    fanGradient.addColorStop(1, 'rgba(30, 30, 30, 0.2)');
    
    // Draw fan shape
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.8, -Math.PI * 0.6, -Math.PI * 0.4);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.clip();
    
    ctx.fillStyle = fanGradient;
    ctx.fill();
    
    // Add organ structures
    if (slicePos > 0.2 && slicePos < 0.8) {
      // Liver-like structure
      ctx.fillStyle = `rgba(${120 + slicePos * 40}, ${120 + slicePos * 40}, ${120 + slicePos * 40}, 0.7)`;
      ctx.beginPath();
      ctx.ellipse(-50, -150, 80, 40, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Vessel-like structure (anechoic)
      ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
      ctx.beginPath();
      ctx.ellipse(0, -100, 6, 30, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Add ultrasound noise/speckle
    for (let i = 0; i < 500; i++) {
      const angle = Math.random() * Math.PI * 0.4 - Math.PI * 0.2;
      const distance = Math.random() * size * 0.7;
      const x = Math.sin(angle) * distance;
      const y = -Math.cos(angle) * distance;
      
      ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.3)`;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.restore();
  };
  
  const generatePETTexture = (ctx, centerX, centerY, size, slicePos) => {
    // Brain outline
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.35, size * 0.4, 0, 0, 2 * Math.PI);
    ctx.clip();
    
    // Create colorful PET scan appearance
    const colors = [
      `rgba(255, 0, 0, 0.8)`,    // Red - high uptake
      `rgba(255, 165, 0, 0.7)`,  // Orange - moderate uptake
      `rgba(255, 255, 0, 0.6)`,  // Yellow - mild uptake
      `rgba(0, 255, 0, 0.5)`,    // Green - low uptake
      `rgba(0, 0, 255, 0.4)`     // Blue - very low uptake
    ];
    
    // Generate metabolic hotspots
    const hotspots = [
      { x: centerX - 30, y: centerY - 20, intensity: 0.9 }, // Frontal
      { x: centerX + 30, y: centerY - 20, intensity: 0.9 }, // Frontal
      { x: centerX, y: centerY, intensity: 0.7 },           // Central
      { x: centerX - 20, y: centerY + 30, intensity: 0.8 }, // Temporal
      { x: centerX + 20, y: centerY + 30, intensity: 0.8 }, // Temporal
      { x: centerX, y: centerY + 50, intensity: 0.6 }       // Cerebellum
    ];
    
    hotspots.forEach(spot => {
      const colorIndex = Math.floor((1 - spot.intensity) * colors.length);
      const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 25);
      gradient.addColorStop(0, colors[Math.min(colorIndex, colors.length - 1)]);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(spot.x, spot.y, 25, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Add background metabolic activity
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * size * 0.3;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      const intensity = Math.random();
      const colorIndex = Math.floor((1 - intensity) * colors.length);
      
      ctx.fillStyle = colors[Math.min(colorIndex, colors.length - 1)];
      ctx.beginPath();
      ctx.arc(x, y, 2 + Math.random() * 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const totalSlices = modalityConfig[activeModality].totalSlices;
      animationRef.current = setInterval(() => {
        setCurrentSlice(prev => {
          const next = prev + 1;
          if (next > totalSlices) {
            setIsPlaying(false);
            return 1;
          }
          return next;
        });
      }, playSpeed);
    } else {
      clearInterval(animationRef.current);
    }
    
    return () => clearInterval(animationRef.current);
  }, [isPlaying, playSpeed, activeModality]);
  
  // Reset slice when modality changes
  useEffect(() => {
    const totalSlices = modalityConfig[activeModality].totalSlices;
    setCurrentSlice(Math.ceil(totalSlices / 2));
    setIsPlaying(false);
  }, [activeModality]);
  
  // Handle wheel scrolling
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const totalSlices = modalityConfig[activeModality].totalSlices;
    setCurrentSlice(prev => Math.max(1, Math.min(totalSlices, prev + delta)));
  }, [activeModality]);
  
  // Handle mouse drag
  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) {
      setIsDragging(true);
      setLastY(e.clientY);
    }
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const deltaY = e.clientY - lastY;
      const sliceDelta = Math.round(deltaY / 10);
      if (sliceDelta !== 0) {
        const totalSlices = modalityConfig[activeModality].totalSlices;
        setCurrentSlice(prev => Math.max(1, Math.min(totalSlices, prev + sliceDelta)));
        setLastY(e.clientY);
      }
    }
  }, [isDragging, lastY, activeModality]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Generate texture
    const texture = generateModalityTexture(activeModality, currentSlice - 1);
    
    // Apply transformations
    ctx.save();
    ctx.translate(rect.width / 2 + pan.x, rect.height / 2 + pan.y);
    ctx.scale(zoom, zoom);
    
    // Apply filters
    ctx.filter = `brightness(${brightness / 100}) contrast(${contrast / 100})`;
    
    // Draw texture
    const size = Math.min(rect.width, rect.height) * 0.8;
    ctx.drawImage(texture, -size / 2, -size / 2, size, size);
    
    ctx.restore();
    
    // Draw annotations
    if (showAnnotations) {
      const config = modalityConfig[activeModality];
      const anatomy = anatomyData[activeModality][Math.min(currentSlice - 1, anatomyData[activeModality].length - 1)];
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(10, 10, 300, 80);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`${config.name} - Slice ${currentSlice}/${config.totalSlices}`, 20, 30);
      
      ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(anatomy?.name || 'Unknown Structure', 20, 50);
      
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = '#cccccc';
      ctx.fillText(anatomy?.intensity || '', 20, 70);
    }
    
  }, [activeModality, currentSlice, brightness, contrast, zoom, pan, showAnnotations, generateModalityTexture]);
  
  const currentConfig = modalityConfig[activeModality];
  const currentAnatomy = anatomyData[activeModality][Math.min(currentSlice - 1, anatomyData[activeModality].length - 1)];
  
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Modality Tabs */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="flex flex-wrap">
          {Object.entries(modalityConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveModality(key)}
              className={`flex-1 min-w-0 px-4 py-4 text-center transition-all duration-200 ${
                activeModality === key
                  ? `bg-${config.color}-600 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{config.icon}</div>
              <div className="font-semibold text-sm">{config.name}</div>
              <div className="text-xs opacity-75">{config.description}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col xl:flex-row">
        {/* Main Viewer */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {currentConfig.fullName} Viewer
            </h3>
            <p className="text-gray-600">{currentConfig.description}</p>
          </div>
          
          <div 
            ref={containerRef}
            className="relative bg-black rounded-xl overflow-hidden aspect-square cursor-crosshair select-none mb-4"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
            
            {isDragging && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                Slice {currentSlice}
              </div>
            )}
          </div>
          
          {/* Quick Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentSlice(Math.max(1, currentSlice - 1))}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={currentSlice === 1}
            >
              ←
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : `bg-${currentConfig.color}-600 hover:bg-${currentConfig.color}-700 text-white`
              }`}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={() => setCurrentSlice(Math.min(currentConfig.totalSlices, currentSlice + 1))}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={currentSlice === currentConfig.totalSlices}
            >
              →
            </button>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="w-full xl:w-80 bg-gray-50 p-6 space-y-6">
          {/* Slice Navigation */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Slice Navigation ({currentSlice}/{currentConfig.totalSlices})
            </label>
            <input
              type="range"
              min="1"
              max={currentConfig.totalSlices}
              value={currentSlice}
              onChange={(e) => setCurrentSlice(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          {/* Anatomy Info */}
          <div className={`bg-${currentConfig.color}-50 border border-${currentConfig.color}-200 rounded-lg p-4`}>
            <h4 className="font-semibold text-gray-900 mb-2">Current Structure</h4>
            <p className={`text-${currentConfig.color}-700 font-medium`}>{currentAnatomy?.name}</p>
            <p className="text-gray-600 text-sm mt-1">{currentAnatomy?.function}</p>
            <p className="text-gray-500 text-xs mt-2">{currentAnatomy?.intensity}</p>
          </div>
          
          {/* Imaging Controls */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Image Controls</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Brightness ({brightness}%)
                </label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Contrast ({contrast}%)
                </label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Zoom ({Math.round(zoom * 100)}%)
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Modality Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              {currentConfig.fullName} Benefits
            </h4>
            <ul className="space-y-2">
              {currentConfig.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Common Uses */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Common Uses</h4>
            <div className="grid grid-cols-1 gap-2">
              {currentConfig.commonUses.map((use, index) => (
                <div key={index} className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded">
                  {use}
                </div>
              ))}
            </div>
          </div>
          
          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showAnnotations}
                onChange={(e) => setShowAnnotations(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700 text-sm">Show Annotations</span>
            </label>
          </div>
          
          {/* Reset */}
          <button
            onClick={() => {
              setBrightness(100);
              setContrast(100);
              setZoom(1);
              setPan({ x: 0, y: 0 });
              setCurrentSlice(Math.ceil(currentConfig.totalSlices / 2));
            }}
            className={`w-full bg-${currentConfig.color}-600 hover:bg-${currentConfig.color}-700 text-white py-3 rounded-lg transition-colors font-medium`}
          >
            Reset View
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="bg-gray-100 px-6 py-4 text-sm text-gray-600">
        <div className="flex flex-wrap gap-4 justify-center">
          <span>🖱️ <strong>Scroll:</strong> Navigate slices</span>
          <span>🖱️ <strong>Drag:</strong> Precise control</span>
          <span>📱 <strong>Mobile:</strong> Touch & drag</span>
          <span>⌨️ <strong>Keyboard:</strong> Arrow keys</span>
        </div>
      </div>
    </div>
  );
};

export default MultiModalViewer;