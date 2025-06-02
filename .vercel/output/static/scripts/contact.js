// Initialize EmailJS
import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3.2.0/dist/email.min.js";

emailjs.init("ynIV3SlFgF2JnLHHH"); // Replace with your actual public key

const form = document.getElementById("contact-form");
const thankYou = document.getElementById("thank-you");
const spinner = document.getElementById("spinner");

const showError = (inputId, message) => {
  document.getElementById(`${inputId}-error`).textContent = message;
};

const clearErrors = () => {
  ["name", "email", "message"].forEach((id) => showError(id, ""));
};

const validateForm = () => {
  clearErrors();
  let valid = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name) {
    showError("name", "Name is required.");
    valid = false;
  }

  if (!email) {
    showError("email", "Email is required.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("email", "Enter a valid email.");
    valid = false;
  }

  if (!message) {
    showError("message", "Message is required.");
    valid = false;
  }

  return valid;
};

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateForm()) return;

  spinner.classList.remove("hidden");
  form.querySelector(".button-label").classList.add("hidden");

  const { name, email, message } = form;

  emailjs
    .send("service_blqdzqg", "template_azf4seh", {
      name: name.value,
      email: email.value,
      message: message.value,
    })
    .then(() => {
      spinner.classList.add("hidden");
      form.querySelector(".button-label").classList.remove("hidden");

      form.classList.add("hidden");
      thankYou.classList.remove("hidden");
      thankYou.classList.add("slide-in");
      thankYou.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        form.reset();
        clearErrors();
        thankYou.classList.add("hidden");
        thankYou.classList.remove("slide-in");
        form.classList.remove("hidden");
      }, 6000);
    })
    .catch((err) => {
      spinner.classList.add("hidden");
      form.querySelector(".button-label").classList.remove("hidden");
      alert("❌ Message failed. Please try again later.");
      console.error("EmailJS error:", err);
    });
});
