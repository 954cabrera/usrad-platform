import { useEffect, useRef, useState } from "react";

const TOTAL_SLICES = 60;
const LABELED_SLICES = {
  10: "Frontal Lobe",
  20: "Corpus Callosum",
  30: "Lateral Ventricles",
  40: "Cerebellum"
};

export default function MRISliceViewer() {
  const containerRef = useRef(null);
  const [currentSlice, setCurrentSlice] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const images = useRef([]);
  const labelImages = useRef({});

  useEffect(() => {
    // Load image slices
    for (let i = 0; i < TOTAL_SLICES; i++) {
      const img = new Image();
      img.src = `/mri/brain_${String(i + 1).padStart(3, "0")}.webp`;
      images.current[i] = img;
    }

    // Load labeled SVGs
    for (const index of Object.keys(LABELED_SLICES)) {
      const svg = new Image();
      svg.src = `/mri/labels/label_${String(index).padStart(3, "0")}.svg`;
      labelImages.current[index] = svg;
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slice = String(currentSlice + 1).padStart(3, "0");
    const baseImg = images.current[currentSlice];
    const labelImg = labelImages.current[currentSlice + 1];

    if (baseImg) {
      container.innerHTML = "";
      container.appendChild(baseImg.cloneNode());
      if (showLabels && labelImg) {
        labelImg.style.position = "absolute";
        labelImg.style.top = 0;
        labelImg.style.left = 0;
        labelImg.style.width = "100%";
        labelImg.style.height = "100%";
        labelImg.style.pointerEvents = "none";
        container.appendChild(labelImg);
      }
    }
  }, [currentSlice, showLabels]);

  const updateSlice = (delta) => {
    setCurrentSlice((prev) => Math.max(0, Math.min(TOTAL_SLICES - 1, prev + delta)));
  };

  const onWheel = (e) => {
    e.preventDefault();
    updateSlice(e.deltaY > 0 ? 1 : -1);
  };

  const onTouch = useRef({ y: 0 });
  const handleTouchStart = (e) => {
    onTouch.current.y = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => {
    const diff = e.touches[0].clientY - onTouch.current.y;
    if (Math.abs(diff) > 10) {
      updateSlice(diff > 0 ? -1 : 1);
      onTouch.current.y = e.touches[0].clientY;
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onWheel={onWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="w-full h-full overflow-hidden relative"
      />
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="px-3 py-1 text-xs rounded-md bg-white/80 hover:bg-white text-gray-800 shadow"
        >
          {showLabels ? "Hide Labels" : "Show Labels"}
        </button>
      </div>
    </div>
  );
}
