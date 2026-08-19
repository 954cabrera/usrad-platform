// src/data/blogPosts.js
// Centralized blog post data - update once, use everywhere

export const featuredPost = {
  title: "The Real Cost of an MRI: What Hospitals Don't Want You to Know",
  excerpt:
    "A $3,000 hospital MRI or a $260 USRad scan—what's the difference? Everything, and nothing. Discover how to avoid overpriced imaging without sacrificing quality.",
  author: "Michael Cabrera",
  authorRole: "Co-Founder, USRad",
  date: "August 5, 2025",
  readTime: "6 min read",
  category: "Cost & Savings",
  image: "/images/blog/cost-comparison.webp",
  slug: "real-cost-of-mri",
};

export const blogPosts = [
  {
    title: "The Biggest Diagnostic Error Isn't a Misread Scan. It's the Scan That Never Happens.",
    excerpt:
      "Quality-measurement vendors are right that radiology isn't a commodity. But for millions of Americans, the real diagnostic failure is never getting imaged at all. A founder's essay on the access problem in medical imaging.",
    author: "Michael Cabrera, Co-Founder & President",
    date: "April 24, 2026",
    readTime: "8 min read",
    category: "Industry Perspective",
    image: "/images/blog/power-in-the-hands.webp",
    slug: "the-scan-that-never-happens",
  },
  {
    title:
      "Medical Imaging Without Insurance: A Practical Guide to Getting the Scan You Need",
    excerpt:
      "If you're uninsured or on a high-deductible plan, here's how imaging is priced and what to ask before you book an MRI, CT scan, or ultrasound.",
    author: "Donna Cabrera, Co-Founder",
    date: "August 3, 2025",
    readTime: "5 min read",
    category: "Cost & Savings",
    image: "/images/blog/trust-duo.webp",
    slug: "uninsured-imaging-guide",
  },
  {
    title: "How to Prepare for Your First MRI: A Complete Guide",
    excerpt:
      "Everything you need to know before your MRI appointment, from what to wear to managing anxiety.",
    author: "USRad Healthcare Team",
    date: "April 10, 2025",
    readTime: "6 min read",
    category: "Patient Guide",
    image: "/images/blog/tech-patient.webp",
    slug: "first-mri-preparation-guide",
  },
  {
    title: "Overcoming MRI Anxiety & Claustrophobia",
    excerpt:
      "Feeling anxious about your MRI? Learn proven strategies to manage claustrophobia and anxiety during your scan.",
    author: "USRad Healthcare Team",
    date: "May 15, 2025",
    readTime: "8 min read",
    category: "Patient Guide",
    image: "/images/blog/comfort-patient.webp",
    slug: "managing-mri-anxiety",
  },
  {
    title: "The Future of AI in Medical Imaging",
    excerpt:
      "How artificial intelligence is improving diagnostic accuracy while reducing costs for patients.",
    author: "USRad Healthcare Team",
    date: "September 5, 2025",
    readTime: "9 min read",
    category: "Innovation",
    image: "/images/blog/two-rads-control-center.webp",
    slug: "future-ai-medical-imaging",
  },
  {
    title: "Understanding Your MRI Results: A Patient's Guide",
    excerpt:
      "Demystifying medical terminology and helping you understand what your imaging results mean.",
    author: "USRad Healthcare Team",
    date: "July 3, 2025",
    readTime: "8 min read",
    category: "Patient Guide",
    image: "/images/blog/understanding-mri-results.png",
    slug: "understanding-mri-results",
  },
  {
    title: "Why Price Transparency Matters in Healthcare",
    excerpt:
      "The movement toward upfront pricing and how it's revolutionizing patient care decisions.",
    author: "USRad Healthcare Team",
    date: "October 27, 2025",
    readTime: "7 min read",
    category: "Healthcare Policy",
    image: "/images/blog/power-in-the-hands.webp",
    slug: "price-transparency-healthcare",
  },
  {
    title: "How to Reduce Your Medical Imaging Expenses",
    excerpt:
      "Discover proven strategies to save hundreds—even thousands—on MRIs, CT scans, ultrasounds, and X-rays without sacrificing quality.",
    author: "USRad Healthcare Team",
    date: "July 2025",
    readTime: "10 min read",
    category: "Cost & Savings",
    image: "/images/blog/patient-reviewing-cost.webp",
    slug: "cost-saving-tips",
  },
  {
    title: "Essential Health Tips for Better Living",
    excerpt:
      "Science-backed wellness advice from medical experts to help you stay healthy, prevent illness, and make informed healthcare decisions.",
    author: "USRad Healthcare Team",
    date: "May 2025",
    readTime: "8 min read",
    category: "Health & Wellness",
    image: "/images/blog/healthy-lifestyle.webp",
    slug: "health-tips",
  },
  {
    title: "Everything You Need to Know About MRI Scans",
    excerpt:
      "A comprehensive guide to understanding MRI technology, what to expect during your scan, and how to prepare for the best results.",
    author: "USRad Healthcare Team",
    date: "June 2025",
    readTime: "12 min read",
    category: "Patient Guide",
    image: "/images/blog/modern-mri.webp",
    slug: "mri-basics",
  },
  {
    title: "The Ultimate Preventive Care Checklist",
    excerpt:
      "Stay healthy with regular screenings and check-ups. This comprehensive guide tells you exactly which tests you need at every age.",
    author: "USRad Healthcare Team",
    date: "August 2025",
    readTime: "15 min read",
    category: "Health & Wellness",
    image: "/images/blog/checklist.webp",
    slug: "preventive-care-checklist",
  },
];

export const categories = [
  { name: "All Posts", count: 11, active: true },
  { name: "Patient Guide", count: 4 },
  { name: "Cost & Savings", count: 3 },
  { name: "Health & Wellness", count: 2 },
  { name: "Industry Perspective", count: 1 },
  { name: "Innovation", count: 1 },
  { name: "Healthcare Policy", count: 1 },
];

// Helper function to get related posts by slug
export function getRelatedPosts(currentSlug, relatedSlugs) {
  return relatedSlugs
    .map(slug => {
      // Check if it's the featured post
      if (slug === featuredPost.slug) {
        return featuredPost;
      }
      // Otherwise find in blogPosts array
      return blogPosts.find(post => post.slug === slug);
    })
    .filter(post => post !== undefined);
}

// Helper function to get a single post by slug
export function getPostBySlug(slug) {
  if (slug === featuredPost.slug) {
    return featuredPost;
  }
  return blogPosts.find(post => post.slug === slug);
}