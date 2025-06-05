import { c as createComponent, e as createAstro, d as renderTemplate, b as renderSlot, f as addAttribute, m as maybeRenderHead } from './astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$FadeIn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FadeIn;
  const { effect = "fade", delay = 0 } = Astro2.props;
  const effectClass = `fade-in ${effect} delay-${delay}`;
  return renderTemplate(_a || (_a = __template(["", "<div", " data-astro-cid-yr3rhc52> ", ' </div>  <script type="module">\n  const observer = new IntersectionObserver(\n    (entries) => {\n      for (const entry of entries) {\n        if (entry.isIntersecting) {\n          entry.target.classList.add("is-visible");\n          observer.unobserve(entry.target);\n        }\n      }\n    },\n    { threshold: 0.2 }\n  );\n\n  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));\n<\/script>'])), maybeRenderHead(), addAttribute(effectClass, "class"), renderSlot($$result, $$slots["default"]));
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/FadeIn.astro", void 0);

export { $$FadeIn as $ };
