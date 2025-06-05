import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DyFzNMxF.mjs';
import { manifest } from './manifest_C7ajddiH.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/accessibility.astro.mjs');
const _page3 = () => import('./pages/api/auth/login.astro.mjs');
const _page4 = () => import('./pages/api/auth/logout.astro.mjs');
const _page5 = () => import('./pages/api/auth/verify.astro.mjs');
const _page6 = () => import('./pages/api/check-psa-status.astro.mjs');
const _page7 = () => import('./pages/api/docuseal/create-submission-embedded.astro.mjs');
const _page8 = () => import('./pages/api/docuseal/create-template.astro.mjs');
const _page9 = () => import('./pages/api/docuseal.astro.mjs');
const _page10 = () => import('./pages/api/docuseal-webhook.astro.mjs');
const _page11 = () => import('./pages/api/facilities/search.astro.mjs');
const _page12 = () => import('./pages/api/hello.astro.mjs');
const _page13 = () => import('./pages/api/provider/signup.astro.mjs');
const _page14 = () => import('./pages/background-test.astro.mjs');
const _page15 = () => import('./pages/book.astro.mjs');
const _page16 = () => import('./pages/careers.astro.mjs');
const _page17 = () => import('./pages/co-founder.astro.mjs');
const _page18 = () => import('./pages/contact.astro.mjs');
const _page19 = () => import('./pages/corporate-dashboard.astro.mjs');
const _page20 = () => import('./pages/dashboard/analytics.astro.mjs');
const _page21 = () => import('./pages/dashboard/appointments.astro.mjs');
const _page22 = () => import('./pages/dashboard/center.astro.mjs');
const _page23 = () => import('./pages/dashboard/onboarding/facilities.astro.mjs');
const _page24 = () => import('./pages/dashboard/onboarding/psa.astro.mjs');
const _page25 = () => import('./pages/dashboard/onboarding.astro.mjs');
const _page26 = () => import('./pages/dashboard/patient.astro.mjs');
const _page27 = () => import('./pages/dashboard/psa/completed.astro.mjs');
const _page28 = () => import('./pages/dashboard/referral.astro.mjs');
const _page29 = () => import('./pages/dashboard/reports.astro.mjs');
const _page30 = () => import('./pages/dashboard/settings.astro.mjs');
const _page31 = () => import('./pages/dashboard.astro.mjs');
const _page32 = () => import('./pages/employer/schedule.astro.mjs');
const _page33 = () => import('./pages/employer.astro.mjs');
const _page34 = () => import('./pages/faq.astro.mjs');
const _page35 = () => import('./pages/faq4.astro.mjs');
const _page36 = () => import('./pages/form-submitted.astro.mjs');
const _page37 = () => import('./pages/founder.astro.mjs');
const _page38 = () => import('./pages/how-it-works.astro.mjs');
const _page39 = () => import('./pages/imaging-center/apply.astro.mjs');
const _page40 = () => import('./pages/imaging-center/benefits.astro.mjs');
const _page41 = () => import('./pages/imaging-center/calculator.astro.mjs');
const _page42 = () => import('./pages/imaging-center/coming-soon.astro.mjs');
const _page43 = () => import('./pages/imaging-center/experience.astro.mjs');
const _page44 = () => import('./pages/imaging-center/faq.astro.mjs');
const _page45 = () => import('./pages/imaging-center/implementation.astro.mjs');
const _page46 = () => import('./pages/imaging-center/model.astro.mjs');
const _page47 = () => import('./pages/imaging-center/schedule.astro.mjs');
const _page48 = () => import('./pages/imaging-center/support.astro.mjs');
const _page49 = () => import('./pages/imaging-center.astro.mjs');
const _page50 = () => import('./pages/investor.astro.mjs');
const _page51 = () => import('./pages/locations.astro.mjs');
const _page52 = () => import('./pages/login/imaginglogin.astro.mjs');
const _page53 = () => import('./pages/login/patientlogin.astro.mjs');
const _page54 = () => import('./pages/login/referrallogin.astro.mjs');
const _page55 = () => import('./pages/login.astro.mjs');
const _page56 = () => import('./pages/managed-care.astro.mjs');
const _page57 = () => import('./pages/news.astro.mjs');
const _page58 = () => import('./pages/our-approach.astro.mjs');
const _page59 = () => import('./pages/partner-experience.astro.mjs');
const _page60 = () => import('./pages/partner1.astro.mjs');
const _page61 = () => import('./pages/partner2.astro.mjs');
const _page62 = () => import('./pages/patient-dashboard/appointments.astro.mjs');
const _page63 = () => import('./pages/patient-dashboard/billing.astro.mjs');
const _page64 = () => import('./pages/patient-dashboard/booking.astro.mjs');
const _page65 = () => import('./pages/patient-dashboard/education.astro.mjs');
const _page66 = () => import('./pages/patient-dashboard/profile.astro.mjs');
const _page67 = () => import('./pages/patient-dashboard/referrals.astro.mjs');
const _page68 = () => import('./pages/patient-dashboard/reports.astro.mjs');
const _page69 = () => import('./pages/patient-dashboard/support.astro.mjs');
const _page70 = () => import('./pages/patient-dashboard.astro.mjs');
const _page71 = () => import('./pages/press-kit.astro.mjs');
const _page72 = () => import('./pages/privacy-policy.astro.mjs');
const _page73 = () => import('./pages/provider-signup.astro.mjs');
const _page74 = () => import('./pages/schedule.astro.mjs');
const _page75 = () => import('./pages/search.astro.mjs');
const _page76 = () => import('./pages/technology.astro.mjs');
const _page77 = () => import('./pages/terms-of-service.astro.mjs');
const _page78 = () => import('./pages/test.api.astro.mjs');
const _page79 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/accessibility.astro", _page2],
    ["src/pages/api/auth/login.ts", _page3],
    ["src/pages/api/auth/logout.ts", _page4],
    ["src/pages/api/auth/verify.ts", _page5],
    ["src/pages/api/check-psa-status.ts", _page6],
    ["src/pages/api/docuseal/create-submission-embedded.ts", _page7],
    ["src/pages/api/docuseal/create-template.js", _page8],
    ["src/pages/api/docuseal.ts", _page9],
    ["src/pages/api/docuseal-webhook.ts", _page10],
    ["src/pages/api/facilities/search.js", _page11],
    ["src/pages/api/hello.ts", _page12],
    ["src/pages/api/provider/signup.ts", _page13],
    ["src/pages/background-test.astro", _page14],
    ["src/pages/book.astro", _page15],
    ["src/pages/careers.astro", _page16],
    ["src/pages/co-founder.astro", _page17],
    ["src/pages/contact.astro", _page18],
    ["src/pages/corporate-dashboard/index.astro", _page19],
    ["src/pages/dashboard/analytics.astro", _page20],
    ["src/pages/dashboard/appointments.astro", _page21],
    ["src/pages/dashboard/center.astro", _page22],
    ["src/pages/dashboard/onboarding/facilities.astro", _page23],
    ["src/pages/dashboard/onboarding/psa.astro", _page24],
    ["src/pages/dashboard/onboarding/index.astro", _page25],
    ["src/pages/dashboard/patient.astro", _page26],
    ["src/pages/dashboard/psa/completed.astro", _page27],
    ["src/pages/dashboard/referral.astro", _page28],
    ["src/pages/dashboard/reports.astro", _page29],
    ["src/pages/dashboard/settings.astro", _page30],
    ["src/pages/dashboard/index.astro", _page31],
    ["src/pages/employer/schedule.astro", _page32],
    ["src/pages/employer.astro", _page33],
    ["src/pages/faq.astro", _page34],
    ["src/pages/faq4.astro", _page35],
    ["src/pages/form-submitted.astro", _page36],
    ["src/pages/founder.astro", _page37],
    ["src/pages/how-it-works.astro", _page38],
    ["src/pages/imaging-center/apply.astro", _page39],
    ["src/pages/imaging-center/benefits.astro", _page40],
    ["src/pages/imaging-center/calculator.astro", _page41],
    ["src/pages/imaging-center/coming-soon.astro", _page42],
    ["src/pages/imaging-center/experience.astro", _page43],
    ["src/pages/imaging-center/faq.astro", _page44],
    ["src/pages/imaging-center/implementation.astro", _page45],
    ["src/pages/imaging-center/model.astro", _page46],
    ["src/pages/imaging-center/schedule.astro", _page47],
    ["src/pages/imaging-center/support.astro", _page48],
    ["src/pages/imaging-center/index.astro", _page49],
    ["src/pages/investor.astro", _page50],
    ["src/pages/locations.astro", _page51],
    ["src/pages/login/imaginglogin.astro", _page52],
    ["src/pages/login/patientlogin.astro", _page53],
    ["src/pages/login/referrallogin.astro", _page54],
    ["src/pages/login/index.astro", _page55],
    ["src/pages/managed-care.astro", _page56],
    ["src/pages/news.astro", _page57],
    ["src/pages/our-approach.astro", _page58],
    ["src/pages/partner-experience.astro", _page59],
    ["src/pages/partner1.astro", _page60],
    ["src/pages/partner2.astro", _page61],
    ["src/pages/patient-dashboard/appointments/index.astro", _page62],
    ["src/pages/patient-dashboard/billing/index.astro", _page63],
    ["src/pages/patient-dashboard/booking/index.astro", _page64],
    ["src/pages/patient-dashboard/education/index.astro", _page65],
    ["src/pages/patient-dashboard/profile/index.astro", _page66],
    ["src/pages/patient-dashboard/referrals/index.astro", _page67],
    ["src/pages/patient-dashboard/reports/index.astro", _page68],
    ["src/pages/patient-dashboard/support/index.astro", _page69],
    ["src/pages/patient-dashboard/index.astro", _page70],
    ["src/pages/press-kit.html", _page71],
    ["src/pages/privacy-policy.astro", _page72],
    ["src/pages/provider-signup.astro", _page73],
    ["src/pages/schedule.astro", _page74],
    ["src/pages/search.astro", _page75],
    ["src/pages/technology.astro", _page76],
    ["src/pages/terms-of-service.astro", _page77],
    ["src/pages/test.api.ts", _page78],
    ["src/pages/index.astro", _page79]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0c5d5d2c-8c43-45cf-9f07-92c9d8c0806a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
