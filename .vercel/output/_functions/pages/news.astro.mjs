/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import { $ as $$Breadcrumb } from '../chunks/Breadcrumb_1mBWWSBp.mjs';
export { renderers } from '../renderers.mjs';

const $$News = createComponent(($$result, $$props, $$slots) => {
  const breadcrumbPaths = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "News",
      href: "/news",
      current: true
    }
  ];
  const newsArticles = [
    {
      title: "USRad Expands Network to 50 States",
      date: "Coming Soon",
      excerpt: "This article will provide details about USRad's national expansion...",
      image: "/images/placeholder-news-1.jpg"
    },
    {
      title: "New Technology Integration Enhances Patient Experience",
      date: "Coming Soon",
      excerpt: "Learn about our latest technology initiatives that improve the patient experience...",
      image: "/images/placeholder-news-2.jpg"
    },
    {
      title: "USRad Announces Partnership with Leading Medical Institutions",
      date: "Coming Soon",
      excerpt: "Details about our strategic partnerships with healthcare leaders...",
      image: "/images/placeholder-news-3.jpg"
    }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "News & Updates | USRad", "data-astro-cid-5kj6t6lp": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Breadcrumb", $$Breadcrumb, { "paths": breadcrumbPaths, "data-astro-cid-5kj6t6lp": true })} ${maybeRenderHead()}<div class="max-w-6xl mx-auto px-6 py-12" data-astro-cid-5kj6t6lp> <div class="text-center mb-12" data-astro-cid-5kj6t6lp> <h1 class="text-4xl font-bold text-[#003087] mb-4" data-astro-cid-5kj6t6lp>News & Updates</h1> <div class="bg-[#cc9933] text-white font-semibold py-2 px-6 rounded-full inline-block mb-6" data-astro-cid-5kj6t6lp>
Coming Soon
</div> <p class="text-xl text-gray-700 max-w-3xl mx-auto" data-astro-cid-5kj6t6lp>
Our news section is currently under development. Soon, you'll find the
        latest updates about USRad and innovations in medical imaging.
</p> </div> <div class="grid md:grid-cols-3 gap-8 mt-12" data-astro-cid-5kj6t6lp> ${newsArticles.map((article) => renderTemplate`<div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-astro-cid-5kj6t6lp> <div class="bg-gray-200 h-48 flex items-center justify-center" data-astro-cid-5kj6t6lp> <div class="text-gray-400 text-sm" data-astro-cid-5kj6t6lp>
Featured Image Coming Soon
</div> </div> <div class="p-6" data-astro-cid-5kj6t6lp> <div class="text-sm text-[#cc9933] font-semibold mb-2" data-astro-cid-5kj6t6lp> ${article.date} </div> <h3 class="text-xl font-semibold text-[#003087] mb-3" data-astro-cid-5kj6t6lp> ${article.title} </h3> <p class="text-gray-600 mb-4" data-astro-cid-5kj6t6lp>${article.excerpt}</p> <div class="border-t border-gray-100 pt-4 mt-4 flex justify-end" data-astro-cid-5kj6t6lp> <span class="text-[#003087] font-medium" data-astro-cid-5kj6t6lp>Read More →</span> </div> </div> </div>`)} </div> <div class="text-center mt-16" data-astro-cid-5kj6t6lp> <a href="/contact" class="bg-[#003087] text-white py-3 px-8 rounded-full font-semibold inline-block transition-all hover:bg-[#002266] hover:shadow-lg" data-astro-cid-5kj6t6lp>
Contact Us for More Information
</a> </div> </div> ` })} `;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/news.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/news.astro";
const $$url = "/news";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$News,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
