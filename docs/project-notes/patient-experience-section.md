# The Patient Experience Section

This is a draft of the new consolidated "Patient Experience" section that combines elements from the "New Standard" and "Care That's Clear" sections:

```html
<!-- The Patient Experience Section - NEW (Consolidated) -->
<section class="py-40 bg-[#f8f2e1] text-[#003087] px-6 md:px-12" data-aos="fade-up">
  <div class="max-w-7xl mx-auto">
    <!-- Heading with ample space and subtle animation -->
    <div class="mb-20 max-w-4xl" data-aos="fade-up" data-aos-delay="100">
      <h2 class="text-5xl md:text-6xl font-semibold leading-tight mb-6">
        <span class="text-[#003087]">The Patient </span>
        <span class="text-[#cc9933] relative">
          Experience
          <svg
            class="absolute -bottom-2 left-0 w-full"
            height="6"
            viewBox="0 0 340 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 3.5C2 3.5 70 0.5 170 3.5C270 6.5 338 3.5 338 3.5"
              stroke="#cc9933"
              stroke-width="4"
              stroke-linecap="round"></path>
          </svg>
        </span>
      </h2>
      <p class="text-3xl md:text-4xl text-[#003087] font-medium leading-relaxed">
        Where clarity meets compassion
      </p>
    </div>

    <!-- Content and image with generous spacing and subtle animations -->
    <div class="grid md:grid-cols-2 gap-24 items-center">
      <div class="space-y-12" data-aos="fade-right" data-aos-delay="200">
        <p class="text-xl md:text-2xl text-[#003087] leading-relaxed">
          From your first click to final results, we've rebuilt medical imaging around clarity and confidence.
        </p>

        <!-- Key points with subtle icon indicators in Amber Gold -->
        <div class="space-y-6">
          <div class="flex items-start space-x-3 pt-2">
            <div class="w-6 h-6 rounded-full bg-[#cc9933] bg-opacity-20 flex items-center justify-center mt-1">
              <div class="w-2 h-2 rounded-full bg-[#cc9933]"></div>
            </div>
            <p class="text-xl md:text-2xl text-[#003087]">
              Transparent pricing that means no surprise bills, ever.
            </p>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-[#cc9933] bg-opacity-20 flex items-center justify-center mt-1">
              <div class="w-2 h-2 rounded-full bg-[#cc9933]"></div>
            </div>
            <p class="text-xl md:text-2xl text-[#003087]">
              Fast scheduling, often within 2-4 days of your request.
            </p>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-[#cc9933] bg-opacity-20 flex items-center justify-center mt-1">
              <div class="w-2 h-2 rounded-full bg-[#cc9933]"></div>
            </div>
            <p class="text-xl md:text-2xl text-[#003087]">
              Clear results delivery with support to understand them.
            </p>
          </div>
        </div>

        <p class="text-xl md:text-2xl text-[#003087] italic">
          Because radiology shouldn't feel clinical. It should feel <span class="text-[#cc9933]">human</span>.
        </p>

        <!-- CTA button with Amber Gold hover effect -->
        <div class="pt-8">
          <a
            href="/schedule"
            class="inline-block px-8 py-4 bg-[#003087] text-white rounded-full font-medium hover:bg-[#002266] hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#cc9933]"
          >
            Experience the Difference →
          </a>
        </div>
      </div>

      <div class="ml-auto relative" data-aos="fade-left" data-aos-delay="300">
        <!-- Image with Amber Gold styling -->
        <div class="relative">
          <div class="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-[#cc9933] opacity-10 blur-md">
          </div>
          <img
            src="/images/tech-patient.png"
            alt="Patient experience with compassionate care"
            class="w-full h-auto max-w-lg object-cover rounded-xl shadow-2xl relative z-10 border-l-4 border-[#cc9933]"
          />
          <div class="absolute -bottom-3 -right-3 w-full h-full border-4 border-[#cc9933] opacity-15 rounded-xl z-0">
          </div>
        </div>

        <!-- Callout with Amber Gold accent -->
        <div class="bg-white p-6 rounded-lg shadow-md -mt-16 ml-12 relative z-20 max-w-xs border-l-4 border-[#cc9933]">
          <p class="text-lg text-[#003087]">
            From start to scan to peace of mind—your journey is our focus.
          </p>
          <div class="w-16 h-1 bg-[#cc9933] mt-3"></div>
        </div>
      </div>
    </div>
    
    <!-- Transition to Technology section -->
    <div class="text-center mt-20">
      <p class="text-xl text-[#003087] italic">Behind every exceptional patient experience is technology you can trust.</p>
    </div>
  </div>
</section>
```

## Connecting Transitions Between Sections

These transitions will be added between sections to create a smooth narrative flow:

1. Vision → Patient Experience:
```html
<div class="text-center mt-12">
  <p class="text-xl text-[#003087] italic">This vision translates to a tangible experience for our patients...</p>
</div>
```

2. Patient Experience → Technology:
```html
<div class="text-center mt-20">
  <p class="text-xl text-[#003087] italic">Behind every exceptional patient experience is technology you can trust.</p>
</div>
```

3. Technology → Values:
```html
<div class="text-center mt-16">
  <p class="text-xl text-[#003087] italic">Our technology is guided by these core principles...</p>
</div>
```

4. Values → Team:
```html
<div class="text-center mt-16">
  <p class="text-xl text-[#003087] italic">These values are embodied by our founding team...</p>
</div>
```

5. Team → Contact/FAQ:
```html
<div class="text-center mt-16">
  <p class="text-xl text-[#003087] italic">Have questions for our team? We're here to help...</p>
</div>
```