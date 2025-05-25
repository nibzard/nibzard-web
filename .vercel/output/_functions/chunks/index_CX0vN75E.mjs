import 'kleur/colors';
import { g as getActionQueryString, a as astroCalledServerError, A as ActionError, d as deserializeActionResult, b as ACTION_QUERY_PARAMS, c as appendForwardSlash } from './astro-designed-error-pages_DhmoRFKg.mjs';
import 'es-module-lexer';
import './astro/server_lwrFDKto.mjs';
import 'clsx';
import 'cookie';
import { Resend } from 'resend';
import { d as defineAction } from './server_ff91jMsS.mjs';

const apiContextRoutesSymbol = Symbol.for("context.routes");
const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
function getActionPath(action) {
  let path = `${"/".replace(/\/$/, "")}/_actions/${new URLSearchParams(action.toString()).get(ACTION_QUERY_PARAMS.actionName)}`;
  {
    path = appendForwardSlash(path);
  }
  return path;
}
async function handleAction(param, path, context) {
  if (context) {
    const pipeline = Reflect.get(context, apiContextRoutesSymbol);
    if (!pipeline) {
      throw astroCalledServerError();
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
  const headers = new Headers();
  headers.set("Accept", "application/json");
  let body = param;
  if (!(body instanceof FormData)) {
    try {
      body = JSON.stringify(param);
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Failed to serialize request body to JSON. Full error: ${e.message}`
      });
    }
    if (body) {
      headers.set("Content-Type", "application/json");
    } else {
      headers.set("Content-Length", "0");
    }
  }
  const rawResult = await fetch(
    getActionPath({
      toString() {
        return getActionQueryString(path);
      }
    }),
    {
      method: "POST",
      body,
      headers
    }
  );
  if (rawResult.status === 204) {
    return deserializeActionResult({ type: "empty", status: 204 });
  }
  return deserializeActionResult({
    type: rawResult.ok ? "data" : "error",
    body: await rawResult.text()
  });
}
toActionProxy();

const resend = new Resend("re_NW7DnbTi_Ad8yL9mjmVGxkEdNg7SYF4yv");
const server = {
  subscribe: defineAction({
    accept: "form",
    handler: async (formData) => {
      if (!formData || typeof formData.get("email") !== "string") {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Email is required."
        });
      }
      const email = formData.get("email");
      try {
        const { data, error } = await resend.contacts.create({
          email,
          // You can add firstName, lastName if you collect them
          // firstName: 'Steve',
          // lastName: 'Wozniak',
          unsubscribed: false,
          audienceId: "4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4"
          // IMPORTANT: Replace with your actual Audience ID
        });
        if (error) {
          console.error("Resend API Error:", error);
          throw new ActionError({
            code: "BAD_REQUEST",
            message: error.message || "Failed to subscribe."
          });
        }
        await resend.emails.send({
          from: "Niko <wave@nibzard.com>",
          // Replace with your verified sender
          to: [email],
          subject: "Subscription Confirmation",
          html: '<h1>Thanks for subscribing!</h1><p>You will receive updates from us soon.</p><p><a href="https://nibzard.com/unsubscribe">Unsubscribe</a></p>'
          // Add unsubscribe link
        });
        return { success: true, data };
      } catch (e) {
        console.error("Error in subscribe action:", e);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message || "An unexpected error occurred."
        });
      }
    }
  }),
  unsubscribe: defineAction({
    accept: "form",
    // Or 'json' if you prefer to send data differently from the unsubscribe page
    handler: async (formData) => {
      if (!formData || typeof formData.get("email") !== "string") {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Email is required for unsubscribe."
        });
      }
      const email = formData.get("email");
      try {
        const { data: contacts, error: findError } = await resend.contacts.list({
          audienceId: "4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4"
          // Use the same audience ID
        });
        if (findError) {
          console.error("Resend API Error (find contact):", findError);
          throw new ActionError({
            code: "BAD_REQUEST",
            message: findError.message || "Failed to find contact."
          });
        }
        const contact = contacts?.data.find((c) => c.email === email);
        if (!contact || !contact.id) {
          console.warn(`Unsubscribe attempt for non-existent email: ${email}`);
          return { success: true, message: "Unsubscribe request processed." };
        }
        const { data, error } = await resend.contacts.update({
          id: contact.id,
          unsubscribed: true,
          audienceId: "4f9f7e57-e4dd-43da-b661-1cfbe3d0e5b4"
          // Audience ID is required for update too
        });
        if (error) {
          console.error("Resend API Error (unsubscribe):", error);
          throw new ActionError({
            code: "BAD_REQUEST",
            message: error.message || "Failed to unsubscribe."
          });
        }
        return { success: true, data };
      } catch (e) {
        console.error("Error in unsubscribe action:", e);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message || "An unexpected error occurred during unsubscribe."
        });
      }
    }
  })
};

export { server as s };
