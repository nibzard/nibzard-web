import { c as createAstro, a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../chunks/astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import { s as server } from '../chunks/index_CX0vN75E.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BDNHr9lc.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://nibzard.com");
const $$Unsubscribe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Unsubscribe;
  let emailFromQuery = Astro2.url.searchParams.get("email");
  let formMessage = null;
  let formMessageType = null;
  let initialEmail = emailFromQuery || "";
  let isPost = Astro2.request.method === "POST";
  if (isPost) {
    const formData = await Astro2.request.formData();
    const result = await server.unsubscribe(formData);
    if (result && result.data?.success) {
      formMessage = "You have been successfully unsubscribed.";
      formMessageType = "success";
    } else if (result && result.error) {
      formMessage = result.error.message || "An error occurred. Please try again.";
      formMessageType = "error";
    } else {
      formMessage = "An unexpected issue occurred. Please try again.";
      formMessageType = "error";
    }
    initialEmail = formData.get("email")?.toString() || initialEmail;
  }
  const pageTitle = "Unsubscribe from Newsletter";
  const pageDescription = "Manage your subscription preferences.";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle, "description": pageDescription, "data-astro-cid-uh6trgek": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="unsubscribe-container" data-astro-cid-uh6trgek> <h1 data-astro-cid-uh6trgek>${pageTitle}</h1> ${emailFromQuery && !isPost && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6trgek": true }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([" <p data-astro-cid-uh6trgek>Attempting to unsubscribe ", '...</p> <form method="POST" id="autoUnsubscribeForm" data-astro-cid-uh6trgek> <input type="hidden" name="email"', " data-astro-cid-uh6trgek> </form> <script>\n          // Automatically submit the form if email is from query param\n          // This is a client-side script to trigger the POST request for the action\n          document.addEventListener('DOMContentLoaded', () => {\n            const autoForm = document.getElementById('autoUnsubscribeForm');\n            if (autoForm) {\n              // Small delay to ensure page content is visible before potential navigation\n              setTimeout(() => {\n                autoForm.requestSubmit ? autoForm.requestSubmit() : autoForm.submit();\n              }, 100);\n            }\n          });\n        <\/script> "])), emailFromQuery, addAttribute(emailFromQuery, "value")) })}`} ${formMessage && renderTemplate`<div${addAttribute(`form-message ${formMessageType}`, "class")} data-astro-cid-uh6trgek> ${formMessage} </div>`} <form class="unsubscribe-form" method="POST" data-astro-cid-uh6trgek> <p data-astro-cid-uh6trgek>If you wish to unsubscribe, please enter your email address below and click "Unsubscribe".</p> <div data-astro-cid-uh6trgek> <label for="email" data-astro-cid-uh6trgek>Email Address:</label> <input type="email" id="email" name="email" class="unsubscribe-input"${addAttribute(initialEmail, "value")} required data-astro-cid-uh6trgek> </div> <button type="submit" class="unsubscribe-button" data-astro-cid-uh6trgek>Unsubscribe</button> </form> <p style="margin-top: 1rem; text-align: center;" data-astro-cid-uh6trgek> <a href="/" data-astro-cid-uh6trgek>Go back to homepage</a> </p> </div> ` })}`;
}, "/Users/nikola/dev/nibzard/src/pages/unsubscribe.astro", void 0);

const $$file = "/Users/nikola/dev/nibzard/src/pages/unsubscribe.astro";
const $$url = "/unsubscribe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Unsubscribe,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
