import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RevenueFlywheel = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Flywheel data
  const flywheelSteps = [
    {
      id: 1,
      title: "Competitive Pricing",
      subtitle: "100% Medicare rates",
      color: "#003087",
      accentColor: "#cc9933"
    },
    {
      id: 2,
      title: "Higher Volume",
      subtitle: "Top marketplace placement",
      color: "#003087",
      accentColor: "#cc9933"
    },
    {
      id: 3,
      title: "Physician Exposure",
      subtitle: "Quality reputation spreads",
      color: "#003087",
      accentColor: "#cc9933"
    },
    {
      id: 4,
      title: "New Relationships",
      subtitle: "Doctors send all cases",
      color: "#003087",
      accentColor: "#cc9933"
    },
    {
      id: 5,
      title: "Better Payor Mix",
      subtitle: "Private insurance cases",
      color: "#003087",
      accentColor: "#cc9933"
    }
  ];

  // Calculate positions for desktop layout (pentagon)
  const calculatePosition = (index, total, radius) => {
    // Start from the top (270 degrees in radians) and go clockwise
    const angle = (Math.PI * 2 * index / total) - (Math.PI / 2);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 1.5
      }
    }
  };

  const centerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Render desktop (circular) layout
  const renderDesktopLayout = () => {
    const radius = 180; // Distance from center
    const boxWidth = 180;
    const boxHeight = 100;
    const centerSize = 80;
    
    return (
      <div className="relative w-full h-[600px] mx-auto">
        <motion.div
          className="absolute inset-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Center hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
            variants={centerVariants}
            animate="pulse"
          >
            <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#cc9933] to-[#e6c378] rounded-full flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="text-white font-bold text-sm leading-tight">Revenue</div>
                <div className="text-white font-bold text-sm leading-tight">Growth</div>
              </div>
            </div>
          </motion.div>

          {/* Flywheel boxes */}
          {flywheelSteps.map((step, index) => {
            const position = calculatePosition(index, flywheelSteps.length, radius);
            
            return (
              <motion.div
                key={step.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  top: `calc(50% + ${position.y}px)`,
                  left: `calc(50% + ${position.x}px)`,
                  width: `${boxWidth}px`
                }}
                variants={itemVariants}
              >
                <div className="bg-[#003087] text-white px-6 py-4 rounded-lg shadow-lg relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#cc9933] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.id}
                  </div>
                  <h4 className="font-bold text-lg">{step.title}</h4>
                  <p className="text-sm mt-1 opacity-90">{step.subtitle}</p>
                </div>
              </motion.div>
            );
          })}

          {/* SVG for arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5" viewBox="0 0 600 600">
            <defs>
              <marker
                id="arrowGold"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#cc9933"></polygon>
              </marker>
            </defs>

            {/* Arrow from 1 to 2 */}
            <motion.path
              d="M 300 150 Q 400 200 450 300"
              stroke="#cc9933"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowGold)"
              strokeDasharray="6,3"
              variants={arrowVariants}
            />

            {/* Arrow from 2 to 3 */}
            <motion.path
              d="M 450 300 Q 400 400 350 450"
              stroke="#cc9933"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowGold)"
              strokeDasharray="6,3"
              variants={arrowVariants}
            />

            {/* Arrow from 3 to 4 */}
            <motion.path
              d="M 350 450 Q 250 480 150 450"
              stroke="#cc9933"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowGold)"
              strokeDasharray="6,3"
              variants={arrowVariants}
            />

            {/* Arrow from 4 to 5 */}
            <motion.path
              d="M 150 450 Q 100 400 150 300"
              stroke="#cc9933"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowGold)"
              strokeDasharray="6,3"
              variants={arrowVariants}
            />

            {/* Arrow from 5 to 1 */}
            <motion.path
              d="M 150 300 Q 200 200 300 150"
              stroke="#cc9933"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowGold)"
              strokeDasharray="6,3"
              variants={arrowVariants}
            />
          </svg>
        </motion.div>
      </div>
    );
  };

  // Render mobile (vertical) layout
  const renderMobileLayout = () => {
    return (
      <motion.div
        className="flex flex-col gap-6 max-w-sm mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Center hub at the top */}
        <motion.div
          className="self-center mb-4"
          variants={centerVariants}
          animate="pulse"
        >
          <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#cc9933] to-[#e6c378] rounded-full flex items-center justify-center shadow-xl">
            <div className="text-center">
              <div className="text-white font-bold text-sm leading-tight">Revenue</div>
              <div className="text-white font-bold text-sm leading-tight">Growth</div>
            </div>
          </div>
        </motion.div>

        {/* Flywheel steps in vertical order */}
        {flywheelSteps.map((step, index) => (
          <div key={step.id} className="relative">
            <motion.div
              className="bg-[#003087] text-white px-6 py-4 rounded-lg shadow-lg relative"
              variants={itemVariants}
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#cc9933] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.id}
              </div>
              <h4 className="font-bold text-lg">{step.title}</h4>
              <p className="text-sm mt-1 opacity-90">{step.subtitle}</p>
            </motion.div>
            
            {/* Connecting arrows (except for the last item) */}
            {index < flywheelSteps.length - 1 && (
              <motion.div 
                className="h-8 w-8 mx-auto my-2"
                variants={arrowVariants}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path 
                    d="M16 4L16 24M16 24L8 16M16 24L24 16" 
                    stroke="#cc9933" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeDasharray="6,3"
                  />
                </svg>
              </motion.div>
            )}
            
            {/* Connect last to first with curved arrow */}
            {index === flywheelSteps.length - 1 && (
              <motion.div 
                className="h-16 w-full mx-auto my-2 relative"
                variants={arrowVariants}
              >
                <svg width="100%" height="64" viewBox="0 0 200 64" fill="none">
                  <path 
                    d="M100 4C140 4 160 60 100 60C40 60 60 4 100 4Z" 
                    stroke="#cc9933" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeDasharray="6,3"
                    fill="none"
                  />
                  <polygon 
                    points="100,0 96,8 104,8" 
                    fill="#cc9933" 
                    transform="rotate(90, 100, 4)"
                  />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="w-full overflow-hidden py-8">
      {isMobile ? renderMobileLayout() : renderDesktopLayout()}
    </div>
  );
};

export default RevenueFlywheel;
