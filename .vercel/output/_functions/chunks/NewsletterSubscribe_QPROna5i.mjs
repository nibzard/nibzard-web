import { c as createAstro, a as createComponent, d as renderTemplate, m as maybeRenderHead } from './astro/server_lwrFDKto.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://nibzard.com");
const $$NewsletterSubscribe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewsletterSubscribe;
  const title = Astro2.props.title ?? "Stay Updated";
  const description = Astro2.props.description ?? "Subscribe to receive the latest updates and articles directly in your inbox.";
  const buttonText = Astro2.props.buttonText ?? "Subscribe";
  const showButton = Astro2.props.showButton ?? true;
  return renderTemplate(_a || (_a = __template(["", '<div class="newsletter-card" data-astro-cid-h4grly7g> <h3 data-astro-cid-h4grly7g>', "</h3> <p data-astro-cid-h4grly7g>", '</p> <div id="form-message" class="form-message" style="display:none;" data-astro-cid-h4grly7g></div> <form class="newsletter-form" id="newsletter-form" data-astro-cid-h4grly7g> <div class="newsletter-input-group" data-astro-cid-h4grly7g> <input type="email" name="email" placeholder="Your email address" class="newsletter-input" required data-astro-cid-h4grly7g> <input type="text" name="firstName" placeholder="First name (optional)" class="newsletter-input" style="min-width:120px;" data-astro-cid-h4grly7g> <input type="text" name="lastName" placeholder="Last name (optional)" class="newsletter-input" style="min-width:120px;" data-astro-cid-h4grly7g> ', ` </div> <label class="newsletter-privacy" data-astro-cid-h4grly7g> <input type="checkbox" required data-astro-cid-h4grly7g> <span data-astro-cid-h4grly7g>I agree to receive emails and can unsubscribe at any time</span> </label> </form> </div> <script type="module">
  const form = document.getElementById('newsletter-form');
  const messageDiv = document.getElementById('form-message');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageDiv.style.display = 'none';
    messageDiv.className = 'form-message';
    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    };
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        messageDiv.textContent = 'Thanks for subscribing! Please check your email to confirm.';
        messageDiv.classList.add('success');
        form.reset();
      } else {
        messageDiv.textContent = result.error || 'An error occurred. Please try again.';
        messageDiv.classList.add('error');
      }
    } catch (err) {
      messageDiv.textContent = 'An unexpected issue occurred. Please try again.';
      messageDiv.classList.add('error');
    }
    messageDiv.style.display = 'block';
  });
<\/script> `])), maybeRenderHead(), title, description, showButton && renderTemplate`<button type="submit" class="newsletter-button" data-astro-cid-h4grly7g>${buttonText}</button>`);
}, "/Users/nikola/dev/nibzard/src/components/NewsletterSubscribe.astro", void 0);

export { $$NewsletterSubscribe as $ };
