import React, { useState, useRef, useEffect, useCallback } from 'react';

const AdvancedMRIViewer = () => {
  const [currentSlice, setCurrentSlice] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(200);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [windowing, setWindowing] = useState({ level: 50, width: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [imageQuality, setImageQuality] = useState('high');
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  
  const totalSlices = 30;
  const sliceThickness = 5; // mm
  
  // Enhanced anatomical data with more detail
  const anatomyData = [
    { name: "Superior Frontal Gyrus", region: "Frontal Lobe", function: "Executive functions, working memory" },
    { name: "Middle Frontal Gyrus", region: "Frontal Lobe", function: "Cognitive control, attention" },
    { name: "Precentral Gyrus", region: "Motor Cortex", function: "Primary motor control" },
    { name: "Corpus Callosum - Genu", region: "White Matter", function: "Interhemispheric communication" },
    { name: "Anterior Cingulate", region: "Limbic System", function: "Emotion, decision-making" },
    { name: "Caudate Nucleus", region: "Basal Ganglia", function: "Movement, learning, habit formation" },
    { name: "Anterior Putamen", region: "Basal Ganglia", function: "Motor control, procedural learning" },
    { name: "Internal Capsule", region: "White Matter", function: "Motor and sensory pathways" },
    { name: "Thalamus - Anterior", region: "Diencephalon", function: "Sensory relay, consciousness" },
    { name: "Thalamus - Ventral", region: "Diencephalon", function: "Motor relay, sensory processing" },
    { name: "Hippocampus - Head", region: "Temporal Lobe", function: "Memory formation, spatial navigation" },
    { name: "Hippocampus - Body", region: "Temporal Lobe", function: "Memory consolidation" },
    { name: "Amygdala", region: "Limbic System", function: "Fear processing, emotion" },
    { name: "Superior Temporal Gyrus", region: "Temporal Lobe", function: "Auditory processing" },
    { name: "Insula", region: "Insular Cortex", function: "Interoception, emotion" },
    { name: "Midbrain - Tectum", region: "Brainstem", function: "Visual and auditory reflexes" },
    { name: "Substantia Nigra", region: "Midbrain", function: "Movement control, dopamine" },
    { name: "Pons - Rostral", region: "Brainstem", function: "Sleep, arousal, motor control" },
    { name: "Cerebellum - Superior", region: "Cerebellum", function: "Motor coordination, balance" },
    { name: "Fourth Ventricle", region: "Ventricular System", function: "CSF circulation" },
    { name: "Medulla - Rostral", region: "Brainstem", function: "Vital functions, breathing" },
    { name: "Cerebellar Hemispheres", region: "Cerebellum", function: "Fine motor control" },
    { name: "Cerebellar Vermis", region: "Cerebellum", function: "Posture, gait" },
    { name: "Occipital Lobe - Superior", region: "Visual Cortex", function: "Primary visual processing" },
    { name: "Calcarine Fissure", region: "Visual Cortex", function: "Primary visual cortex (V1)" },
    { name: "Cuneus", region: "Occipital Lobe", function: "Visual field processing" },
    { name: "Lingual Gyrus", region: "Occipital Lobe", function: "Visual word form area" },
    { name: "Fusiform Gyrus", region: "Temporal Lobe", function: "Face recognition, reading" },
    { name: "Parahippocampal Gyrus", region: "Temporal Lobe", function: "Spatial memory, navigation" },
    { name: "Inferior Temporal Gyrus", region: "Temporal Lobe", function: "Object recognition" }
  ];

  // Create realistic brain tissue patterns
  const generateBrainTexture = useCallback((sliceIndex, quality = 'high') => {
    const canvas = document.createElement('canvas');
    const size = quality === 'high' ? 512 : 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);
    
    // Calculate slice position (0-1)
    const slicePos = sliceIndex / totalSlices;
    
    // Create brain outline (elliptical)
    const centerX = size / 2;
    const centerY = size / 2;
    const radiusX = size * 0.4;
    const radiusY = size * 0.45;
    
    // Generate tissue regions based on slice position
    const regions = [];
    
    // Gray matter (cortex)
    if (slicePos > 0.1 && slicePos < 0.9) {
      regions.push({
        type: 'gray',
        intensity: 120 + Math.sin(slicePos * Math.PI) * 40,
        thickness: 15 + slicePos * 10
      });
    }
    
    // White matter
    if (slicePos > 0.2 && slicePos < 0.8) {
      regions.push({
        type: 'white',
        intensity: 180 + Math.cos(slicePos * Math.PI * 2) * 30,
        core: true
      });
    }
    
    // Ventricles (dark CSF)
    if (slicePos > 0.3 && slicePos < 0.7) {
      regions.push({
        type: 'csf',
        intensity: 20,
        ventricles: true
      });
    }
    
    // Deep gray matter structures
    if (slicePos > 0.25 && slicePos < 0.65) {
      regions.push({
        type: 'deep_gray',
        intensity: 100 + slicePos * 50,
        structures: ['thalamus', 'basal_ganglia']
      });
    }
    
    // Draw brain outline
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.clip();
    
    // Apply gradient background
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radiusX);
    gradient.addColorStop(0, `rgba(${60 + slicePos * 100}, ${70 + slicePos * 80}, ${80 + slicePos * 60}, 0.8)`);
    gradient.addColorStop(0.7, `rgba(${40 + slicePos * 60}, ${50 + slicePos * 40}, ${60 + slicePos * 20}, 0.6)`);
    gradient.addColorStop(1, 'rgba(20, 25, 30, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Add tissue-specific patterns
    regions.forEach(region => {
      if (region.type === 'gray') {
        // Cortical gray matter
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const thickness = region.thickness * (0.8 + Math.random() * 0.4);
          const x1 = centerX + Math.cos(angle) * (radiusX - thickness);
          const y1 = centerY + Math.sin(angle) * (radiusY - thickness);
          const x2 = centerX + Math.cos(angle) * radiusX;
          const y2 = centerY + Math.sin(angle) * radiusY;
          
          ctx.strokeStyle = `rgba(${region.intensity}, ${region.intensity}, ${region.intensity}, 0.7)`;
          ctx.lineWidth = 2 + Math.random() * 3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      } else if (region.type === 'white') {
        // White matter tracts
        const tractGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radiusX * 0.6);
        tractGradient.addColorStop(0, `rgba(${region.intensity}, ${region.intensity}, ${region.intensity}, 0.9)`);
        tractGradient.addColorStop(1, `rgba(${region.intensity * 0.7}, ${region.intensity * 0.7}, ${region.intensity * 0.7}, 0.4)`);
        ctx.fillStyle = tractGradient;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX * 0.6, radiusY * 0.6, 0, 0, 2 * Math.PI);
        ctx.fill();
      } else if (region.type === 'csf') {
        // Ventricular system
        if (slicePos > 0.35 && slicePos < 0.65) {
          // Lateral ventricles
          ctx.fillStyle = `rgba(${region.intensity}, ${region.intensity}, ${region.intensity}, 0.9)`;
          ctx.beginPath();
          ctx.ellipse(centerX - 40, centerY - 20, 15, 25, 0, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(centerX + 40, centerY - 20, 15, 25, 0, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        if (slicePos > 0.4 && slicePos < 0.6) {
          // Third ventricle
          ctx.fillStyle = `rgba(${region.intensity}, ${region.intensity}, ${region.intensity}, 0.8)`;
          ctx.fillRect(centerX - 3, centerY - 10, 6, 20);
        }
      } else if (region.type === 'deep_gray') {
        // Thalamus and basal ganglia
        if (slicePos > 0.3 && slicePos < 0.6) {
          ctx.fillStyle = `rgba(${region.intensity}, ${region.intensity}, ${region.intensity}, 0.8)`;
          // Thalamus
          ctx.beginPath();
          ctx.ellipse(centerX - 25, centerY, 12, 8, 0, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(centerX + 25, centerY, 12, 8, 0, 0, 2 * Math.PI);
          ctx.fill();
          
          // Caudate and putamen
          if (slicePos > 0.25 && slicePos < 0.55) {
            ctx.beginPath();
            ctx.ellipse(centerX - 45, centerY + 10, 8, 6, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(centerX + 45, centerY + 10, 8, 6, 0, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    });
    
    // Add noise for realism
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    return canvas;
  }, [totalSlices]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
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
  }, [isPlaying, playSpeed, totalSlices]);

  // Handle wheel scrolling
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    setCurrentSlice(prev => Math.max(1, Math.min(totalSlices, prev + delta)));
  }, [totalSlices]);

  // Handle mouse drag
  const handleMouseDown = useCallback((e) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setLastY(e.clientY);
    } else if (e.button === 1) { // Middle mouse button
      setIsPanning(true);
      setLastY(e.clientY);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const deltaY = e.clientY - lastY;
      const sliceDelta = Math.round(deltaY / 10);
      if (sliceDelta !== 0) {
        setCurrentSlice(prev => Math.max(1, Math.min(totalSlices, prev + sliceDelta)));
        setLastY(e.clientY);
      }
    } else if (isPanning) {
      const deltaY = (e.clientY - lastY) * 0.5;
      setPan(prev => ({ ...prev, y: prev.y + deltaY }));
      setLastY(e.clientY);
    }
  }, [isDragging, isPanning, lastY, totalSlices]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
  }, []);

  // Touch handling for mobile
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setLastY(touch.clientY);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const deltaY = touch.clientY - lastY;
      const sliceDelta = Math.round(deltaY / 15);
      if (sliceDelta !== 0) {
        setCurrentSlice(prev => Math.max(1, Math.min(totalSlices, prev + sliceDelta)));
        setLastY(touch.clientY);
      }
    }
  }, [isDragging, lastY, totalSlices]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Render brain slice
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Generate and draw brain slice
    const brainTexture = generateBrainTexture(currentSlice - 1, imageQuality);
    
    // Apply transformations
    ctx.save();
    ctx.translate(rect.width / 2 + pan.x, rect.height / 2 + pan.y);
    ctx.scale(zoom, zoom);
    
    // Apply imaging filters
    const brightnessFilter = brightness / 100;
    const contrastFilter = contrast / 100;
    ctx.filter = `brightness(${brightnessFilter}) contrast(${contrastFilter})`;
    
    // Draw brain slice
    const size = Math.min(rect.width, rect.height) * 0.8;
    ctx.drawImage(brainTexture, -size / 2, -size / 2, size, size);
    
    ctx.restore();
    
    // Draw slice information overlay
    if (showAnnotations) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 200, 60);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`Slice ${currentSlice}/${totalSlices}`, 20, 30);
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`${((currentSlice - 1) * sliceThickness).toFixed(1)}mm`, 20, 45);
      ctx.fillText(anatomyData[currentSlice - 1]?.name || 'Unknown', 20, 60);
    }
    
  }, [currentSlice, brightness, contrast, zoom, pan, showAnnotations, generateBrainTexture, imageQuality, totalSlices, sliceThickness, anatomyData]);

  const currentAnatomy = anatomyData[currentSlice - 1] || {};

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Advanced MRI Brain Viewer</h2>
        <p className="text-blue-100">Professional-grade medical imaging viewer with real-time controls</p>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Main Viewer */}
        <div className="flex-1 p-6">
          <div 
            ref={containerRef}
            className="relative bg-black rounded-xl overflow-hidden aspect-square cursor-crosshair select-none"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ 
                imageRendering: imageQuality === 'high' ? 'auto' : 'pixelated'
              }}
            />
            
            {/* Loading indicator */}
            {isDragging && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                Slice {currentSlice}
              </div>
            )}
          </div>
          
          {/* Quick Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentSlice(Math.max(1, currentSlice - 1))}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              disabled={currentSlice === 1}
            >
              ←
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={() => setCurrentSlice(Math.min(totalSlices, currentSlice + 1))}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              disabled={currentSlice === totalSlices}
            >
              →
            </button>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="w-full lg:w-80 bg-gray-800 p-6 space-y-6">
          {/* Slice Navigation */}
          <div>
            <label className="block text-white font-medium mb-2">
              Slice Navigation ({currentSlice}/{totalSlices})
            </label>
            <input
              type="range"
              min="1"
              max={totalSlices}
              value={currentSlice}
              onChange={(e) => setCurrentSlice(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>Anterior</span>
              <span>Posterior</span>
            </div>
          </div>
          
          {/* Anatomy Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Current Structure</h3>
            <p className="text-blue-300 font-medium">{currentAnatomy.name}</p>
            <p className="text-gray-300 text-sm">{currentAnatomy.region}</p>
            <p className="text-gray-400 text-xs mt-2">{currentAnatomy.function}</p>
          </div>
          
          {/* Imaging Controls */}
          <div>
            <h3 className="text-white font-semibold mb-3">Imaging Parameters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
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
                <label className="block text-gray-300 text-sm mb-1">
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
                <label className="block text-gray-300 text-sm mb-1">
                  Zoom ({(zoom * 100).toFixed(0)}%)
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
          
          {/* Playback Controls */}
          <div>
            <h3 className="text-white font-semibold mb-3">Playback</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Speed ({playSpeed}ms)
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* View Options */}
          <div>
            <h3 className="text-white font-semibold mb-3">View Options</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showAnnotations}
                  onChange={(e) => setShowAnnotations(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-300 text-sm">Show Annotations</span>
              </label>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">Image Quality</label>
                <select
                  value={imageQuality}
                  onChange={(e) => setImageQuality(e.target.value)}
                  className="w-full bg-gray-600 text-white rounded px-2 py-1 text-sm"
                >
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Reset Button */}
          <button
            onClick={() => {
              setBrightness(100);
              setContrast(100);
              setZoom(1);
              setPan({ x: 0, y: 0 });
              setCurrentSlice(15);
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="bg-gray-700 p-4 text-sm text-gray-300">
        <strong>Controls:</strong> Scroll wheel or drag to navigate slices • Middle-click drag to pan • 
        Use sliders for image adjustments • Arrow keys for navigation
      </div>
    </div>
  );
};

export default AdvancedMRIViewer;