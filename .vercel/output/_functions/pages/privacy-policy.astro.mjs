/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
export { renderers } from '../renderers.mjs';

const $$PrivacyPolicy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Privacy Policy | USRad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-6 max-w-4xl mx-auto text-[#003087]"> <h1 class="text-4xl font-bold mb-8 text-center">Privacy Policy</h1> <p class="mb-6 italic text-center">Effective Date: May 13, 2025</p> <p class="mb-4">
USRad is committed to protecting your privacy. This Privacy Policy
      describes how we collect, use, and protect your information when you visit
      our website.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2> <ul class="list-disc list-inside mb-4"> <li> <strong>Contact Information:</strong> When you reach out through forms or
        email, we may collect your name, email, phone number, and message.
</li> <li> <strong>Technical Data:</strong> We may gather non-identifying data such
        as browser type, IP address, device type, and visited pages.
</li> </ul> <h2 class="text-2xl font-semibold mt-8 mb-2">
2. How We Use Your Information
</h2> <ul class="list-disc list-inside mb-4"> <li>To respond to inquiries</li> <li>To improve website performance and usability</li> <li>To maintain site security</li> </ul> <p class="mb-4">
We do not sell or rent your personal data. We may share data with trusted
      service providers strictly for website functionality and analytics.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">3. Cookies & Tracking</h2> <p class="mb-4">
Our website may use cookies and analytics tools to enhance your
      experience. You can adjust cookie settings in your browser.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">4. Data Security</h2> <p class="mb-4">
We use encrypted connections (HTTPS) and secure hosting to help protect
      your data from unauthorized access or misuse.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">5. External Links</h2> <p class="mb-4">
Links to other websites are provided for convenience. We are not
      responsible for the content or privacy practices of those sites.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">6. Children’s Privacy</h2> <p class="mb-4">
Our website is not intended for children under 13. We do not knowingly
      collect personal information from minors.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">7. Your Choices</h2> <p class="mb-4">
You can request to view, update, or delete your information by contacting
      us using the details below.
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">8. Contact Information</h2> <p class="mb-4">
USRad<br> <!-- [Insert Business Address or P.O. Box] //<br /-->
Email: <a href="mailto:privacy@usrad.com" class="text-[#cc9933] underline">privacy@usrad.com</a><br>
Phone: 1-800-USRad-24
</p> <h2 class="text-2xl font-semibold mt-8 mb-2">9. Policy Updates</h2> <p class="mb-4">
We may update this Privacy Policy periodically. The latest version will
      always be available on this page.
</p> </section> ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/privacy-policy.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/privacy-policy.astro";
const $$url = "/privacy-policy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PrivacyPolicy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
