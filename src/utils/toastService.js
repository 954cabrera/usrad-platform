export function showToast(message, type = "success", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white text-sm transition-opacity duration-300 ease-in-out animate-fade-in-out
      ${type === "error" ? "bg-red-600" : "bg-green-600"}`;
    toast.textContent = message;
  
    document.body.appendChild(toast);
  
    // Trigger animation
    toast.style.opacity = "0";
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
    });
  
    // Auto-remove
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }
  