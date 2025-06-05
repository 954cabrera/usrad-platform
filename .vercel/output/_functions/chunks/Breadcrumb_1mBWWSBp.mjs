import { c as createComponent, e as createAstro, m as maybeRenderHead, f as addAttribute, d as renderTemplate } from './astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { paths } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-6xl mx-auto px-6 pt-8"> <nav class="text-sm font-manrope" aria-label="Breadcrumb"> <ol class="flex items-center"> ${paths.map((path, index) => renderTemplate`<li${addAttribute(index > 0 ? "flex items-center" : "", "class")}> ${index > 0 && renderTemplate`<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg>`} ${path.current ? renderTemplate`<span${addAttribute(index > 0 ? "ml-1 text-gray-600" : "text-gray-600", "class")} aria-current="page"> ${path.label} </span>` : renderTemplate`<a${addAttribute(path.href, "href")}${addAttribute(`${index > 0 ? "ml-1 " : ""}text-[#003087] hover:text-[#cc9933] relative group transition-colors`, "class")}> ${path.label} <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#cc9933] group-hover:w-full transition-all duration-300"></span> </a>`} </li>`)} </ol> </nav> </div>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/Breadcrumb.astro", void 0);

export { $$Breadcrumb as $ };
