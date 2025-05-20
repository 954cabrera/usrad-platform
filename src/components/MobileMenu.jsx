// src/components/MobileMenu.jsx

import React from "react";

export default function MobileMenu({ onClose }) {
  return (
    <div className="bg-white border-t border-[#e6c378] p-4 shadow-lg">
      <nav className="flex flex-col space-y-4 text-[#003087] text-sm font-medium">
        <a href="/about" onClick={onClose}>About</a>
        <a href="/how-it-works" onClick={onClose}>How It Works</a>
        <a href="/locations" onClick={onClose}>Locations</a>
        <a href="/pricing" onClick={onClose}>Pricing</a>
        <a href="/contact" onClick={onClose}>Contact</a>
      </nav>
    </div>
  );
}
