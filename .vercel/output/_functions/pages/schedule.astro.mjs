/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, h as defineScriptVars, f as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BZV5qL5k.mjs';
import { $ as $$ChatbotToggle } from '../chunks/ChatbotToggle_C34OpM7j.mjs';
import { $ as $$AOSInit } from '../chunks/Footer_DMjklgAz.mjs';
import { c as centersData } from '../chunks/centers_CbD1UXJx.mjs';
export { renderers } from '../renderers.mjs';

const studiesData = [
	{
		id: "mri",
		type: "MRI",
		name: "Magnetic Resonance Imaging",
		description: "A non-invasive imaging technique that uses powerful magnets and radio waves to create detailed images of organs and tissues within the body.",
		body_parts: [
			"Brain",
			"Spine",
			"Knee",
			"Shoulder",
			"Hip",
			"Abdomen",
			"Pelvis",
			"Chest"
		],
		preparation: "Remove all metal objects. Inform your technologist about any medical implants. You may be asked to avoid eating or drinking for a few hours before certain scans.",
		duration: "30-60 minutes",
		is_contrast_available: true
	},
	{
		id: "ct",
		type: "CT",
		name: "Computed Tomography Scan",
		description: "A computerized X-ray imaging procedure that creates detailed cross-sectional images of the body, including bones, blood vessels and soft tissues.",
		body_parts: [
			"Brain",
			"Chest",
			"Abdomen",
			"Pelvis",
			"Spine",
			"Sinuses"
		],
		preparation: "You may be asked to avoid eating or drinking for a few hours before the scan. Wear comfortable, loose-fitting clothing without metal fasteners.",
		duration: "15-30 minutes",
		is_contrast_available: true
	},
	{
		id: "xray",
		type: "X-Ray",
		name: "X-Ray Imaging",
		description: "A quick, painless test that produces images of the structures inside your body, particularly your bones.",
		body_parts: [
			"Chest",
			"Spine",
			"Extremities",
			"Abdomen",
			"Skull",
			"Sinuses",
			"Dental"
		],
		preparation: "No special preparation is needed. You may be asked to remove jewelry, eyeglasses, or metal objects from the area being examined.",
		duration: "5-15 minutes",
		is_contrast_available: false
	},
	{
		id: "ultrasound",
		type: "Ultrasound",
		name: "Diagnostic Ultrasound",
		description: "A safe and painless procedure that uses sound waves to produce images of the inside of the body.",
		body_parts: [
			"Abdomen",
			"Pelvis",
			"Breast",
			"Thyroid",
			"Scrotum",
			"Blood vessels",
			"Soft tissues"
		],
		preparation: "Preparation varies depending on the area being examined. You may be asked to fast for several hours or drink water to fill your bladder.",
		duration: "15-45 minutes",
		is_contrast_available: false
	},
	{
		id: "mammography",
		type: "Mammogram",
		name: "Digital Mammography",
		description: "A specialized X-ray imaging used to create detailed images of the breast, primarily used for breast cancer screening and diagnosis.",
		body_parts: [
			"Breast"
		],
		preparation: "Do not use deodorant, perfume, powders, or ointments on your breasts on the day of the exam. Describe any breast symptoms to the technologist.",
		duration: "20-30 minutes",
		is_contrast_available: false
	},
	{
		id: "pet-ct",
		type: "PET/CT",
		name: "Positron Emission Tomography/Computed Tomography",
		description: "A nuclear medicine technique that combines PET and CT to provide detailed information about both the structure and function of cells and tissues in the body.",
		body_parts: [
			"Whole body",
			"Brain",
			"Heart"
		],
		preparation: "Fast for 4-6 hours before the exam. Avoid strenuous exercise for 24 hours prior. Your doctor may provide specific instructions based on your condition.",
		duration: "90-120 minutes",
		is_contrast_available: true
	},
	{
		id: "bone-density",
		type: "Bone Density",
		name: "Bone Density Scan (DEXA)",
		description: "A special type of X-ray that measures bone mineral density to assess the strength of your bones, commonly used to diagnose osteoporosis.",
		body_parts: [
			"Spine",
			"Hip",
			"Forearm"
		],
		preparation: "Avoid calcium supplements for 24 hours before the exam. Wear loose, comfortable clothing without metal fasteners.",
		duration: "10-20 minutes",
		is_contrast_available: false
	},
	{
		id: "fluoroscopy",
		type: "Fluoroscopy",
		name: "Fluoroscopy Procedure",
		description: "A type of medical imaging that shows a continuous X-ray image on a monitor, like an X-ray movie, used to observe the movement of a body part or the path of contrast agent through the body.",
		body_parts: [
			"Digestive tract",
			"Joints",
			"Spine",
			"Urinary tract"
		],
		preparation: "Preparation varies depending on the specific procedure. You may need to fast or take a laxative beforehand for some procedures.",
		duration: "15-45 minutes",
		is_contrast_available: true
	},
	{
		id: "nuclear-medicine",
		type: "Nuclear Medicine",
		name: "Nuclear Medicine Scan",
		description: "Procedures that use small amounts of radioactive materials (radiotracers) to diagnose and determine the severity of various diseases, including many types of cancers, heart disease, and certain other abnormalities.",
		body_parts: [
			"Thyroid",
			"Bones",
			"Heart",
			"Kidneys",
			"Liver",
			"Lungs"
		],
		preparation: "Preparation varies by exam. Your doctor will provide specific instructions. You may need to stop taking certain medications temporarily.",
		duration: "30-120 minutes",
		is_contrast_available: true
	},
	{
		id: "mra",
		type: "MRA",
		name: "Magnetic Resonance Angiography",
		description: "A type of MRI scan that specifically examines blood vessels, used to evaluate blood flow and detect abnormalities like aneurysms or blockages.",
		body_parts: [
			"Brain",
			"Neck",
			"Chest",
			"Abdomen",
			"Extremities"
		],
		preparation: "Remove all metal objects. Inform your technologist about any medical implants. You may need to avoid eating or drinking for several hours before the scan.",
		duration: "30-60 minutes",
		is_contrast_available: true
	},
	{
		id: "cta",
		type: "CTA",
		name: "Computed Tomography Angiography",
		description: "A CT scan technique focused on blood vessels, used to examine the arteries and veins throughout the body, including those in the brain, neck, heart, chest, abdomen, and legs.",
		body_parts: [
			"Brain",
			"Neck",
			"Heart",
			"Chest",
			"Abdomen",
			"Legs"
		],
		preparation: "You may be asked to fast for 4-6 hours before the exam. Wear comfortable clothing without metal fasteners. Inform your doctor about any allergies to contrast material.",
		duration: "15-30 minutes",
		is_contrast_available: true
	},
	{
		id: "cardiac-mri",
		type: "Cardiac MRI",
		name: "Cardiac Magnetic Resonance Imaging",
		description: "A specialized MRI scan that evaluates the structure and function of the heart in great detail, including the heart muscle, valves, and blood vessels.",
		body_parts: [
			"Heart"
		],
		preparation: "Remove all metal objects. Inform your technologist about any medical implants. You may need to avoid eating or drinking for several hours before the scan.",
		duration: "45-90 minutes",
		is_contrast_available: true
	}
];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Schedule = createComponent(($$result, $$props, $$slots) => {
  const serializedCentersData = JSON.stringify(centersData);
  const serializedStudiesData = JSON.stringify(studiesData);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", `<div class="max-w-4xl mx-auto px-4 py-12"> <!-- Initial loading state --> <div id="loading-message" class="text-center py-12"> <p class="text-lg">Loading...</p> </div> <!-- No center selected message (hidden initially) --> <div id="no-center-selected" class="text-center py-12 hidden" data-aos="fade-up"> <h1 class="text-3xl font-bold text-gray-800 mb-4">No Center Selected</h1> <p class="text-lg text-gray-600 mb-6">
It seems you haven't selected an imaging center or study type yet.
        Please search for available centers first.
</p> <div class="flex justify-center gap-4"> <a href="/locations" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
Start New Search
</a> <a href="/search" class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
View Search Results
</a> </div> </div> <!-- Error message (hidden initially) --> <div id="error-message" class="text-center py-12 hidden" data-aos="fade-up"> <h1 class="text-3xl font-bold text-red-600 mb-4">Error Loading Data</h1> <p id="error-details" class="text-lg text-gray-600 mb-6">
There was a problem loading the required data. Please try again later.
</p> <div class="flex justify-center gap-4"> <a href="/locations" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
Start New Search
</a> </div> </div> <!-- Center info and form (hidden initially) --> <div id="appointment-section" class="hidden"> <h1 class="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">
Schedule Your Appointment
</h1> <!-- Center Information Section --> <div class="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200" data-aos="fade-up" data-aos-delay="100"> <h2 class="text-xl font-semibold mb-2">Selected Center</h2> <div id="center-info" class="flex flex-col md:flex-row md:items-center justify-between"> <!-- Center info will be populated here --> </div> </div> <!-- Appointment Form --> <form class="space-y-6" data-aos="fade-up" data-aos-delay="200"> <input type="hidden" id="centerId" name="centerId" value=""> <input type="hidden" id="studyType" name="studyType" value=""> <input type="hidden" id="centerName" name="centerName" value=""> <input type="hidden" id="price" name="price" value=""> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label> <input type="text" id="firstName" name="firstName" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label> <input type="text" id="lastName" name="lastName" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label> <input type="email" id="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label> <input type="tel" id="phone" name="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="preferredDate" class="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label> <input type="date" id="preferredDate" name="preferredDate" required`, ' class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="preferredTime" class="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label> <select id="preferredTime" name="preferredTime" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> <option value="" disabled selected>Select a time</option> <option value="morning">Morning (8am - 12pm)</option> <option value="afternoon">Afternoon (12pm - 4pm)</option> <option value="evening">Evening (4pm - 7pm)</option> </select> </div> <div> <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label> <textarea id="notes" name="notes" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea> </div> <div class="pt-4"> <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200">\nRequest Appointment\n</button> </div> </form> <div class="mt-8 text-center text-gray-600" data-aos="fade-up" data-aos-delay="300"> <p>\nNeed assistance? Call us at <a href="tel:800-555-1234" class="text-blue-600 font-medium">800-USRAD-24</a> </p> </div> </div> </div> <script>(function(){', '\n    // Client-side JavaScript to handle URL parameters\n    document.addEventListener("DOMContentLoaded", () => {\n      // Parse URL parameters\n      const urlParams = new URLSearchParams(window.location.search);\n      const centerId = urlParams.get("center");\n      const studyType = urlParams.get("study");\n      const bodyArea = urlParams.get("bodyArea");\n      const scanType = urlParams.get("scanType");\n\n      // Log values to console for debugging\n      console.log("URL Parameters:", {\n        centerId,\n        studyType,\n        bodyArea,\n        scanType,\n      });\n\n      // Hide loading message\n      document.getElementById("loading-message").style.display = "none";\n\n      // Check if parameters exist\n      if (!centerId || !studyType) {\n        // Show no center selected message\n        document\n          .getElementById("no-center-selected")\n          .classList.remove("hidden");\n        return;\n      }\n\n      try {\n        // Parse the JSON data\n        const centersData = JSON.parse(serializedCentersData);\n        const studiesData = JSON.parse(serializedStudiesData);\n\n        // Process the data\n        processData(\n          centersData,\n          studiesData,\n          centerId,\n          studyType,\n          bodyArea,\n          scanType,\n          urlParams\n        );\n      } catch (error) {\n        // Show error message\n        document.getElementById("error-message").classList.remove("hidden");\n        document.getElementById("error-details").textContent =\n          `Error: ${error.message}`;\n        console.error("Error processing data:", error);\n      }\n    });\n\n    function processData(\n      centersData,\n      studiesData,\n      centerId,\n      studyType,\n      bodyArea,\n      scanType,\n      urlParams\n    ) {\n      // Find the center\n      const selectedCenter = centersData.find(\n        (center) => center.id.toString() === centerId\n      );\n\n      // Find the study - more flexible matching\n      let selectedStudy = null;\n\n      // Try to find an exact match first\n      selectedStudy = studiesData.find((study) => study.id === studyType);\n\n      // If not found, try case-insensitive match on ID\n      if (!selectedStudy) {\n        selectedStudy = studiesData.find(\n          (study) =>\n            study.id && study.id.toLowerCase() === studyType.toLowerCase()\n        );\n      }\n\n      // If still not found, try matching on type\n      if (!selectedStudy) {\n        selectedStudy = studiesData.find(\n          (study) =>\n            study.type && study.type.toLowerCase() === studyType.toLowerCase()\n        );\n      }\n\n      // If still not found, try matching on name\n      if (!selectedStudy) {\n        selectedStudy = studiesData.find(\n          (study) =>\n            study.name &&\n            study.name.toLowerCase().includes(studyType.toLowerCase())\n        );\n      }\n\n      // For debugging, create a simple study object if none found\n      if (!selectedStudy) {\n        console.log("Creating fallback study object for debugging");\n        selectedStudy = {\n          id: studyType,\n          name: studyType.toUpperCase(),\n          type: studyType.toUpperCase(),\n        };\n      }\n\n      // If center not found, show error\n      if (!selectedCenter) {\n        const errorMsg = `Center with ID ${centerId} not found`;\n        document.getElementById("error-message").classList.remove("hidden");\n        document.getElementById("error-details").textContent = errorMsg;\n        return;\n      }\n\n      // Calculate price\n      let price = null;\n\n      // Check if center has prices\n      if (selectedCenter.prices) {\n        // Try several ways to get the price\n        if (typeof selectedCenter.prices === "object") {\n          // If it\'s an object, try different keys\n          price =\n            selectedCenter.prices[studyType] ||\n            selectedCenter.prices[studyType.toLowerCase()] ||\n            selectedCenter.prices[studyType.toUpperCase()];\n\n          // If study was found, try using its ID\n          if (selectedStudy && selectedStudy.id) {\n            price = price || selectedCenter.prices[selectedStudy.id];\n          }\n        } else if (typeof selectedCenter.prices === "number") {\n          // If prices is a single number\n          price = selectedCenter.prices;\n        }\n      }\n\n      // Fall back to default price if needed\n      if (price === null || price === undefined) {\n        price = selectedCenter.defaultPrice || 799; // Fallback price\n      }\n\n      // Update hidden form fields\n      document.getElementById("centerId").value = centerId;\n      document.getElementById("studyType").value = studyType;\n      document.getElementById("centerName").value = selectedCenter.name || "";\n      document.getElementById("price").value = price || "";\n\n      // Generate center info HTML\n      const centerInfoDiv = document.getElementById("center-info");\n\n      const centerDetailsHTML = `\n        <div>\n          <h3 class="text-lg font-medium text-blue-700">${selectedCenter.name || "Unknown Center"}</h3>\n          <p class="text-gray-600">${selectedCenter.address || ""}</p>\n          <p class="text-gray-600">${selectedCenter.city || ""}, ${selectedCenter.state || ""} ${selectedCenter.zip || ""}</p>\n          <p class="mt-2 text-gray-700">Phone: ${selectedCenter.phone || "N/A"}</p>\n        </div>\n        <div class="mt-4 md:mt-0">\n          ${\n            selectedStudy\n              ? `\n            <div class="text-center md:text-right">\n              <p class="text-gray-600">Selected Study:</p>\n              <p class="text-lg font-medium">${selectedStudy.name || selectedStudy.type || "Unknown Study"}</p>\n              ${\n                bodyArea\n                  ? `\n              <p class="text-gray-600 mt-2">Body Area:</p>\n              <p class="text-sm font-medium">${bodyArea}</p>\n              `\n                  : ""\n              }\n              ${\n                scanType\n                  ? `\n              <p class="text-gray-600 mt-2">Scan Type:</p>\n              <p class="text-sm font-medium">${scanType}</p>\n              `\n                  : ""\n              }\n              <p class="text-gray-600 mt-2">Price:</p>\n              <p class="text-2xl font-bold text-green-600">$${price}</p>\n            </div>\n          `\n              : `\n            <p class="text-gray-600">No study selected or price available</p>\n          `\n          }\n        </div>\n      `;\n\n      centerInfoDiv.innerHTML = centerDetailsHTML;\n\n      // Show appointment section\n      document.getElementById("appointment-section").classList.remove("hidden");\n\n      // Initialize or refresh AOS animations\n      if (typeof AOS !== "undefined") {\n        AOS.refresh();\n      }\n    }\n  })();<\/script> ', " "], [" ", " ", `<div class="max-w-4xl mx-auto px-4 py-12"> <!-- Initial loading state --> <div id="loading-message" class="text-center py-12"> <p class="text-lg">Loading...</p> </div> <!-- No center selected message (hidden initially) --> <div id="no-center-selected" class="text-center py-12 hidden" data-aos="fade-up"> <h1 class="text-3xl font-bold text-gray-800 mb-4">No Center Selected</h1> <p class="text-lg text-gray-600 mb-6">
It seems you haven't selected an imaging center or study type yet.
        Please search for available centers first.
</p> <div class="flex justify-center gap-4"> <a href="/locations" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
Start New Search
</a> <a href="/search" class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
View Search Results
</a> </div> </div> <!-- Error message (hidden initially) --> <div id="error-message" class="text-center py-12 hidden" data-aos="fade-up"> <h1 class="text-3xl font-bold text-red-600 mb-4">Error Loading Data</h1> <p id="error-details" class="text-lg text-gray-600 mb-6">
There was a problem loading the required data. Please try again later.
</p> <div class="flex justify-center gap-4"> <a href="/locations" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
Start New Search
</a> </div> </div> <!-- Center info and form (hidden initially) --> <div id="appointment-section" class="hidden"> <h1 class="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">
Schedule Your Appointment
</h1> <!-- Center Information Section --> <div class="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200" data-aos="fade-up" data-aos-delay="100"> <h2 class="text-xl font-semibold mb-2">Selected Center</h2> <div id="center-info" class="flex flex-col md:flex-row md:items-center justify-between"> <!-- Center info will be populated here --> </div> </div> <!-- Appointment Form --> <form class="space-y-6" data-aos="fade-up" data-aos-delay="200"> <input type="hidden" id="centerId" name="centerId" value=""> <input type="hidden" id="studyType" name="studyType" value=""> <input type="hidden" id="centerName" name="centerName" value=""> <input type="hidden" id="price" name="price" value=""> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label> <input type="text" id="firstName" name="firstName" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label> <input type="text" id="lastName" name="lastName" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label> <input type="email" id="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label> <input type="tel" id="phone" name="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="preferredDate" class="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label> <input type="date" id="preferredDate" name="preferredDate" required`, ' class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> </div> <div> <label for="preferredTime" class="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label> <select id="preferredTime" name="preferredTime" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"> <option value="" disabled selected>Select a time</option> <option value="morning">Morning (8am - 12pm)</option> <option value="afternoon">Afternoon (12pm - 4pm)</option> <option value="evening">Evening (4pm - 7pm)</option> </select> </div> <div> <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label> <textarea id="notes" name="notes" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea> </div> <div class="pt-4"> <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200">\nRequest Appointment\n</button> </div> </form> <div class="mt-8 text-center text-gray-600" data-aos="fade-up" data-aos-delay="300"> <p>\nNeed assistance? Call us at <a href="tel:800-555-1234" class="text-blue-600 font-medium">800-USRAD-24</a> </p> </div> </div> </div> <script>(function(){', '\n    // Client-side JavaScript to handle URL parameters\n    document.addEventListener("DOMContentLoaded", () => {\n      // Parse URL parameters\n      const urlParams = new URLSearchParams(window.location.search);\n      const centerId = urlParams.get("center");\n      const studyType = urlParams.get("study");\n      const bodyArea = urlParams.get("bodyArea");\n      const scanType = urlParams.get("scanType");\n\n      // Log values to console for debugging\n      console.log("URL Parameters:", {\n        centerId,\n        studyType,\n        bodyArea,\n        scanType,\n      });\n\n      // Hide loading message\n      document.getElementById("loading-message").style.display = "none";\n\n      // Check if parameters exist\n      if (!centerId || !studyType) {\n        // Show no center selected message\n        document\n          .getElementById("no-center-selected")\n          .classList.remove("hidden");\n        return;\n      }\n\n      try {\n        // Parse the JSON data\n        const centersData = JSON.parse(serializedCentersData);\n        const studiesData = JSON.parse(serializedStudiesData);\n\n        // Process the data\n        processData(\n          centersData,\n          studiesData,\n          centerId,\n          studyType,\n          bodyArea,\n          scanType,\n          urlParams\n        );\n      } catch (error) {\n        // Show error message\n        document.getElementById("error-message").classList.remove("hidden");\n        document.getElementById("error-details").textContent =\n          \\`Error: \\${error.message}\\`;\n        console.error("Error processing data:", error);\n      }\n    });\n\n    function processData(\n      centersData,\n      studiesData,\n      centerId,\n      studyType,\n      bodyArea,\n      scanType,\n      urlParams\n    ) {\n      // Find the center\n      const selectedCenter = centersData.find(\n        (center) => center.id.toString() === centerId\n      );\n\n      // Find the study - more flexible matching\n      let selectedStudy = null;\n\n      // Try to find an exact match first\n      selectedStudy = studiesData.find((study) => study.id === studyType);\n\n      // If not found, try case-insensitive match on ID\n      if (!selectedStudy) {\n        selectedStudy = studiesData.find(\n          (study) =>\n            study.id && study.id.toLowerCase() === studyType.toLowerCase()\n        );\n      }\n\n      // If still not found, try matching on type\n      if (!selectedStudy) {\n        selectedStudy = studiesData.find(\n          (study) =>\n            study.type && study.type.toLowerCase() === studyType.toLowerCase()\n        );\n      }\n\n      // If still not found, try matching on name\n      if (!selectedStudy) {\n        selectedStudy = studiesData.find(\n          (study) =>\n            study.name &&\n            study.name.toLowerCase().includes(studyType.toLowerCase())\n        );\n      }\n\n      // For debugging, create a simple study object if none found\n      if (!selectedStudy) {\n        console.log("Creating fallback study object for debugging");\n        selectedStudy = {\n          id: studyType,\n          name: studyType.toUpperCase(),\n          type: studyType.toUpperCase(),\n        };\n      }\n\n      // If center not found, show error\n      if (!selectedCenter) {\n        const errorMsg = \\`Center with ID \\${centerId} not found\\`;\n        document.getElementById("error-message").classList.remove("hidden");\n        document.getElementById("error-details").textContent = errorMsg;\n        return;\n      }\n\n      // Calculate price\n      let price = null;\n\n      // Check if center has prices\n      if (selectedCenter.prices) {\n        // Try several ways to get the price\n        if (typeof selectedCenter.prices === "object") {\n          // If it\'s an object, try different keys\n          price =\n            selectedCenter.prices[studyType] ||\n            selectedCenter.prices[studyType.toLowerCase()] ||\n            selectedCenter.prices[studyType.toUpperCase()];\n\n          // If study was found, try using its ID\n          if (selectedStudy && selectedStudy.id) {\n            price = price || selectedCenter.prices[selectedStudy.id];\n          }\n        } else if (typeof selectedCenter.prices === "number") {\n          // If prices is a single number\n          price = selectedCenter.prices;\n        }\n      }\n\n      // Fall back to default price if needed\n      if (price === null || price === undefined) {\n        price = selectedCenter.defaultPrice || 799; // Fallback price\n      }\n\n      // Update hidden form fields\n      document.getElementById("centerId").value = centerId;\n      document.getElementById("studyType").value = studyType;\n      document.getElementById("centerName").value = selectedCenter.name || "";\n      document.getElementById("price").value = price || "";\n\n      // Generate center info HTML\n      const centerInfoDiv = document.getElementById("center-info");\n\n      const centerDetailsHTML = \\`\n        <div>\n          <h3 class="text-lg font-medium text-blue-700">\\${selectedCenter.name || "Unknown Center"}</h3>\n          <p class="text-gray-600">\\${selectedCenter.address || ""}</p>\n          <p class="text-gray-600">\\${selectedCenter.city || ""}, \\${selectedCenter.state || ""} \\${selectedCenter.zip || ""}</p>\n          <p class="mt-2 text-gray-700">Phone: \\${selectedCenter.phone || "N/A"}</p>\n        </div>\n        <div class="mt-4 md:mt-0">\n          \\${\n            selectedStudy\n              ? \\`\n            <div class="text-center md:text-right">\n              <p class="text-gray-600">Selected Study:</p>\n              <p class="text-lg font-medium">\\${selectedStudy.name || selectedStudy.type || "Unknown Study"}</p>\n              \\${\n                bodyArea\n                  ? \\`\n              <p class="text-gray-600 mt-2">Body Area:</p>\n              <p class="text-sm font-medium">\\${bodyArea}</p>\n              \\`\n                  : ""\n              }\n              \\${\n                scanType\n                  ? \\`\n              <p class="text-gray-600 mt-2">Scan Type:</p>\n              <p class="text-sm font-medium">\\${scanType}</p>\n              \\`\n                  : ""\n              }\n              <p class="text-gray-600 mt-2">Price:</p>\n              <p class="text-2xl font-bold text-green-600">$\\${price}</p>\n            </div>\n          \\`\n              : \\`\n            <p class="text-gray-600">No study selected or price available</p>\n          \\`\n          }\n        </div>\n      \\`;\n\n      centerInfoDiv.innerHTML = centerDetailsHTML;\n\n      // Show appointment section\n      document.getElementById("appointment-section").classList.remove("hidden");\n\n      // Initialize or refresh AOS animations\n      if (typeof AOS !== "undefined") {\n        AOS.refresh();\n      }\n    }\n  })();<\/script> ', " "])), renderComponent($$result2, "AOSInit", $$AOSInit, {}), maybeRenderHead(), addAttribute((/* @__PURE__ */ new Date()).toISOString().split("T")[0], "min"), defineScriptVars({ serializedCentersData, serializedStudiesData }), renderComponent($$result2, "ChatbotToggle", $$ChatbotToggle, { "chatbotLabel": "\u{1F4AC} Let's Talk" })) })}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/pages/schedule.astro", void 0);

const $$file = "/home/usrad/Web Development/usradiology-redund-project/src/pages/schedule.astro";
const $$url = "/schedule";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Schedule,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
