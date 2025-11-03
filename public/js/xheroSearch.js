// Hero Search Functionality for USRad Homepage
document.addEventListener("DOMContentLoaded", function () {
    console.log("🎯 Hero search script loaded");
  
    // Get DOM elements
    const toggleButton = document.getElementById("heroSearchToggle");
    const searchForm = document.getElementById("heroSearchForm");
    const formElement = document.getElementById("heroSearchFormElement");
    const zipInput = document.getElementById("hero-zipcode");
  
    // Toggle search form visibility
    if (toggleButton && searchForm) {
      toggleButton.addEventListener("click", function () {
        console.log("🔍 Search toggle clicked");
        const isHidden = searchForm.classList.contains("hidden");
  
        if (isHidden) {
          searchForm.classList.remove("hidden");
          searchForm.style.opacity = "0";
          searchForm.style.transform = "translateY(-20px)";
  
          // Animate in
          setTimeout(() => {
            searchForm.style.transition = "all 0.3s ease";
            searchForm.style.opacity = "1";
            searchForm.style.transform = "translateY(0)";
          }, 10);
  
          // Focus on ZIP code input
          setTimeout(() => {
            if (zipInput) zipInput.focus();
          }, 300);
        } else {
          searchForm.style.opacity = "0";
          searchForm.style.transform = "translateY(-20px)";
          setTimeout(() => {
            searchForm.classList.add("hidden");
          }, 300);
        }
      });
    }
  
    // Form submission handler
    if (formElement) {
      formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("📝 Hero search form submitted");
  
        const zipCode = document.getElementById("hero-zipcode")?.value;
        const procedure = document.getElementById("hero-procedure")?.value;
        const state = document.getElementById("hero-state")?.value;
  
        if (!zipCode || zipCode.length !== 5) {
          alert("Please enter a valid 5-digit ZIP code.");
          return;
        }
  
        // Redirect to pricing page with parameters
        const searchParams = new URLSearchParams({
          zipCode: zipCode,
          procedure: procedure,
          state: state,
          autoSearch: "true",
        });
  
        console.log("🚀 Redirecting to pricing with params:", {
          zipCode,
          procedure,
          state,
        });
  
        window.location.href = `/search-results?${searchParams.toString()}#results`;
      });
    }
  
    // Quick location buttons functionality
    const quickLocationButtons = document.querySelectorAll(".quick-location");
    quickLocationButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const zipCode = this.getAttribute("data-zip");
        const cityName = this.getAttribute("data-city");
  
        if (zipInput && zipCode) {
          zipInput.value = zipCode;
  
          // Show brief confirmation
          const originalText = this.textContent;
          this.textContent = "✓ " + cityName;
          this.style.backgroundColor = "#059669";
          this.style.color = "white";
  
          setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = "";
            this.style.color = "";
          }, 1000);
        }
      });
    });
  
    // ZIP code input validation (numbers only, max 5 digits)
    if (zipInput) {
      zipInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 5) {
          value = value.slice(0, 5);
        }
        e.target.value = value;
      });
    }
  });
  
  // Fade Animation Fix for Astro page transitions
  function fixFadeAnimation() {
    const mainContent = document.querySelector("main > div.fade");
    if (mainContent && window.getComputedStyle(mainContent).opacity === "0") {
      console.log("🔧 Fixing stuck fade animation...");
      mainContent.classList.remove("fade");
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0px)";
      console.log("✅ Homepage content restored");
    }
  }
  
  // Multiple event listeners to ensure fade animation works properly
  document.addEventListener("DOMContentLoaded", fixFadeAnimation);
  
  document.addEventListener("astro:page-load", function () {
    setTimeout(fixFadeAnimation, 10);
    setTimeout(fixFadeAnimation, 50);
    setTimeout(fixFadeAnimation, 100);
  });
  
  document.addEventListener("astro:after-swap", function () {
    setTimeout(fixFadeAnimation, 10);
  });
  
  window.addEventListener("pageshow", function (event) {
    setTimeout(fixFadeAnimation, 10);
    if (event.persisted) {
      setTimeout(fixFadeAnimation, 50);
    }
  });
  
  window.addEventListener("focus", fixFadeAnimation);
  
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      setTimeout(fixFadeAnimation, 10);
    }
  });
  
  // Auto-fix check every second as failsafe
  setInterval(function () {
    const mainContent = document.querySelector("main > div.fade");
    if (mainContent && window.getComputedStyle(mainContent).opacity === "0") {
      console.log("🔧 Auto-fixing invisible homepage...");
      fixFadeAnimation();
    }
  }, 1000);