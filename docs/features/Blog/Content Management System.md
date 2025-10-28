# USRad Blog Content Management System
## Technical Reference Documentation

**Version:** 1.0  
**Last Updated:** October 27, 2025  
**Author:** USRad Development Team  
**Purpose:** Technical reference for managing and adding content to the USRad blog

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Adding a New Blog Post](#adding-a-new-blog-post)
4. [Updating Existing Posts](#updating-existing-posts)
5. [Image Management](#image-management)
6. [Related Articles Configuration](#related-articles-configuration)
7. [Category Management](#category-management)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [File Structure Reference](#file-structure-reference)

---

## System Overview

### Purpose
The USRad blog uses a centralized data management system that:
- Maintains a single source of truth for all blog post metadata
- Automatically propagates updates across the entire site
- Displays real images in related articles sections
- Simplifies content management and reduces duplication

### Key Benefits
- **Update Once, Changes Everywhere:** Modify blog post data in one location
- **Consistency:** Ensures all references to a blog post use identical information
- **Maintainability:** Reduces the risk of outdated or conflicting information
- **Professional Appearance:** Real images instead of placeholder gradients

---

## Architecture

### Core Components

#### 1. Central Data File
**Location:** `src/data/blogPosts.js`

This file contains:
- `featuredPost` - The featured blog post object
- `blogPosts` - Array of all blog post objects
- `categories` - Array of category objects with counts
- `getRelatedPosts()` - Helper function to retrieve related articles
- `getPostBySlug()` - Helper function to find a specific post

#### 2. Main Blog Page
**Location:** `src/pages/blog.astro`

Imports and displays:
- Featured post
- All blog posts in a grid
- Category filter
- All data sourced from `blogPosts.js`

#### 3. Individual Blog Post Pages
**Location:** `src/pages/blog/[slug].astro`

Each blog post:
- Imports `getRelatedPosts()` from `blogPosts.js`
- Specifies which related posts to display
- Automatically pulls images, titles, excerpts, and metadata

---

## Adding a New Blog Post

### Step 1: Add Blog Post Data

**File:** `src/data/blogPosts.js`

Add a new object to the `blogPosts` array:

```javascript
{
  title: "Your Blog Post Title",
  excerpt: "A compelling 1-2 sentence description that appears on cards and previews.",
  author: "Author Name or USRad Healthcare Team",
  date: "Month Year (e.g., October 2025)",
  readTime: "X min read",
  category: "Category Name",
  image: "/images/blog/your-image-filename.webp",
  slug: "your-blog-post-slug",
}
```

**Field Specifications:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | String | Yes | Full blog post title (appears in cards and on page) | "How to Prepare for Your First MRI" |
| `excerpt` | String | Yes | Brief description (1-2 sentences, ~100-150 characters) | "Everything you need to know before your MRI appointment, from what to wear to managing anxiety." |
| `author` | String | Yes | Author name or "USRad Healthcare Team" | "Donna Cabrera, Co-Founder" |
| `date` | String | Yes | Publication date in "Month Year" format | "October 2025" |
| `readTime` | String | Yes | Estimated reading time | "8 min read" |
| `category` | String | Yes | Must match existing category | "Patient Guide" |
| `image` | String | Yes | Path to image file (relative to `/public`) | "/images/blog/mri-machine.webp" |
| `slug` | String | Yes | URL-friendly identifier (lowercase, hyphens only) | "first-mri-preparation-guide" |

**Category Options:**
- `"Cost & Savings"`
- `"Patient Guide"`
- `"Health & Wellness"`
- `"Innovation"`
- `"Healthcare Policy"`

### Step 2: Update Category Counts

In the same file (`blogPosts.js`), update the `categories` array:

```javascript
export const categories = [
  { name: "All Posts", count: 12, active: true }, // Increment this
  { name: "Patient Guide", count: 5 },            // Increment if applicable
  { name: "Cost & Savings", count: 3 },
  // ... etc
];
```

### Step 3: Add Image File

**Location:** `/public/images/blog/`

**Requirements:**
- Format: WebP preferred (or PNG/JPG)
- Dimensions: Minimum 800x600px (16:9 or 4:3 aspect ratio)
- File Size: Under 200KB for optimal performance
- Naming: Use descriptive kebab-case names (e.g., `mri-machine.webp`)

### Step 4: Create Blog Post Page

**Location:** `src/pages/blog/[slug].astro`

Create a new file named after your slug (e.g., `your-blog-post-slug.astro`):

```astro
---
import CarbonLayout from "../../layouts/CarbonLayout.astro";
import AOSInit from "../../components/AOSInit.astro";
import { getRelatedPosts } from "../../data/blogPosts.js";

export const prerender = true;

// Specify which related posts to show (3 slugs)
const relatedPostSlugs = [
  "related-post-slug-1",
  "related-post-slug-2",
  "related-post-slug-3"
];

// Get the full post data automatically
const relatedArticles = getRelatedPosts("your-blog-post-slug", relatedPostSlugs);
---

<CarbonLayout
  title="Your Blog Post Title | USRad"
  description="Your SEO meta description here."
>
  <AOSInit />

  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 pt-24 pb-16 overflow-hidden">
    <!-- Your hero content here -->
  </section>

  <!-- Main Article Content -->
  <article class="py-16 bg-white">
    <!-- Your article content here -->
  </article>

  <!-- Related Articles - Uses Real Images Automatically! -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8" data-aos="fade-up">
        Related Articles
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        {relatedArticles.map((post, index) => (
          <article
            class="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <a href={`/blog/${post.slug}`}>
              <div class="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-6">
                <span class="text-xs font-semibold text-[#003087] uppercase tracking-wide">
                  {post.category}
                </span>
                <h3 class="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-[#003087] transition-colors">
                  {post.title}
                </h3>
                <p class="text-gray-600 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                <div class="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <span>{post.readTime}</span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>

  <style>
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @keyframes blob {
      0%, 100% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    html {
      scroll-behavior: smooth;
    }

    .prose {
      color: #374151;
    }

    .prose p {
      margin-bottom: 1rem;
    }
  </style>
</CarbonLayout>
```

### Step 5: Test and Deploy

```bash
# Test locally
npm run dev

# Verify:
# 1. New post appears on main blog page
# 2. Images load correctly
# 3. Related articles display properly
# 4. Links work

# Build for production
npm run build

# Deploy
# (Your deployment process)
```

---

## Updating Existing Posts

### To Update Blog Post Metadata

**File:** `src/data/blogPosts.js`

Simply edit the relevant fields in the blog post object. Changes will automatically appear:
- On the main blog page
- In all related articles sections that reference this post
- In the individual blog post page (if you update the excerpt/image)

**Example: Updating an Image**

```javascript
// Before
{
  title: "How to Reduce Your Medical Imaging Expenses",
  image: "/images/blog/old-image.webp",
  // ... other fields
}

// After
{
  title: "How to Reduce Your Medical Imaging Expenses",
  image: "/images/blog/new-better-image.webp",  // ← Just change this!
  // ... other fields
}
```

The new image will automatically appear:
- On the main blog grid
- In all related articles sections
- Everywhere this post is referenced

### To Update Related Articles

**File:** `src/pages/blog/[your-post-slug].astro`

Update the `relatedPostSlugs` array:

```javascript
// Before
const relatedPostSlugs = [
  "old-related-post",
  "another-old-post",
  "third-old-post"
];

// After
const relatedPostSlugs = [
  "new-related-post",
  "better-related-post",
  "most-relevant-post"
];
```

---

## Image Management

### Image Guidelines

#### Technical Specifications
- **Format:** WebP (preferred), PNG, or JPG
- **Dimensions:** Minimum 800x600px, recommended 1200x800px
- **Aspect Ratio:** 16:9 or 4:3
- **File Size:** Under 200KB (use compression tools)
- **Color Space:** sRGB
- **Resolution:** 72 DPI (web standard)

#### Naming Convention
Use descriptive kebab-case names:
- ✅ `mri-machine-patient-comfort.webp`
- ✅ `cost-comparison-chart.webp`
- ✅ `healthcare-transparency.webp`
- ❌ `IMG_1234.jpg`
- ❌ `photo.png`
- ❌ `new image (1).webp`

#### Storage Location
All blog images must be in:
```
/public/images/blog/
```

#### Optimization Tools
- [Squoosh.app](https://squoosh.app/) - Free image compression
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Cloudinary](https://cloudinary.com/) - Image CDN and optimization

### Adding a New Image

1. Optimize the image using tools above
2. Save to `/public/images/blog/[descriptive-name].webp`
3. Reference in `blogPosts.js`: `image: "/images/blog/[descriptive-name].webp"`

### Replacing an Image

**Option 1: Keep Same Filename (Recommended)**
- Replace the file in `/public/images/blog/`
- No code changes needed
- Clear browser cache to see changes

**Option 2: New Filename**
- Add new file to `/public/images/blog/`
- Update path in `blogPosts.js`
- Delete old file to save space

---

## Related Articles Configuration

### Strategy for Choosing Related Posts

#### General Principles
1. **Relevance:** Choose posts that complement the main topic
2. **Variety:** Mix different categories when appropriate
3. **User Journey:** Consider the logical next steps for readers
4. **Balance:** Don't link only to one category

#### Category-Specific Recommendations

**Cost & Savings Posts → Link to:**
- Other cost/savings posts
- Related patient guide posts
- Healthcare policy posts

**Patient Guide Posts → Link to:**
- Other patient guide posts
- Health & wellness posts
- Relevant cost/savings posts

**Health & Wellness Posts → Link to:**
- Other wellness posts
- Patient guide posts
- Preventive care content

**Innovation Posts → Link to:**
- Patient guide posts
- Healthcare policy posts
- Future-focused content

**Healthcare Policy Posts → Link to:**
- Cost & savings posts
- Related policy posts
- Innovation posts

### Current Related Articles Matrix

| Blog Post | Related Post 1 | Related Post 2 | Related Post 3 |
|-----------|----------------|----------------|----------------|
| real-cost-of-mri | cost-saving-tips | uninsured-imaging-guide | price-transparency-healthcare |
| uninsured-imaging-guide | real-cost-of-mri | cost-saving-tips | first-mri-preparation-guide |
| first-mri-preparation-guide | managing-mri-anxiety | mri-basics | understanding-mri-results |
| managing-mri-anxiety | first-mri-preparation-guide | mri-basics | health-tips |
| future-ai-medical-imaging | understanding-mri-results | mri-basics | price-transparency-healthcare |
| understanding-mri-results | first-mri-preparation-guide | managing-mri-anxiety | mri-basics |
| price-transparency-healthcare | real-cost-of-mri | cost-saving-tips | uninsured-imaging-guide |
| cost-saving-tips | real-cost-of-mri | uninsured-imaging-guide | price-transparency-healthcare |
| health-tips | preventive-care-checklist | managing-mri-anxiety | first-mri-preparation-guide |
| mri-basics | first-mri-preparation-guide | managing-mri-anxiety | understanding-mri-results |
| preventive-care-checklist | health-tips | understanding-mri-results | future-ai-medical-imaging |

---

## Category Management

### Current Categories

| Category | Description | Count |
|----------|-------------|-------|
| All Posts | All blog posts | 11 |
| Patient Guide | MRI preparation, understanding results, managing anxiety | 4 |
| Cost & Savings | Pricing transparency, cost reduction strategies | 3 |
| Health & Wellness | General health tips, preventive care | 2 |
| Innovation | AI in imaging, future technologies | 1 |
| Healthcare Policy | Price transparency, healthcare reform | 1 |

### Adding a New Category

1. **Update `blogPosts.js`:**
```javascript
export const categories = [
  { name: "All Posts", count: 11, active: true },
  { name: "Patient Guide", count: 4 },
  { name: "Cost & Savings", count: 3 },
  { name: "Health & Wellness", count: 2 },
  { name: "Innovation", count: 1 },
  { name: "Healthcare Policy", count: 1 },
  { name: "Your New Category", count: 1 }, // ← Add here
];
```

2. **Use in blog posts:**
```javascript
{
  title: "Your Post Title",
  category: "Your New Category", // ← Use exact name
  // ... other fields
}
```

---

## Best Practices

### Content Guidelines

#### Title Best Practices
- Keep under 60 characters for SEO
- Use clear, descriptive language
- Include keywords naturally
- Front-load important words
- Use title case

**Examples:**
- ✅ "How to Prepare for Your First MRI: A Complete Guide"
- ✅ "The Real Cost of an MRI: What Hospitals Don't Want You to Know"
- ❌ "MRI Guide" (too short, not descriptive)
- ❌ "Everything You Ever Wanted to Know About Getting an MRI But Were Afraid to Ask" (too long)

#### Excerpt Best Practices
- 1-2 sentences, 100-150 characters
- Compelling and action-oriented
- Avoid generic phrases
- Include key benefit or value proposition
- End with a period (no ellipsis needed)

**Examples:**
- ✅ "Discover how artificial intelligence is improving diagnostic accuracy while reducing costs for patients."
- ✅ "Learn proven strategies to manage claustrophobia and anxiety during your scan."
- ❌ "This article talks about MRI scans." (too generic)
- ❌ "In this comprehensive guide, we'll explore everything you need to know..." (too verbose)

#### Slug Best Practices
- Use lowercase only
- Separate words with hyphens
- Keep concise (3-6 words)
- Include primary keyword
- Avoid special characters, numbers (unless necessary)

**Examples:**
- ✅ `first-mri-preparation-guide`
- ✅ `understanding-mri-results`
- ✅ `cost-saving-tips`
- ❌ `First_MRI_Guide`
- ❌ `mri-preparation-guide-2025-updated-version`

### SEO Optimization

#### Meta Titles
```astro
<CarbonLayout
  title="Your Blog Post Title | USRad"
  description="Your meta description here (150-160 characters)."
>
```

**Guidelines:**
- Include brand name: "| USRad"
- Keep total under 60 characters
- Match H1 title when possible

#### Meta Descriptions
- 150-160 characters
- Include target keyword
- Compelling call-to-action
- Unique for each page

### Performance Optimization

#### Image Optimization
- Always use WebP format when possible
- Compress images before uploading
- Use appropriate dimensions (don't upload 4K images)
- Implement lazy loading (handled by framework)

#### Code Quality
- Follow existing code style
- Keep components DRY (Don't Repeat Yourself)
- Comment complex logic
- Test on multiple devices

### Accessibility

#### Alt Text for Images
- Descriptive and concise
- Mention key details visible in image
- Don't start with "Image of..." or "Picture of..."

**Examples:**
- ✅ `alt="Modern MRI machine in medical facility"`
- ✅ `alt="Patient consultation with radiologist"`
- ❌ `alt="Image"`
- ❌ `alt="MRI"`

#### Semantic HTML
- Use proper heading hierarchy (H1 → H2 → H3)
- Include ARIA labels where appropriate
- Ensure sufficient color contrast

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Images Not Displaying

**Symptoms:**
- Broken image icon appears
- Alt text shows but no image

**Solutions:**
1. Check file path in `blogPosts.js`:
   ```javascript
   // Correct:
   image: "/images/blog/filename.webp"
   
   // Incorrect:
   image: "images/blog/filename.webp"  // Missing leading slash
   image: "/public/images/blog/filename.webp"  // Don't include /public
   ```

2. Verify file exists in `/public/images/blog/`

3. Check filename matches exactly (case-sensitive):
   - File: `MRI-Machine.webp`
   - Code: `image: "/images/blog/mri-machine.webp"` ❌ Won't work!

4. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

#### Issue: Related Articles Not Showing

**Symptoms:**
- Related articles section is empty
- Console errors about undefined posts

**Solutions:**
1. Check slug spelling in `relatedPostSlugs` array:
   ```javascript
   // Make sure slugs match exactly:
   const relatedPostSlugs = [
     "first-mri-preparation-guide",  // ✅ Correct
     "first-mri-prep-guide",          // ❌ Wrong slug
   ];
   ```

2. Verify post exists in `blogPosts.js` with that slug

3. Check that `getRelatedPosts` is imported:
   ```javascript
   import { getRelatedPosts } from "../../data/blogPosts.js";
   ```

4. Verify you're passing the correct current slug:
   ```javascript
   const relatedArticles = getRelatedPosts("current-post-slug", relatedPostSlugs);
   ```

#### Issue: Category Count Incorrect

**Symptoms:**
- Category shows wrong number
- Filter doesn't work correctly

**Solutions:**
1. Manually count posts in each category
2. Update `categories` array in `blogPosts.js`:
   ```javascript
   export const categories = [
     { name: "All Posts", count: 12, active: true },  // Total posts
     { name: "Patient Guide", count: 5 },             // Count Patient Guide posts
     // etc.
   ];
   ```

#### Issue: Changes Not Appearing on Live Site

**Symptoms:**
- Changes visible locally but not in production
- Old content still showing

**Solutions:**
1. Rebuild the project:
   ```bash
   npm run build
   ```

2. Clear Astro cache:
   ```bash
   rm -rf .astro
   npm run build
   ```

3. Check deployment status

4. Clear CDN cache (if using one)

5. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

#### Issue: Blog Post Not Appearing on Main Page

**Symptoms:**
- New post added but doesn't show on `/blog`

**Solutions:**
1. Verify post is added to `blogPosts` array in `blogPosts.js`

2. Check the post object has all required fields:
   ```javascript
   {
     title: "...",      // Required
     excerpt: "...",    // Required
     author: "...",     // Required
     date: "...",       // Required
     readTime: "...",   // Required
     category: "...",   // Required
     image: "...",      // Required
     slug: "...",       // Required
   }
   ```

3. Ensure no syntax errors (missing commas, quotes, etc.)

4. Restart dev server:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

#### Issue: Build Errors

**Symptoms:**
- `npm run build` fails
- Error messages in console

**Common Causes & Solutions:**

1. **Missing comma in blogPosts array:**
   ```javascript
   // ❌ Error:
   {
     title: "Post 1",
     slug: "post-1"
   }  // Missing comma
   {
     title: "Post 2",
     slug: "post-2"
   }
   
   // ✅ Correct:
   {
     title: "Post 1",
     slug: "post-1"
   },  // Comma added
   {
     title: "Post 2",
     slug: "post-2"
   }
   ```

2. **Incorrect import path:**
   ```javascript
   // Check the path is correct:
   import { getRelatedPosts } from "../../data/blogPosts.js";
   ```

3. **Duplicate slugs:**
   - Each slug must be unique
   - Search `blogPosts.js` for duplicate slug values

---

## File Structure Reference

### Complete Directory Structure

```
usrad-website/
├── public/
│   └── images/
│       └── blog/
│           ├── mri-cost-comparison-hero.webp
│           ├── trust-duo.webp
│           ├── patient-preparing.webp
│           ├── comfort-patient.webp
│           ├── two-rads-control-center.webp
│           ├── understanding-mri-results.png
│           ├── power-in-the-hands.webp
│           ├── cost-saving-hero.webp
│           ├── health-wellness.webp
│           ├── mri-machine.webp
│           └── preventive-care.webp
│
├── src/
│   ├── data/
│   │   └── blogPosts.js                    ← CENTRAL DATA FILE
│   │
│   ├── layouts/
│   │   └── CarbonLayout.astro
│   │
│   ├── components/
│   │   └── AOSInit.astro
│   │
│   └── pages/
│       ├── blog.astro                      ← MAIN BLOG PAGE
│       └── blog/
│           ├── cost-saving-tips.astro
│           ├── first-mri-preparation-guide.astro
│           ├── future-ai-medical-imaging.astro
│           ├── health-tips.astro
│           ├── managing-mri-anxiety.astro
│           ├── mri-basics.astro
│           ├── preventive-care-checklist.astro
│           ├── price-transparency-healthcare.astro
│           ├── real-cost-of-mri.astro
│           ├── understanding-mri-results.astro
│           └── uninsured-imaging-guide.astro
│
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

### File Relationships Diagram

```
blogPosts.js (Source of Truth)
     │
     ├─→ blog.astro (displays all posts)
     │
     └─→ Individual Blog Posts (display related articles)
          ├─→ cost-saving-tips.astro
          ├─→ first-mri-preparation-guide.astro
          ├─→ future-ai-medical-imaging.astro
          ├─→ health-tips.astro
          ├─→ managing-mri-anxiety.astro
          ├─→ mri-basics.astro
          ├─→ preventive-care-checklist.astro
          ├─→ price-transparency-healthcare.astro
          ├─→ real-cost-of-mri.astro
          ├─→ understanding-mri-results.astro
          └─→ uninsured-imaging-guide.astro
```

---

## Quick Reference Commands

### Development
```bash
# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Git Workflow
```bash
# Check status
git status

# Add changes
git add src/data/blogPosts.js
git add src/pages/blog/*.astro

# Commit changes
git commit -m "feat: add new blog post about [topic]"

# Push to remote
git push origin main
```

### Common Tasks

#### Add a New Blog Post
1. Add to `blogPosts.js`
2. Update category count
3. Add image to `/public/images/blog/`
4. Create `.astro` file in `/src/pages/blog/`
5. Configure related articles
6. Test locally
7. Commit and deploy

#### Update an Image
1. Replace file in `/public/images/blog/` OR
2. Update path in `blogPosts.js`
3. Clear cache and test

#### Change Related Articles
1. Edit `relatedPostSlugs` array in blog post file
2. Save and test

---

## Support and Maintenance

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | October 27, 2025 | Initial centralized system implementation |

### Change Log Template

When making changes, document them:

```markdown
## [Version] - YYYY-MM-DD

### Added
- New blog post: [Title]
- New category: [Category Name]
- New feature: [Description]

### Changed
- Updated image for: [Post Title]
- Modified excerpt for: [Post Title]
- Reorganized related articles for: [Post Title]

### Fixed
- Fixed broken image link in: [Post Title]
- Corrected category count
- Resolved build error in: [File Name]
```

### Maintenance Schedule

**Weekly:**
- Review and update category counts
- Check for broken image links
- Verify all related articles are relevant

**Monthly:**
- Audit blog post dates and update if needed
- Review read time estimates
- Optimize images for performance
- Update excerpts for better engagement

**Quarterly:**
- Review and refresh related articles strategy
- Analyze popular posts and adjust prominence
- Update categories if content mix changes

---

## Appendix

### Available Slugs (Current)

Copy and paste these when configuring related articles:

```
cost-saving-tips
first-mri-preparation-guide
future-ai-medical-imaging
health-tips
managing-mri-anxiety
mri-basics
preventive-care-checklist
price-transparency-healthcare
real-cost-of-mri
understanding-mri-results
uninsured-imaging-guide
```

### Template: Blog Post Object

```javascript
{
  title: "",
  excerpt: "",
  author: "",
  date: "",
  readTime: "",
  category: "",
  image: "/images/blog/",
  slug: "",
}
```

### Template: Blog Post File

See **Step 4** in [Adding a New Blog Post](#adding-a-new-blog-post) section.

---

## Contact

For technical questions or issues:
- **Development Team:** USRad Development Team
- **Documentation Updates:** Submit via Git pull request

---

**Document End**

*Last reviewed: October 27, 2025*