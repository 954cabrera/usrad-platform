import React, { useState, useRef, useEffect, useCallback } from 'react';

const MultiModalViewer = () => {
  const [activeModality, setActiveModality] = useState('mri');
  const [currentSlice, setCurrentSlice] = useState(12);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(100); // Reduced from 300 for smoother playback
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const modalRef = useRef(null);
  
  // Initialize image ref after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !imageRef.current) {
      imageRef.current = new window.Image();
    }
  }, []);
  
  // Updated modality config
  const modalityConfig = {
    mri: {
      name: 'MRI',
      fullName: 'Magnetic Resonance Imaging',
      icon: '🧠',
      color: 'blue',
      totalSlices: 24,
      description: 'T1-weighted brain imaging',
      benefits: ['No radiation exposure', 'Excellent soft tissue contrast', 'Multiple imaging planes'],
      commonUses: ['Brain imaging', 'Spine evaluation', 'Joint assessment', 'Organ visualization'],
      imagePath: '/mri/patient_001/',
      sequenceType: 'T1-weighted',
      scanInfo: {
        field: '3T',
        sliceThickness: '5mm',
        acquisition: 'Axial',
        source: 'TCIA DFCI-BCH-BWH',
        status: 'Pediatric HGG Dataset'
      }
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
  
  // Anatomy data
  const anatomyData = {
    mri: [
      { name: "Vertex / Superior Parietal", function: "Top of cerebral hemispheres", intensity: "T1: Gray-white differentiation" },
      { name: "Superior Frontal Gyrus", function: "Executive functions, motor planning", intensity: "T1: Cortical gray (hypointense)" },
      { name: "Superior Parietal Lobule", function: "Spatial awareness, attention", intensity: "T1: Cortical gray (hypointense)" },
      { name: "Centrum Semiovale", function: "White matter tracts", intensity: "T1: White matter (hyperintense)" },
      { name: "Corona Radiata", function: "Projection & association fibers", intensity: "T1: White matter (hyperintense)" },
      { name: "Body of Lateral Ventricles", function: "CSF circulation", intensity: "T1: CSF (hypointense/dark)" },
      { name: "Corpus Callosum (Body)", function: "Interhemispheric connections", intensity: "T1: White matter (hyperintense)" },
      { name: "Genu of Corpus Callosum", function: "Frontal lobe connections", intensity: "T1: White matter (hyperintense)" },
      { name: "Caudate Head", function: "Basal ganglia - cognition", intensity: "T1: Gray matter (intermediate)" },
      { name: "Putamen & Globus Pallidus", function: "Motor control", intensity: "T1: Deep gray (intermediate)" },
      { name: "Thalamus", function: "Sensory relay center", intensity: "T1: Deep gray (intermediate)" },
      { name: "Internal Capsule", function: "Motor & sensory pathways", intensity: "T1: White matter (hyperintense)" },
      { name: "Third Ventricle", function: "Midline CSF space", intensity: "T1: CSF (hypointense/dark)" },
      { name: "Insula", function: "Interoception, emotion", intensity: "T1: Cortical gray (hypointense)" },
      { name: "Midbrain (Tectum)", function: "Visual & auditory reflexes", intensity: "T1: Gray matter (intermediate)" },
      { name: "Temporal Lobes", function: "Memory, language, hearing", intensity: "T1: Cortical gray (hypointense)" },
      { name: "Hippocampus", function: "Memory formation", intensity: "T1: Gray matter (intermediate)" },
      { name: "Pons (Upper)", function: "Cranial nerve nuclei", intensity: "T1: Mixed signal" },
      { name: "Cerebellum (Superior)", function: "Motor coordination", intensity: "T1: Gray/white differentiation" },
      { name: "Middle Cerebellar Peduncles", function: "Pontocerebellar fibers", intensity: "T1: White matter (hyperintense)" },
      { name: "Fourth Ventricle", function: "CSF circulation", intensity: "T1: CSF (hypointense/dark)" },
      { name: "Lower Medulla", function: "Cardiovascular control", intensity: "T1: Brainstem (intermediate)" },
      { name: "Cerebellar Hemispheres", function: "Fine motor control", intensity: "T1: Gray/white differentiation" },
      { name: "Foramen Magnum Level", function: "Skull base opening", intensity: "T1: CSF spaces (dark)" }
    ],
    ct: [],
    ultrasound: [],
    pet: []
  };
  
  // Preload all images for smooth playback
  useEffect(() => {
    if (activeModality === 'mri' && modalityConfig.mri.imagePath) {
      setImagesLoaded(false);
      const imagePromises = [];
      const tempImages = {};
      
      for (let i = 0; i <= modalityConfig.mri.totalSlices; i++) {
        const sliceNumber = i.toString().padStart(3, '0');
        const path = `${modalityConfig.mri.imagePath}slice_${sliceNumber}.webp`;
        
        const img = new Image();
        const promise = new Promise((resolve, reject) => {
          img.onload = () => {
            tempImages[i] = img;
            resolve();
          };
          img.onerror = reject;
        });
        img.src = path;
        imagePromises.push(promise);
      }
      
      Promise.all(imagePromises)
        .then(() => {
          setPreloadedImages(tempImages);
          setImagesLoaded(true);
        })
        .catch(err => {
          console.error('Failed to preload images:', err);
          setImagesLoaded(false);
        });
    }
  }, [activeModality]);
  
  // Function to get the current image
  const getCurrentImage = useCallback(() => {
    return preloadedImages[currentSlice] || null;
  }, [currentSlice, preloadedImages]);
  
  // Handle modality tab clicks
  const handleModalityClick = (key) => {
    if (key === 'mri') {
      setActiveModality(key);
      setShowComingSoon(false);
    } else {
      setShowComingSoon(true);
      // Scroll modal into view on mobile after a short delay
      setTimeout(() => {
        if (modalRef.current && window.innerWidth <= 768) {
          modalRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };
  
  // Smoother auto-play functionality with requestAnimationFrame
  useEffect(() => {
    if (isPlaying && imagesLoaded) {
      let lastTime = performance.now();
      let animationId;
      
      const animate = (currentTime) => {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= playSpeed) {
          setCurrentSlice(prev => {
            const next = prev + 1;
            if (next > modalityConfig[activeModality].totalSlices) {
              setIsPlaying(false);
              return 0;
            }
            return next;
          });
          lastTime = currentTime;
        }
        
        if (isPlaying) {
          animationId = requestAnimationFrame(animate);
        }
      };
      
      animationId = requestAnimationFrame(animate);
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [isPlaying, playSpeed, activeModality, imagesLoaded]);
  
  // Reset slice when modality changes
  useEffect(() => {
    const totalSlices = modalityConfig[activeModality].totalSlices;
    setCurrentSlice(Math.floor(totalSlices / 2));
    setIsPlaying(false);
    setImageLoadError(false);
  }, [activeModality]);
  
  // Handle wheel scrolling
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const totalSlices = modalityConfig[activeModality].totalSlices;
    setCurrentSlice(prev => Math.max(0, Math.min(totalSlices, prev + delta)));
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
        setCurrentSlice(prev => Math.max(0, Math.min(totalSlices, prev + sliceDelta)));
        setLastY(e.clientY);
      }
    }
  }, [isDragging, lastY, activeModality]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Render canvas with smooth transitions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    const currentImage = getCurrentImage();
    
    if (activeModality === 'mri' && currentImage && imagesLoaded) {
      ctx.save();
      ctx.translate(rect.width / 2 + pan.x, rect.height / 2 + pan.y);
      ctx.scale(zoom, zoom);
      
      // Apply filters
      ctx.filter = `brightness(${brightness / 100}) contrast(${contrast / 100})`;
      
      // Calculate dimensions to fit image
      const imgAspect = currentImage.width / currentImage.height;
      const canvasAspect = rect.width / rect.height;
      let drawWidth, drawHeight;
      
      if (imgAspect > canvasAspect) {
        drawWidth = rect.width * 0.8;
        drawHeight = drawWidth / imgAspect;
      } else {
        drawHeight = rect.height * 0.8;
        drawWidth = drawHeight * imgAspect;
      }
      
      // Draw the image centered with smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(
        currentImage,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
      
      ctx.restore();
    }
    
    // Draw annotations
    if (showAnnotations) {
      const config = modalityConfig[activeModality];
      const anatomy = anatomyData[activeModality][Math.min(currentSlice, anatomyData[activeModality].length - 1)];
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(10, 10, 300, 100);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`${config.name} - T1-weighted - Slice ${currentSlice}/${config.totalSlices}`, 20, 30);
      
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = '#cccccc';
      ctx.fillText('Anonymized', 20, 48);
      
      if (anatomy) {
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(anatomy.name, 20, 68);
        
        ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillStyle = '#cccccc';
        ctx.fillText(anatomy.intensity, 20, 86);
      }
    }
    
    // Loading indicator
    if (!imagesLoaded && activeModality === 'mri') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Loading images for smooth playback...', rect.width / 2, rect.height / 2);
      ctx.textAlign = 'left';
    }
    
  }, [activeModality, currentSlice, brightness, contrast, zoom, pan, showAnnotations, getCurrentImage, imagesLoaded]);
  
  const currentConfig = modalityConfig[activeModality];
  const currentAnatomy = anatomyData[activeModality][Math.min(currentSlice, anatomyData[activeModality].length - 1)];
  
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Modality Tabs */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="flex flex-wrap">
          {Object.entries(modalityConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleModalityClick(key)}
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
            <p className="text-gray-600">T1-weighted axial brain imaging</p>
            <p className="text-sm text-gray-500 mt-1">Anonymized patient data for educational purposes</p>
            {currentConfig.scanInfo && (
              <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                <p>Source: {currentConfig.scanInfo.source} | Dataset: {currentConfig.scanInfo.status}</p>
                <p>Acquisition: {currentConfig.scanInfo.field} MRI, {currentConfig.scanInfo.sliceThickness} {currentConfig.scanInfo.acquisition} slices</p>
              </div>
            )}
            {imageLoadError && activeModality === 'mri' && (
              <p className="text-red-600 text-sm mt-2">
                ⚠️ Unable to load image. Please check image path.
              </p>
            )}
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
              style={{ imageRendering: 'auto' }}
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
              onClick={() => setCurrentSlice(Math.max(0, currentSlice - 1))}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={currentSlice === 0}
            >
              ←
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={!imagesLoaded}
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
              min="0"
              max={currentConfig.totalSlices}
              value={currentSlice}
              onChange={(e) => setCurrentSlice(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          {/* Anatomy Info */}
          {currentAnatomy && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Current Structure</h4>
              <p className="text-blue-700 font-medium">{currentAnatomy.name}</p>
              <p className="text-gray-600 text-sm mt-1">{currentAnatomy.function}</p>
              <p className="text-gray-500 text-xs mt-2">{currentAnatomy.intensity}</p>
            </div>
          )}
          
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
              
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Animation Speed
                </label>
                <select
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={500}>Slow (0.5s)</option>
                  <option value={300}>Normal (0.3s)</option>
                  <option value={150}>Fast (0.15s)</option>
                  <option value={100}>Smooth (0.1s)</option>
                  <option value={50}>Very Smooth (0.05s)</option>
                </select>
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
          
          {/* Scan Information */}
          {currentConfig.scanInfo && (
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scan Information</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Field Strength:</span>
                  <span className="text-gray-800">{currentConfig.scanInfo.field}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Slice Thickness:</span>
                  <span className="text-gray-800">{currentConfig.scanInfo.sliceThickness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orientation:</span>
                  <span className="text-gray-800">{currentConfig.scanInfo.acquisition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset:</span>
                  <span className="text-gray-800">{currentConfig.scanInfo.status}</span>
                </div>
              </div>
            </div>
          )}
          
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
              setCurrentSlice(Math.floor(currentConfig.totalSlices / 2));
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
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
        <div className="text-xs text-gray-500 mt-2 text-center">
          Data courtesy of The Cancer Imaging Archive (TCIA) | For educational demonstration only
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center transform transition-all"
            style={{ 
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                We're working hard to bring you additional imaging modalities. CT, Ultrasound, and PET viewers will be available in the near future.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Back to MRI Viewer
                </button>
                <button
                  onClick={() => window.open('mailto:info@usradiology.com?subject=Interest%20in%20Additional%20Imaging%20Modalities', '_blank')}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #3B82F6;
          cursor: pointer;
          border-radius: 50%;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3B82F6;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default MultiModalViewer;