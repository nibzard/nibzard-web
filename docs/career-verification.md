# About and CV verification

11 September 2026.

## Result

- About is the canonical personal introduction.
- CV contains the formal career record and a print/save-to-PDF action.
- Both `/bio` and `/bio/` return HTTP 301 to `/about`.
- Article author links and structured author metadata use About.
- The generated sitemap includes About and CV and excludes Bio.

## Checks

`tests/workbench.browser.mjs` passes 42 route and viewport combinations. It also checks redirect status, canonical and author metadata, the speaker disclosure, photo download, section links, and the print action. Existing search, sharing, content negotiation, keyboard, theme, and no-JavaScript checks still pass.

Inspected About and CV on mobile and desktop. Checked the preview through Tailscale. Generated a five-page A4 PDF with dark appearance selected. Verified white page margins, complete role entries, and readable extracted text. Print uses Arial because the Saans export interferes with text extraction.

The production build passes with the local Tina Cloud search upload disabled. This is the same local build configuration used for the site redesign. No production deployment was performed.

## Preview

- https://claude-code-vm.tailef8c96.ts.net:8443/about
- https://claude-code-vm.tailef8c96.ts.net:8443/cv

The preview process runs in the transient `nibzard-web-preview.service` unit. Recreate the unit after stopping it and wait for an HTTP response before testing.

See `career-sources.md` for the source record and remaining date corrections.
