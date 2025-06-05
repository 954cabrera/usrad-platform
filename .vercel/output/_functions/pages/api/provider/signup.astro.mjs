import { D as DatabaseService, A as AuthService } from '../../../chunks/auth_C63G2fu-.mjs';
import crypto from 'crypto';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, url }) => {
  try {
    const data = await request.json();
    const existingUser = await DatabaseService.getUserByEmail(data.email);
    if (existingUser) {
      return new Response(JSON.stringify({
        error: "Email Already in Use",
        message: "An account with this email address already exists. Please check the email you entered, or if this is your account, sign in instead.",
        suggestions: [
          "Double-check the email address you entered",
          "Try signing in if you already have an account",
          "Use a different email address if this is a new application"
        ],
        loginUrl: "/login/imaginglogin"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1e3);
    const tempPassword = generateTemporaryPassword();
    const user = await AuthService.createUser({
      email: data.email,
      password: tempPassword,
      role: "imaging_center",
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.directPhone
    });
    const imagingCenter = await DatabaseService.createImagingCenter({
      userId: user.id,
      name: data.legalBusinessName,
      legalBusinessName: data.legalBusinessName,
      dbaName: data.dbaName,
      taxId: data.taxId,
      businessAddress: data.businessAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      businessPhone: data.businessPhone,
      email: data.email,
      contactTitle: data.title,
      services: JSON.stringify(data.services),
      mriFieldStrength: data.mriFieldStrength,
      equipmentDetails: data.equipmentDetails,
      yearsInOperation: data.yearsInOperation,
      dailyVolume: data.dailyVolume,
      hoursOfOperation: data.hoursOfOperation,
      paymentMethod: data.paymentMethod,
      bankName: data.bankName,
      status: "pending_verification",
      // New status for unverified accounts
      tier: "standard"
    });
    await DatabaseService.storeVerificationToken(user.id, verificationToken, tokenExpiry);
    const magicLink = `${url.origin}/api/auth/verify?token=${verificationToken}`;
    await sendMagicLinkEmail(data.email, data.firstName, magicLink);
    return new Response(JSON.stringify({
      success: true,
      message: "Application submitted successfully!",
      email: data.email,
      nextStep: "Check your email for verification link"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Provider signup error:", error);
    let errorMessage = "Registration failed. Please try again.";
    if (error.message?.includes("duplicate key")) {
      errorMessage = "An account with this email already exists. Please try logging in instead.";
    } else if (error.message?.includes("connection")) {
      errorMessage = "Unable to connect to our servers. Please try again in a moment.";
    } else if (error.message?.includes("validation")) {
      errorMessage = "Please check that all required fields are filled out correctly.";
    }
    return new Response(JSON.stringify({
      error: errorMessage
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
function generateTemporaryPassword() {
  return crypto.randomBytes(8).toString("hex");
}
async function sendMagicLinkEmail(email, firstName, magicLink) {
  console.log(`
🪄 MAGIC LINK EMAIL
To: ${email}
Subject: Welcome to USRad Network - Verify Your Account

Hi ${firstName},

Welcome to the USRad Network! Click the link below to verify your email and access your provider dashboard:

${magicLink}

This link expires in 24 hours.

Best regards,
USRad Team
  `);
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
