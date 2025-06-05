/* empty css                                    */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$PatientDashboardLayout } from '../../chunks/PatientDashboardLayout_JI_N5E37.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Copy, Facebook, Twitter, Mail, Share, Users, Trophy } from 'lucide-react';
import { v as validateAuthSession } from '../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
  /* @__PURE__ */ jsx("div", { className: "usrad-card p-8 bg-gradient-to-r from-gray-200 to-gray-100 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-300 rounded-lg w-72 mx-auto mb-3 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-300 rounded-lg w-96 mx-auto animate-pulse" })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-48 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded w-24 animate-pulse" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-4 mb-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-300 h-4 rounded-full w-2/5 animate-pulse" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded w-8 mx-auto animate-pulse" })
    ] }, i)) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-32 mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded-lg mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 rounded w-24 animate-pulse" }, i)) })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-300 rounded w-40 mb-4 animate-pulse" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-200 rounded-full animate-pulse" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-300 rounded w-24 mb-1 animate-pulse" }),
          /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-16 animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 rounded-full w-20 animate-pulse" })
    ] }, i)) })
  ] }),
  /* @__PURE__ */ jsx("style", { jsx: true, children: `
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-pulse {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s ease-in-out infinite;
      }
    ` })
] });
const SkeletonReferralsSystem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [referralCode, setReferralCode] = useState("SARAH2024");
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1e3);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsx(SkeletonLoader, {});
  }
  const friends = [
    { name: "Jessica Miller", status: "Signed Up", earnings: "$25", avatar: "👩" },
    { name: "Mike Rodriguez", status: "First Scan", earnings: "$50", avatar: "👨" },
    { name: "Anna Chen", status: "Pending", earnings: "$0", avatar: "👩" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .usrad-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 48, 135, 0.08);
          transition: all 0.3s ease;
        }
        .usrad-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform: translateY(-4px);
        }
        .usrad-navy { color: #003087; }
        .usrad-gold { color: #cc9933; }
        .usrad-gradient-navy { background: linear-gradient(135deg, #003087 0%, #001a4d 100%); }
        .usrad-gradient-gold { background: linear-gradient(135deg, #cc9933 0%, #e6b84d 100%); }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8 usrad-gradient-navy text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-3", children: "Referral Rewards Program" }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xl", children: "Share USRad with friends and earn credits for every successful referral" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold usrad-navy", children: "Your Progress" }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold usrad-gold", children: "$75" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "Credits Earned" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "2 of 5 referrals to $100 credit" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "3 more to go!" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-4", children: /* @__PURE__ */ jsx("div", { className: "usrad-gradient-gold h-4 rounded-full transition-all duration-1000", style: { width: "40%" } }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${i <= 2 ? "usrad-gradient-gold text-white" : "bg-gray-200 text-gray-400"}`, children: i <= 2 ? "✓" : i }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: i <= 2 ? "$25" : "$25" })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-yellow-800", children: "🎉 Almost There!" }),
        /* @__PURE__ */ jsx("div", { className: "text-yellow-700", children: "Refer 3 more friends to unlock your $100 credit bonus!" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Share Your Referral Code" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: referralCode,
            readOnly: true,
            className: "flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg font-mono text-lg font-bold text-center"
          }
        ),
        /* @__PURE__ */ jsxs("button", { className: "px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center", children: [
          /* @__PURE__ */ jsx(Copy, { className: "w-5 h-5 mr-2" }),
          "Copy"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Facebook, { className: "w-5 h-5 mr-2" }),
          "Facebook"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Twitter, { className: "w-5 h-5 mr-2" }),
          "Twitter"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 mr-2" }),
          "Email"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(Share, { className: "w-5 h-5 mr-2" }),
          "More"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Your Referrals" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: friends.map((friend, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl", children: friend.avatar }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: friend.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: friend.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold usrad-gold", children: friend.earnings }),
          /* @__PURE__ */ jsx("div", { className: `text-xs px-2 py-1 rounded-full ${friend.status === "First Scan" ? "bg-green-100 text-green-800" : friend.status === "Signed Up" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`, children: friend.status })
        ] })
      ] }, index)) }),
      friends.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-gray-400 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-600", children: "No referrals yet" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: "Share your code to start earning!" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "Community Leaderboard" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
        { rank: 1, name: "Maria G.", referrals: 12, badge: "🥇" },
        { rank: 2, name: "John D.", referrals: 8, badge: "🥈" },
        { rank: 3, name: "Sarah J.", referrals: 6, badge: "🥉" },
        { rank: 4, name: "You", referrals: 2, badge: "⭐" }
      ].map((user) => /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between p-3 rounded-lg ${user.name === "You" ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl", children: user.badge }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: `font-semibold ${user.name === "You" ? "usrad-navy" : ""}`, children: [
              "#",
              user.rank,
              " ",
              user.name
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
              user.referrals,
              " successful referrals"
            ] })
          ] })
        ] }),
        user.name === "You" && /* @__PURE__ */ jsx(Trophy, { className: "w-6 h-6 usrad-gold" })
      ] }, user.rank)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "usrad-card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold usrad-navy mb-4", children: "How Referrals Work" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-navy rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3", children: "1" }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Share Your Code" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Send your unique referral code to friends and family" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 usrad-gradient-gold rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3", children: "2" }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "They Book & Save" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Your friends get their first scan and save money" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3", children: "3" }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "You Earn Credits" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Get $25 credit for each successful referral" })
        ] })
      ] })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/patientlogin");
  }
  return renderTemplate`${renderComponent($$result, "PatientDashboardLayout", $$PatientDashboardLayout, { "title": "Referrals", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "SkeletonReferralsSystem", SkeletonReferralsSystem, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/patient-dashboard/SkeletonReferralsSystem", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/referrals/index.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/patient-dashboard/referrals/index.astro";
const $$url = "/patient-dashboard/referrals";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
