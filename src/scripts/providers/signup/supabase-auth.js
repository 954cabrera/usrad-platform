export class SupabaseAuth {
  constructor() {
    this.supabase = null;
  }

  async initialize() {
    const supabaseUrl = document.querySelector('meta[name="supabase-url"]')?.content;
    const supabaseAnonKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase configuration");
    }

    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  async signUp(formData) {
    const { data, error } = await this.supabase.auth.signUp({
     email: formData.email,
     password: formData.password,
     options: {
       emailRedirectTo: `${window.location.origin}/providers/verified`,
       data: {
         organization_name: formData.organizationName,
         phone: formData.phone,
         user_type: "provider",
         onboarding_step: "account_created",
         source: "enhanced_join",
       },
     },
   });

   if (error) throw error;
   return data;
 }

 async signInWithGoogle() {
   const { data, error } = await this.supabase.auth.signInWithOAuth({
     provider: "google",
     options: {
       redirectTo: `${window.location.origin}/providers/portal`,
       scopes: "email profile",
     },
   });

   if (error) throw error;
   return data;
 }

 async signInWithMicrosoft() {
   const { data, error } = await this.supabase.auth.signInWithOAuth({
     provider: "azure",
     options: {
       redirectTo: `${window.location.origin}/providers/portal`,
       scopes: "email profile",
     },
   });

   if (error) throw error;
   return data;
 }

 async checkSession() {
   const { data: { session } } = await this.supabase.auth.getSession();
   return session;
 }
}

// Make SSO functions globally available ONLY if they don't already exist
if (!window.signInWithGoogle) {
  window.signInWithGoogle = async () => {
    try {
      const auth = new SupabaseAuth();
      await auth.initialize();
      await auth.signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error:", error);
      // Show error message
      const form = document.querySelector('signup-form');
      if (form && form.shadowRoot) {
        const errorMsg = form.shadowRoot.querySelector('#error-message');
        if (errorMsg) {
          errorMsg.textContent = "Google sign-in temporarily unavailable. Please use email signup.";
          errorMsg.classList.remove("hidden");
        }
      }
    }
  };
}

if (!window.signInWithMicrosoft) {
  window.signInWithMicrosoft = async () => {
    try {
      const auth = new SupabaseAuth();
      await auth.initialize();
      await auth.signInWithMicrosoft();
    } catch (error) {
      console.error("Microsoft sign-in error:", error);
      // Show error message
      const form = document.querySelector('signup-form');
      if (form && form.shadowRoot) {
        const errorMsg = form.shadowRoot.querySelector('#error-message');
        if (errorMsg) {
          errorMsg.textContent = "Microsoft sign-in temporarily unavailable. Please use email signup.";
          errorMsg.classList.remove("hidden");
        }
      }
    }
  };
}