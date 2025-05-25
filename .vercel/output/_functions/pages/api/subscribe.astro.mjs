import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resendApiKey = "re_NW7DnbTi_Ad8yL9mjmVGxkEdNg7SYF4yv";
const resend = new Resend(resendApiKey);
async function POST({ request }) {
  try {
    const { email, firstName, lastName } = await request.json();
    if (!email) {
      return new Response(JSON.stringify({ success: false, error: "Email is required." }), { status: 400 });
    }
    const audienceId = "4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4";
    if (!audienceId) ;
    const result = await resend.contacts.create({
      email,
      firstName: firstName || void 0,
      lastName: lastName || void 0,
      unsubscribed: false,
      audienceId
    });
    return new Response(JSON.stringify({ success: true, result }), { status: 200 });
  } catch (error) {
    let message = "Unknown error";
    if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
      message = error.message;
    }
    console.error("Error in subscribe API:", message, error);
    return new Response(JSON.stringify({ success: false, error: message }), { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
