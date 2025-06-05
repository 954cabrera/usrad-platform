import { c as createComponent, e as createAstro, m as maybeRenderHead, g as renderScript, d as renderTemplate } from './astro/server_2ufYdVaS.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                              */

const $$Astro = createAstro();
const $$ChatbotToggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ChatbotToggle;
  const { chatbotLabel = "\u{1F4AC} Chat" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="chatbot-container" data-astro-cid-factffkh> <!-- Chatbot Toggle --> <button class="chatbot-toggle" aria-label="Open Chat" id="chat-toggle-btn" data-astro-cid-factffkh> ${chatbotLabel} </button> <!-- Chatbot Window --> <div id="chatbot-window" class="chatbot-window hidden" data-astro-cid-factffkh> <div class="chatbot-header" data-astro-cid-factffkh>
AI Assistant <button id="close-chat-btn" data-astro-cid-factffkh>✖</button> </div> <div id="chat-log" class="chat-log" data-astro-cid-factffkh></div> <form id="chat-form" class="chat-form" data-astro-cid-factffkh> <input type="text" id="chat-input" placeholder="Ask a question..." autocomplete="off" required data-astro-cid-factffkh> <button type="submit" data-astro-cid-factffkh>Send</button> </form> </div> </div>  ${renderScript($$result, "/home/usrad/Web Development/usradiology-redund-project/src/components/ChatbotToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/usrad/Web Development/usradiology-redund-project/src/components/ChatbotToggle.astro", void 0);

export { $$ChatbotToggle as $ };
