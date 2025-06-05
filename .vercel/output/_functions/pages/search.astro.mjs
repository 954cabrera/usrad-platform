/* empty css                                 */
import { c as createComponent, e as createAstro, m as maybeRenderHead, f as addAttribute, d as renderTemplate, g as renderScript, r as renderComponent, b as renderSlot } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import { $ as $$AOSInit, b as $$Footer } from '../chunks/Footer_DMjklgAz.mjs';
import { $ as $$ChatbotToggle } from '../chunks/ChatbotToggle_C34OpM7j.mjs';
import 'clsx';
/* empty css                                  */
import { c as centersData } from '../chunks/centers_CbD1UXJx.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$CenterCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CenterCard;
  const {
    id,
    name,
    city,
    state,
    distance,
    price,
    study,
    availability,
    bodyArea = "",
    scanType = ""
  } = Astro2.props;
  const scheduleUrl = `/schedule?center=${id}&study=${encodeURIComponent(study)}&bodyArea=${encodeURIComponent(bodyArea)}&scanType=${encodeURIComponent(scanType)}`;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition hover:shadow-md" data-aos="fade-up"> <div class="flex justify-between items-start"> <div> <h3 class="font-semibold text-lg text-[#003087]">${name}</h3> <p class="text-gray-600 text-sm">${city}, ${state}</p> </div> <span class="text-gray-500 text-sm">${distance} miles away</span> </div> <div class="mt-3 flex justify-between"> <div> <p class="text-xl font-bold text-green-600">$${price}</p> <p class="text-gray-500 text-xs">All-inclusive price</p> </div> <div class="text-right"> <p class="text-gray-600 text-sm">${availability}</p> </div> </div> <div class="mt-4 flex justify-between items-center"> <button type="button" class="text-blue-600 hover:text-blue-800 text-sm font-medium" onclick="alert('Information about what\'s included in the price would appear here.')">
What's Included?
</button> <a${addAttribute(scheduleUrl, "href")} class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
Schedule Now →
</a> </div> </div>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/CenterCard.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Map = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Map;
  const {
    centers = [],
    centerLat = 28.5383,
    centerLng = -81.3792,
    zoom = 10
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<!-- Correct Map container -->", '<div id="centers-map" class="w-full h-[400px] rounded-xl border border-gray-200 shadow-sm overflow-hidden" data-astro-cid-kbkfje74></div> <!-- Inject centers data separately --> <script type="application/json" id="centers-data">\n  {JSON.stringify(centers)}\n<\/script> ', " "])), maybeRenderHead(), renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/Map.astro?astro&type=script&index=0&lang.ts"));
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/Map.astro", void 0);

const $$Astro = createAstro();
const $$Search = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const { searchParams } = Astro2.url;
  const sort = searchParams.get("sort") || "price";
  const page = parseInt(searchParams.get("page") || "1");
  const study = searchParams.get("study") || "MRI";
  const city = searchParams.get("city") || "";
  const scanType = searchParams.get("scanType") || "";
  const bodyArea = searchParams.get("bodyArea") || "";
  let filteredCenters = centersData.filter((center) => {
    if (!center.studies_offered.includes(study)) return false;
    if (city && center.city !== city) return false;
    if (scanType && !center.scan_types_available.includes(scanType)) return false;
    if (bodyArea && !center.body_parts.some((part) => part.toLowerCase().includes(bodyArea.toLowerCase()))) return false;
    return true;
  });
  filteredCenters = filteredCenters.map((center) => ({
    ...center,
    distance: (Math.random() * 29 + 1).toFixed(1)
  }));
  if (sort === "price") {
    filteredCenters.sort((a, b) => a.prices[study] - b.prices[study]);
  } else if (sort === "distance") {
    filteredCenters.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  }
  const centersPerPage = 10;
  const totalPages = Math.ceil(filteredCenters.length / centersPerPage);
  const startIndex = (page - 1) * centersPerPage;
  const endIndex = startIndex + centersPerPage;
  const paginatedCenters = filteredCenters.slice(startIndex, endIndex);
  function getPaginationUrl(pageNum) {
    const url = new URL(Astro2.request.url);
    url.searchParams.set("page", pageNum.toString());
    return url.pathname + url.search;
  }
  function getSortUrl(sortType) {
    const url = new URL(Astro2.request.url);
    url.searchParams.set("sort", sortType);
    url.searchParams.set("page", "1");
    return url.pathname + url.search;
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AOSInit", $$AOSInit, {})} ${maybeRenderHead()}<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"> <section class="text-center mb-10" data-aos="fade-up"> <h1 class="text-3xl font-bold text-[#003087] mb-2">Available Centers Near You</h1> <p class="text-gray-600 max-w-3xl mx-auto">
Compare trusted imaging centers, review rates, and schedule your scan today.
</p> </section> ${filteredCenters.length === 0 ? renderTemplate`<div class="text-center py-12" data-aos="fade-up"> <div class="bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto"> <h2 class="text-xl font-semibold text-gray-800 mb-2">No Centers Found</h2> <p class="text-gray-600 mb-6">We couldn't find any centers matching your search. Please adjust your filters.</p> <a href="/locations" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
Back to Search
</a> </div> </div>` : renderTemplate`<div class="flex flex-col lg:flex-row gap-6"> <!-- Map + Center List --> <div class="lg:w-2/3 order-2 lg:order-1" data-aos="fade-up"> <!-- Sort Controls --> <div class="flex justify-end mb-4"> <select id="sortOrder" name="sortOrder" class="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onchange="window.location.href=this.value"> <option${addAttribute(getSortUrl("price"), "value")}${addAttribute(sort === "price", "selected")}>Sort by: Price</option> <option${addAttribute(getSortUrl("distance"), "value")}${addAttribute(sort === "distance", "selected")}>Sort by: Distance</option> </select> </div> <!-- Map --> <div class="mb-6" data-aos="fade-up"> ${renderComponent($$result2, "Map", $$Map, { "centers": paginatedCenters.map((center) => ({
    id: center.id ?? 0,
    name: center.name ?? "Unknown Center",
    latitude: center.latitude ?? 0,
    longitude: center.longitude ?? 0,
    price: center.prices?.[study] ?? 0,
    study
  })) })} </div> <!-- Centers List --> <div class="space-y-4 mb-8"> ${paginatedCenters.map((center) => renderTemplate`${renderComponent($$result2, "CenterCard", $$CenterCard, { "id": center.id, "name": center.name, "city": center.city, "state": center.state, "distance": center.distance, "price": center.prices[study], "study": study, "availability": center.appointment_availability, "bodyArea": bodyArea, "scanType": scanType })}`)} </div> <!-- Pagination --> ${totalPages > 1 && renderTemplate`<div class="flex justify-center items-center space-x-4 mt-8"> <a${addAttribute(page > 1 ? getPaginationUrl(page - 1) : "#", "href")} class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
Previous
</a> <span class="text-gray-600 font-medium">Page ${page} of ${totalPages}</span> <a${addAttribute(page < totalPages ? getPaginationUrl(page + 1) : "#", "href")} class="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">
Next
</a> </div>`} </div> <!-- Sidebar --> <div class="lg:w-1/3 order-1 lg:order-2" data-aos="fade-up" data-aos-delay="100"> <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"> <h2 class="text-lg font-semibold text-gray-800 mb-4">Your Search</h2> <div class="space-y-3"> <div><span class="text-gray-500 text-sm">Scan Type:</span><p class="font-medium">${study}</p></div> ${bodyArea && renderTemplate`<div><span class="text-gray-500 text-sm">Body Area:</span><p class="font-medium">${bodyArea}</p></div>`} ${scanType && renderTemplate`<div><span class="text-gray-500 text-sm">Scan Details:</span><p class="font-medium">${scanType}</p></div>`} ${city && renderTemplate`<div><span class="text-gray-500 text-sm">Location:</span><p class="font-medium">${city}</p></div>`} <div class="pt-4"> <a href="/locations" class="text-blue-600 hover:text-blue-700 text-sm flex items-center">
Modify Search
</a> </div> </div> </div> </div> </div>`} </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "ChatbotToggle", $$ChatbotToggle, { "chatbotLabel": "\u{1F4AC} Let's Talk" })} `, "title": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"], renderTemplate`Search Results | USRad`)}` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/search.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
