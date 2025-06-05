/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, r as renderComponent, d as renderTemplate } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'framer-motion';
export { renderers } from '../renderers.mjs';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};
const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};
function BookingFlow() {
  const [step, setStep] = useState(1);
  const [scanType, setScanType] = useState("");
  const [zip, setZip] = useState("");
  const [matchedCenters, setMatchedCenters] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const handleMatchCenters = () => {
    setMatchedCenters([
      { name: "Imaging Center of Miami", price: "$625", distance: "2.1 mi" },
      { name: "Palm Diagnostics", price: "$580", distance: "3.4 mi" },
      { name: "CoreScan Ft. Lauderdale", price: "$640", distance: "5.0 mi" }
    ]);
    setStep(3);
  };
  const handleFormSubmit = () => {
    console.log("Submitted:", { ...formData, selectedDate });
    alert("Thank you! A representative will contact you shortly.");
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-white text-[#003087] font-manrope min-h-screen py-24 px-6", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-24 left-1/2 w-72 h-72 bg-[#cc9933] opacity-10 blur-3xl rounded-full -translate-x-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-2xl mx-auto z-10", children: [
      step === 1 && /* @__PURE__ */ jsxs(motion.div, { ...slideUp, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-[#003087]", children: "What scan do you need?" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm",
            value: scanType,
            onChange: (e) => setScanType(e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select a scan type" }),
              /* @__PURE__ */ jsx("option", { value: "mri", children: "MRI" }),
              /* @__PURE__ */ jsx("option", { value: "ct", children: "CT" }),
              /* @__PURE__ */ jsx("option", { value: "xray", children: "X-Ray" }),
              /* @__PURE__ */ jsx("option", { value: "ultrasound", children: "Ultrasound" }),
              /* @__PURE__ */ jsx("option", { value: "mammogram", children: "Mammogram" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: !scanType,
            onClick: () => setStep(2),
            className: "bg-[#003087] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#002266] focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9933] transition transform hover:scale-105",
            children: "Next"
          }
        )
      ] }),
      step === 2 && /* @__PURE__ */ jsxs(motion.div, { ...slideUp, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-[#003087]", children: "Enter your ZIP code" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "ZIP Code",
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm",
            value: zip,
            onChange: (e) => setZip(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: !zip,
            onClick: handleMatchCenters,
            className: "bg-[#003087] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#002266] focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9933] transition transform hover:scale-105",
            children: "Find Centers"
          }
        )
      ] }),
      step === 3 && /* @__PURE__ */ jsxs(motion.div, { ...fadeIn, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 text-[#003087]", children: "Top Matches Near You" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 mb-10", children: matchedCenters.map((center, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "border-l-4 border-[#cc9933] p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-[#003087] mb-1", children: center.name }),
              /* @__PURE__ */ jsx("p", { className: "text-[#cc9933] font-bold text-lg", children: center.price }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                center.distance,
                " away"
              ] })
            ]
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Full Name",
              className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value })
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "Email Address",
              className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value })
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              placeholder: "Phone Number",
              className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm",
              value: formData.phone,
              onChange: (e) => setFormData({ ...formData, phone: e.target.value })
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#cc9933] bg-white shadow-sm",
              value: selectedDate,
              onChange: (e) => setSelectedDate(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleFormSubmit,
              className: "mt-4 bg-[#cc9933] text-[#003087] px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#e6c378] focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9933] transition transform hover:scale-105",
              children: "Submit Request"
            }
          )
        ] })
      ] })
    ] })
  ] });
}

const $$Book = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<main class="min-h-screen bg-white text-[#003087]"> ${renderComponent($$result, "BookingFlow", BookingFlow, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/BookingFlow.jsx", "client:component-export": "default" })} </main>`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/book.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/book.astro";
const $$url = "/book";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Book,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
