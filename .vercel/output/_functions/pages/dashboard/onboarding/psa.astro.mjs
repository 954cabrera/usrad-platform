/* empty css                                       */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_gZIsqg2i.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Building, Mail, Shield, User, Calendar, FileText, Phone, Clock, Download, PenTool } from 'lucide-react';
import { B as Badge, C as Card, a as CardContent, P as Progress, A as Alert, b as AlertTitle, c as AlertDescription, d as CardHeader, e as CardTitle, f as CardDescription, g as Button } from '../../../chunks/button_CchWNAiu.mjs';
import { v as validateAuthSession } from '../../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../../renderers.mjs';

const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50", children: [
  /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] text-white relative overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "relative max-w-4xl mx-auto p-8 animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-white/20 rounded-lg w-96 mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-white/15 rounded w-80" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-8 bg-white/20 rounded-full w-28" })
  ] }) }) }),
  /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 -mt-4 relative z-10", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-none", children: /* @__PURE__ */ jsxs("div", { className: "p-6 animate-pulse", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-blue-200 rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full mb-6", children: /* @__PURE__ */ jsx("div", { className: "h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-1/4" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between max-w-4xl mx-auto", children: [...Array(4)].map((_, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: `w-16 h-16 rounded-full border-2 shadow-lg ${index === 0 ? "bg-gradient-to-r from-blue-200 to-blue-300" : "bg-gradient-to-r from-gray-200 to-gray-300"}` }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-2" })
        ] }),
        index < 3 && /* @__PURE__ */ jsx("div", { className: "w-16 h-1 mx-4 rounded-full bg-gray-300" })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white p-6 rounded-t-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-white/20 rounded w-64 mb-2" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/15 rounded w-80" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-8 animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-24 mb-1" }),
              /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32" })
            ] })
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-20 mb-1" }),
              /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28" })
            ] })
          ] }, i)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: `border-l-4 ${i === 0 ? "border-l-blue-500 bg-gradient-to-br from-blue-50 to-white" : i === 1 ? "border-l-green-500 bg-gradient-to-br from-green-50 to-white" : i === 2 ? "border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white" : "border-l-red-500 bg-gradient-to-br from-red-50 to-white"} shadow-xl rounded-xl animate-pulse`, children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-3", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full mr-3 shadow-md ${i === 0 ? "bg-gradient-to-r from-blue-200 to-blue-300" : i === 1 ? "bg-gradient-to-r from-green-200 to-green-300" : i === 2 ? "bg-gradient-to-r from-yellow-200 to-yellow-300" : "bg-gradient-to-r from-red-200 to-red-300"}` }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-1" }),
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5" })
        ] })
      ] }) }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl border-2 rounded-xl animate-pulse", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-gradient-to-r from-green-200 to-green-300 rounded mr-3" }),
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-green-200 to-green-300 rounded w-48" }),
          /* @__PURE__ */ jsx("div", { className: "h-6 bg-gradient-to-r from-green-300 to-green-400 rounded-full w-16 ml-4" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gradient-to-r from-green-200 to-green-300 rounded mr-2" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-gradient-to-r from-green-200 to-green-300 rounded w-32" })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48" }),
        /* @__PURE__ */ jsx("div", { className: "h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-1" })
      ] })
    ] })
  ] })
] });
const PSASigningSystemUpdated = ({ providerData = {} }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [psaData] = useState({
    providerId: "PROV-2025-001",
    providerName: providerData?.facilityName || "Advanced Imaging Center",
    email: providerData?.email || "admin@advancedimaging.com",
    phone: providerData?.phone || "(954) 555-0123",
    taxId: providerData?.taxId || "12-3456789",
    effectiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    psaVersion: "USRad Standard Agreement v1.0",
    generatedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    facilityName: providerData?.facilityName || "Advanced Imaging Center of Davie",
    totalLocations: providerData?.totalLocations || "1",
    contactName: providerData?.contactName || "Dr. John Smith",
    signerTitle: providerData?.signerTitle || "Medical Director"
  });
  const [docuSealData, setDocuSealData] = useState({
    submissionId: null,
    documentUrl: null,
    signedDocumentUrl: null,
    templateId: "1155842",
    status: "draft"
  });
  const [signingStatus, setSigningStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("terms-review");
  const [error, setError] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const generatePSADocument = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🚀 Starting PSA generation...");
      const response = await fetch("/api/docuseal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          templateId: docuSealData.templateId,
          providerData: psaData
        })
      });
      console.log("📡 API Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      console.log("✅ API Result:", result);
      const embedUrl = result.embed_src || result.submitters?.[0]?.embed_src;
      console.log("🔗 Embed URL:", embedUrl);
      setDocuSealData({
        ...docuSealData,
        submissionId: result.id,
        documentUrl: embedUrl,
        status: "awaiting_signature"
      });
      setCurrentStep("sign");
      setSigningStatus("signing");
      console.log("✅ Successfully set up signing step with URL:", embedUrl);
    } catch (error2) {
      console.error("Error generating PSA:", error2);
      setError(error2.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "docuseal:completed") {
        setSigningStatus("completed");
        setCurrentStep("completed");
        setDocuSealData((prev) => ({
          ...prev,
          status: "completed",
          signedDocumentUrl: event.data.documentUrl
        }));
      }
    };
    let pollInterval;
    if (currentStep === "sign" && docuSealData.submissionId) {
      pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/check-psa-status?submissionId=${docuSealData.submissionId}`);
          if (response.ok) {
            const result = await response.json();
            if (result.status === "completed") {
              setSigningStatus("completed");
              setCurrentStep("completed");
              console.log("✅ PSA completion detected via polling");
            }
          }
        } catch (error2) {
          console.error("Error polling PSA status:", error2);
        }
      }, 1e4);
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [currentStep, docuSealData.submissionId]);
  const getStepIcon = (step) => {
    const iconClass = "w-6 h-6";
    switch (step) {
      case "terms-review":
        return /* @__PURE__ */ jsx(FileText, { className: iconClass });
      case "review":
        return /* @__PURE__ */ jsx(User, { className: iconClass });
      case "sign":
        return /* @__PURE__ */ jsx(PenTool, { className: iconClass });
      case "completed":
        return /* @__PURE__ */ jsx(CheckCircle, { className: iconClass });
      default:
        return /* @__PURE__ */ jsx(Clock, { className: iconClass });
    }
  };
  const getStepStatus = (step) => {
    const steps = ["terms-review", "review", "sign", "completed"];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("style", { children: `
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .animate-pulse {
            animation: shimmer 2s infinite linear;
            background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
            background-size: 200px;
          }
        ` }),
      /* @__PURE__ */ jsx(SkeletonLoader, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] text-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-4xl mx-auto p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-2 text-white drop-shadow-sm", children: "Provider Service Agreement" }),
          /* @__PURE__ */ jsxs("p", { className: "text-blue-100 text-lg", children: [
            "Complete your PSA signing process with ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-white", children: psaData.facilityName })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-500 text-yellow-900 font-semibold px-4 py-2", children: "IN PROGRESS" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6 -mt-4 relative z-10", children: [
      /* @__PURE__ */ jsx(Card, { className: "mb-8 border-none shadow-xl bg-white/95 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: "Progress" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-600", children: "25% Complete" })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: 25, className: "mb-6 h-2" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between max-w-4xl mx-auto", children: ["terms-review", "review", "sign", "completed"].map((step, index) => {
          const status = getStepStatus(step);
          const stepLabels = {
            "terms-review": "Review Agreement",
            "review": "Provider Info",
            "sign": "Digital Signature",
            "completed": "Completed"
          };
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: `
                        flex items-center justify-center w-16 h-16 rounded-full border-2 shadow-lg
                        ${status === "completed" ? "bg-green-500 border-green-500 text-white" : status === "current" ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-200 border-gray-300 text-gray-500"}
                      `, children: status === "completed" ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8" }) : getStepIcon(step) }),
              /* @__PURE__ */ jsx("p", { className: `text-sm font-semibold mt-2 text-center ${status === "current" ? "text-blue-600" : status === "completed" ? "text-green-600" : "text-gray-500"}`, children: stepLabels[step] })
            ] }),
            index < 3 && /* @__PURE__ */ jsx("div", { className: `w-16 h-1 mx-4 rounded-full ${getStepStatus(["terms-review", "review", "sign", "completed"][index + 1]) === "completed" ? "bg-green-500" : "bg-gray-300"}` })
          ] }, step);
        }) })
      ] }) }),
      error && /* @__PURE__ */ jsxs(Alert, { className: "mb-6 border-red-200 bg-red-50", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-red-600" }),
        /* @__PURE__ */ jsx(AlertTitle, { className: "text-red-800", children: "Error" }),
        /* @__PURE__ */ jsx(AlertDescription, { className: "text-red-700", children: error })
      ] }),
      currentStep === "terms-review" && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-xl bg-white/95 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white", children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center text-xl", children: [
              /* @__PURE__ */ jsx(Building, { className: "w-6 h-6 mr-3" }),
              "Provider Service Agreement Details"
            ] }),
            /* @__PURE__ */ jsxs(CardDescription, { className: "text-blue-100", children: [
              "Complete healthcare partnership agreement for ",
              psaData.facilityName
            ] })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Provider Name" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 text-lg", children: psaData.providerName })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Email" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.email })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Tax ID" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.taxId })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Contact Person" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.contactName })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Effective Date" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.effectiveDate })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "PSA Version" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.psaVersion })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Phone" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.phone })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Building, { className: "w-5 h-5 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1", children: "Total Locations" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: psaData.totalLocations })
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-l-4 border-l-red-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-red-50 to-white transform hover:-translate-y-1", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg text-red-900 flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 shadow-md", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-white" }) }),
                "Term & Termination"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-red-700 font-semibold", children: "Article V" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: "Initial 1-year term with automatic renewal. 60-day notice for termination without cause. 30-day cure period for material breaches." }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-l-4 border-l-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-white transform hover:-translate-y-1", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg text-blue-900 flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", children: "$" }) }),
                "Compensation"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-blue-700 font-semibold", children: "Article IV" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: "Default rate: 100% of Medicare Allowable (Technical + Professional Components). Rates represent global fees including both professional and technical components, with USRad as sole payer." }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-l-4 border-l-green-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-white transform hover:-translate-y-1", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg text-green-900 flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 shadow-md", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-white" }) }),
                "Provider Responsibilities"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-green-700 font-semibold", children: "Article II" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: "Maintain licenses, CAQH credentialing, professional liability insurance ($1M/$3M), general liability ($1M/$2M), and submit electronic claims within 60 days." }) })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-l-4 border-l-yellow-500 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-white transform hover:-translate-y-1", children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
              /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg text-yellow-900 flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-md", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-white" }) }),
                "Payment Terms"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-yellow-700 font-semibold", children: "Article IV" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: "Consumer services: 10 business days. Insurance-based services: 30 days after USRad receipt of payor funds. No balance billing permitted - USRad is sole payer." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl border-2", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-green-800 font-bold flex items-center", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-green-600 mr-3" }),
            "DocuSeal Integration Status",
            /* @__PURE__ */ jsx(Badge, { className: "ml-4 bg-green-500 text-white font-semibold", children: "ACTIVE" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm text-green-700", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-2 text-green-500" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Template ID: ",
                docuSealData.templateId
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-2 text-green-500" }),
              /* @__PURE__ */ jsx("span", { children: "API configured" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-2 text-green-500" }),
              /* @__PURE__ */ jsx("span", { children: "Field mapping complete" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 mr-2 text-green-500" }),
              /* @__PURE__ */ jsx("span", { children: "Ready for signing workflow" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex items-center hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
            "Download PDF Preview"
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => setCurrentStep("review"),
              className: "flex-1 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] hover:from-[#1e3a8a] hover:to-[#2563eb] shadow-lg hover:shadow-xl transition-all duration-200 text-white",
              children: [
                /* @__PURE__ */ jsx(PenTool, { className: "w-4 h-4 mr-2" }),
                "Proceed to Sign Agreement"
              ]
            }
          )
        ] })
      ] }),
      currentStep === "review" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { className: "shadow-xl", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(User, { className: "w-5 h-5 mr-2" }),
            "Provider Information"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Provider Name" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: psaData.providerName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Contact Email" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: psaData.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Phone" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: psaData.phone })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Tax ID" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: psaData.taxId })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Signer" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-900", children: [
                psaData.contactName,
                " - ",
                psaData.signerTitle
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Effective Date" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: psaData.effectiveDate })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-blue-50 border-blue-200 shadow-xl", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-blue-900", children: "Ready to Generate Your PSA?" }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-blue-700 mb-4", children: "This will create your Provider Service Agreement document using DocuSeal. Please review the information above before proceeding." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: generatePSADocument,
                disabled: loading,
                className: "bg-blue-600 hover:bg-blue-700 text-white",
                children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Generating Document..."
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(PenTool, { className: "w-4 h-4 mr-2" }),
                  "Generate & Sign PSA"
                ] })
              }
            )
          ] })
        ] })
      ] }),
      currentStep === "sign" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(Alert, { className: "border-yellow-200 bg-yellow-50", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-yellow-600" }),
          /* @__PURE__ */ jsx(AlertTitle, { className: "text-yellow-800", children: "Sign Your Document" }),
          /* @__PURE__ */ jsxs(AlertDescription, { className: "text-yellow-700", children: [
            "Please review and sign your PSA document below.",
            docuSealData.documentUrl && /* @__PURE__ */ jsxs("span", { className: "block text-sm mt-1", children: [
              "Loading: ",
              docuSealData.documentUrl
            ] })
          ] })
        ] }),
        docuSealData.documentUrl ? /* @__PURE__ */ jsxs(Card, { className: "shadow-xl", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "bg-gray-50", children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "DocuSeal Signing Interface" }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              "Submission ID: ",
              docuSealData.submissionId
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Ready to Sign Your PSA" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Your Provider Service Agreement is ready for review and signature. Click below to open the document in a new tab." }),
            /* @__PURE__ */ jsx(Button, { asChild: true, className: "bg-blue-600 hover:bg-blue-700 text-white", children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: docuSealData.documentUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: [
                  /* @__PURE__ */ jsx(PenTool, { className: "w-5 h-5 mr-2" }),
                  "Open Document to Sign"
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-3", children: "Opens in a new tab • Secure DocuSeal interface" })
          ] })
        ] }) : /* @__PURE__ */ jsxs(Alert, { className: "border-red-200 bg-red-50", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-red-600" }),
          /* @__PURE__ */ jsx(AlertTitle, { className: "text-red-800", children: "Error" }),
          /* @__PURE__ */ jsx(AlertDescription, { className: "text-red-700", children: "No document URL received. Check console for details." })
        ] })
      ] }),
      currentStep === "completed" && /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { className: "bg-green-50 border-green-200 shadow-xl", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-16 h-16 text-green-600 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-green-900 mb-2", children: "PSA Completed Successfully!" }),
          /* @__PURE__ */ jsx("p", { className: "text-green-700 mb-4", children: "Your Provider Service Agreement has been signed and processed." }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded border p-4 max-w-md mx-auto", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Agreement Details:" }),
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: psaData.psaVersion }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              "Signed on ",
              (/* @__PURE__ */ new Date()).toLocaleDateString()
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-blue-50 border-blue-200 shadow-xl", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-blue-900", children: "What's Next?" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }) }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-green-800", children: "PSA Signed" }),
              /* @__PURE__ */ jsx("p", { className: "text-green-600", children: "Complete ✓" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-blue-600" }) }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-blue-800", children: "Portal Setup" }),
              /* @__PURE__ */ jsx("p", { className: "text-blue-600", children: "Next Step" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-gray-600" }) }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: "Start Receiving" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Coming Soon" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                window.location.href = "/dashboard/onboarding";
              },
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white",
              children: "Continue to Portal Setup"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                window.location.href = "/dashboard";
              },
              variant: "outline",
              className: "w-full",
              children: "Return to Dashboard"
            }
          ),
          docuSealData.signedDocumentUrl && /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", asChild: true, children: /* @__PURE__ */ jsx(
            "a",
            {
              href: docuSealData.signedDocumentUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Download Signed Agreement"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-gray-200", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          "Questions about your setup?",
          /* @__PURE__ */ jsx("a", { href: "mailto:support@usrad.com", className: "text-blue-600 hover:text-blue-500 ml-1", children: "Contact Support" })
        ] }) })
      ] })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Psa = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Psa;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/imaginglogin");
  }
  const providerData = {
    facilityName: "Advanced Imaging Center",
    contactName: "Dr. John Smith",
    email: "drsmith@example.com",
    phone: "(954) 555-0123",
    contactPhone: "(954) 555-0124",
    contactEmail: "contact@example.com",
    taxId: "12-3456789",
    totalLocations: "1",
    signerTitle: "Medical Director"
  };
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "PSA Signing", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PSASigningSystemUpdated", PSASigningSystemUpdated, { "client:load": true, "providerData": providerData, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/PSASigningSystemUpdated", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/onboarding/psa.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/onboarding/psa.astro";
const $$url = "/dashboard/onboarding/psa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Psa,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
