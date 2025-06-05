/* empty css                                       */
import { c as createComponent, e as createAstro, r as renderComponent, d as renderTemplate } from '../../../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_gZIsqg2i.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { CheckCircle, Building, FileText, Plus, AlertCircle, Upload, Download, X, MapPin, Phone, Edit3, Trash2, Save } from 'lucide-react';
import { v as validateAuthSession } from '../../../chunks/auth_C63G2fu-.mjs';
export { renderers } from '../../../renderers.mjs';

const FacilityManager = () => {
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: "Advanced Imaging Center of Davie",
      address: "123 Medical Plaza Dr, Davie, FL 33328",
      phone: "(954) 555-0123",
      isPrimary: true
    }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [csvData, setCsvData] = useState("");
  const [step, setStep] = useState("manage");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const addFacility = () => {
    if (formData.name && formData.address && formData.phone) {
      const newFacility = {
        id: Date.now(),
        ...formData,
        isPrimary: facilities.length === 0
      };
      setFacilities([...facilities, newFacility]);
      setFormData({ name: "", address: "", phone: "" });
    }
  };
  const updateFacility = (id, updatedData) => {
    setFacilities(facilities.map(
      (f) => f.id === id ? { ...f, ...updatedData } : f
    ));
    setEditingId(null);
  };
  const deleteFacility = (id) => {
    const facilityToDelete = facilities.find((f) => f.id === id);
    if (facilityToDelete?.isPrimary && facilities.length > 1) {
      const remaining = facilities.filter((f) => f.id !== id);
      remaining[0].isPrimary = true;
      setFacilities(remaining);
    } else {
      setFacilities(facilities.filter((f) => f.id !== id));
    }
  };
  const setPrimary = (id) => {
    setFacilities(facilities.map((f) => ({
      ...f,
      isPrimary: f.id === id
    })));
  };
  const processBulkUpload = () => {
    const lines = csvData.trim().split("\n");
    const newFacilities = lines.map((line, index) => {
      const [name, address, phone] = line.split(",").map((s) => s.trim());
      return {
        id: Date.now() + index,
        name: name || `Facility ${index + 1}`,
        address: address || "",
        phone: phone || "",
        isPrimary: false
      };
    }).filter((f) => f.name && f.address);
    if (newFacilities.length > 0) {
      setFacilities([...facilities, ...newFacilities]);
      setCsvData("");
      setShowBulkUpload(false);
    }
  };
  const downloadTemplate = () => {
    const template = `Facility Name,Address,Phone
Example Imaging Center,123 Main St City ST 12345,(555) 123-4567
Another Location,456 Oak Ave City ST 12345,(555) 234-5678`;
    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "facility_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const generateExhibitB = () => {
    const primaryFacility = facilities.find((f) => f.isPrimary);
    facilities.filter((f) => !f.isPrimary);
    return {
      primaryContact: primaryFacility,
      totalLocations: facilities.length,
      facilitiesList: facilities,
      generatedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
  };
  if (step === "preview") {
    const exhibitData = generateExhibitB();
    const primaryFacility = exhibitData.primaryContact;
    return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "PSA Exhibit B Preview" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Review how your facilities will appear in the Provider Service Agreement" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border p-8 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "border-b pb-4 mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "EXHIBIT B: PROVIDER LOCATIONS" }) }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Primary Contact:" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: primaryFacility?.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              "Phone: ",
              primaryFacility?.phone
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              "Address: ",
              primaryFacility?.address
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Authorized Facilities:" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: exhibitData.facilitiesList.map((facility, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-700 mr-3 min-w-[30px]", children: [
              index + 1,
              "."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: facility.name }),
              facility.isPrimary && /* @__PURE__ */ jsx("span", { className: "ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full", children: "Primary" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: facility.address }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600 ml-4", children: [
                "Phone: ",
                facility.phone
              ] })
            ] })
          ] }, facility.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t pt-4 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Total Authorized Locations:" }),
            " ",
            exhibitData.totalLocations
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Generated:" }),
            " ",
            exhibitData.generatedDate
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setStep("manage"),
            className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
            children: "← Back to Edit"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setStep("complete"),
            className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
            children: "Approve & Continue to PSA →"
          }
        )
      ] })
    ] });
  }
  if (step === "complete") {
    return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto p-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border p-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-green-600" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Facilities Configured!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 mb-6", children: [
        "Your ",
        facilities.length,
        " location",
        facilities.length !== 1 ? "s" : "",
        " have been added to your PSA. You can now proceed to review and sign your Provider Service Agreement."
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.location.href = "/dashboard/onboarding/psa",
          className: "px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium",
          children: "Continue to PSA Signing →"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Facility Locations Setup" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Add all locations that will be included in your Provider Service Agreement" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-blue-50 p-6 rounded-lg border border-blue-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Building, { className: "w-8 h-8 text-blue-600 mr-3" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-900", children: facilities.length }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-700 text-sm", children: "Total Locations" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-green-50 p-6 rounded-lg border border-green-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-green-600 mr-3" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-900", children: "1" }),
          /* @__PURE__ */ jsx("p", { className: "text-green-700 text-sm", children: "Primary Contact" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-purple-50 p-6 rounded-lg border border-purple-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-purple-600 mr-3" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-purple-900", children: "Ready" }),
          /* @__PURE__ */ jsx("p", { className: "text-purple-700 text-sm", children: "For PSA" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border p-6 mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Add New Location" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Facility Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              placeholder: "e.g., Advanced Imaging Center"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.address,
              onChange: (e) => setFormData({ ...formData, address: e.target.value }),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              placeholder: "123 Medical Dr, City, ST 12345"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Phone" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.phone,
              onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
              placeholder: "(555) 123-4567"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: addFacility,
          className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "Add Location"
          ]
        }
      )
    ] }),
    facilities.length >= 5 && /* @__PURE__ */ jsx("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-600 mt-0.5 mr-3" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium text-yellow-800", children: "Have many locations?" }),
        /* @__PURE__ */ jsx("p", { className: "text-yellow-700 text-sm mt-1", children: "Save time by uploading a CSV file with all your facility information." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 space-x-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowBulkUpload(true),
              className: "px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm",
              children: [
                /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4 mr-2 inline" }),
                "Bulk Upload"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: downloadTemplate,
              className: "px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors text-sm",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2 inline" }),
                "Download Template"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    showBulkUpload && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-lg mx-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Bulk Upload Facilities" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowBulkUpload(false),
            className: "text-gray-400 hover:text-gray-600",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Paste CSV data with format: Name, Address, Phone (one per line)" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: csvData,
          onChange: (e) => setCsvData(e.target.value),
          className: "w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono",
          placeholder: "Facility Name,123 Main St City ST 12345,(555) 123-4567"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 mt-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowBulkUpload(false),
            className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: processBulkUpload,
            className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
            children: [
              "Upload ",
              csvData.trim().split("\n").length,
              " Locations"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm border p-6 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Your Locations" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
          facilities.length,
          " location",
          facilities.length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: facilities.map((facility) => /* @__PURE__ */ jsx("div", { className: `p-4 rounded-lg border ${facility.isPrimary ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`, children: editingId === facility.id ? /* @__PURE__ */ jsx(
        EditFacilityForm,
        {
          facility,
          onSave: (data) => updateFacility(facility.id, data),
          onCancel: () => setEditingId(null)
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900", children: facility.name }),
            facility.isPrimary && /* @__PURE__ */ jsx("span", { className: "ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full", children: "Primary Contact" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600 mb-1", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 mr-2" }),
            facility.address
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-2" }),
            facility.phone
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          !facility.isPrimary && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setPrimary(facility.id),
              className: "px-3 py-1 text-xs border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50",
              children: "Make Primary"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setEditingId(facility.id),
              className: "p-2 text-gray-400 hover:text-gray-600",
              children: /* @__PURE__ */ jsx(Edit3, { className: "w-4 h-4" })
            }
          ),
          facilities.length > 1 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => deleteFacility(facility.id),
              className: "p-2 text-red-400 hover:text-red-600",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }) }, facility.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setStep("preview"),
        disabled: facilities.length === 0,
        className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        children: "Preview PSA Exhibit B →"
      }
    ) })
  ] });
};
const EditFacilityForm = ({ facility, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: facility.name,
    address: facility.address,
    phone: facility.phone
  });
  const handleSave = () => {
    if (formData.name && formData.address && formData.phone) {
      onSave(formData);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: formData.name,
        onChange: (e) => setFormData({ ...formData, name: e.target.value }),
        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "Facility Name"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: formData.address,
        onChange: (e) => setFormData({ ...formData, address: e.target.value }),
        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "Address"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: formData.phone,
        onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "Phone"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onCancel,
          className: "px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50",
          children: [
            /* @__PURE__ */ jsx(X, { className: "w-4 h-4 mr-1 inline" }),
            "Cancel"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSave,
          className: "px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-1 inline" }),
            "Save"
          ]
        }
      )
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Facilities = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Facilities;
  const { session, user } = await validateAuthSession(Astro2.request);
  if (!session || !user) {
    return Astro2.redirect("/login/imaginglogin");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Facility Setup", "user": user }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "FacilityManager", FacilityManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/usrad/Web Development/usradiology-redund-project/src/components/dashboard/FacilityManager", "client:component-export": "default" })} ` })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/onboarding/facilities.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/dashboard/onboarding/facilities.astro";
const $$url = "/dashboard/onboarding/facilities";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Facilities,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
