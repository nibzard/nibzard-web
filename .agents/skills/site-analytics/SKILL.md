---
name: site-analytics
description: Pull GA4 and Google Search Console data via the read-only service account. Use when the user mentions analytics, GA4, Search Console, GSC, traffic, page performance, search clicks/impressions, or wants to re-evaluate which articles to feature.
allowed-tools:
  - Bash
  - Read
---

# Site analytics (GA4 + Search Console)

Read-only API access through the local service-account key. No browser login needed.

## Prereq

- Key file: `~/.config/gcloud/nibzard-analytics-sa.json` (override with `SA_KEY` env var).
- The key's service account must already be a user on the Search Console property and a Viewer on the GA4 property.
- APIs enabled on the key's GCP project: `searchconsole`, `analyticsdata`, `analyticsadmin`.

## Mint a token (one scope per token)

```bash
SA="${SA_KEY:-$HOME/.config/gcloud/nibzard-analytics-sa.json}"
b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }
mint() {  # mint <scope-url>  -> access token on stdout
  local HDR NOW CLAIMS CLAIMS_B SIG
  HDR=$(printf '{"alg":"RS256","typ":"JWT"}' | b64url)
  NOW=$(date +%s)
  CLAIMS=$(printf '{"iss":"%s","scope":"%s","aud":"https://oauth2.googleapis.com/token","iat":%s,"exp":%s}' \
    "$(jq -r .client_email "$SA")" "$1" "$NOW" "$((NOW+3600))")
  CLAIMS_B=$(printf '%s' "$CLAIMS" | b64url)
  jq -r .private_key "$SA" > /tmp/sa-key.pem && chmod 600 /tmp/sa-key.pem
  SIG=$(printf '%s.%s' "$HDR" "$CLAIMS_B" | openssl dgst -sha256 -sign /tmp/sa-key.pem | b64url)
  curl -s -X POST https://oauth2.googleapis.com/token \
    -d "grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${HDR}.${CLAIMS_B}.${SIG}" \
    | jq -r '.access_token'
}
GSC_TOK=$(mint "https://www.googleapis.com/auth/webmasters")
GA_TOK=$(mint "https://www.googleapis.com/auth/analytics.readonly")
```

Gotchas:
- GSC scope is `webmasters`. `webmasters.read-only` does not exist and yields an id-token-only response.
- Request both scopes in one token and Google returns only an `id_token`. Always mint one token per scope.
- Sign the JWT with the PEM written to a file; signing straight from process substitution produces an invalid signature.

## Discover the site and property IDs

```bash
SITE=$(curl -s https://searchconsole.googleapis.com/webmasters/v3/sites \
  -H "Authorization: Bearer $GSC_TOK" | jq -r '.siteEntry[0].siteUrl')   # e.g. sc-domain:example.com
SITE_ENC=${SITE/:/%3A}   # colon must be URL-encoded in the path
PROP=$(curl -s "https://analyticsadmin.googleapis.com/v1beta/accountSummaries" \
  -H "Authorization: Bearer $GA_TOK" | jq -r '.accountSummaries[].propertySummaries[0].property | split("/") | last' | head -1)
```

## Pull data

Search Console by page (absolute dates only; relative forms like `90daysAgo` are rejected):

```bash
START=$(date -v-90d +%F); END=$(date +%F)
curl -s -X POST "https://searchconsole.googleapis.com/webmasters/v3/sites/$SITE_ENC/searchAnalytics/query" \
  -H "Authorization: Bearer $GSC_TOK" -H "Content-Type: application/json" \
  -d "{\"startDate\":\"$START\",\"endDate\":\"$END\",\"dimensions\":[\"page\"],\"rowLimit\":100}"
```

GA4 by page (relative dates allowed: `90daysAgo`, `16monthsAgo`, `today`):

```bash
curl -s -X POST "https://analyticsdata.googleapis.com/v1beta/properties/$PROP:runReport" \
  -H "Authorization: Bearer $GA_TOK" -H "Content-Type: application/json" \
  -d '{"dateRanges":[{"startDate":"90daysAgo","endDate":"today"}],"dimensions":[{"name":"pagePath"}],"metrics":[{"name":"screenPageViews"},{"name":"sessions"},{"name":"userEngagementDuration"}],"orderBys":[{"metric":{"metricName":"screenPageViews"},"desc":true}],"limit":120}'
```

Useful variations: dimensions `["query"]` for search terms; `["page","query"]` for per-page terms; GSC data ends about 2 days before today. Google occasionally answers with a non-JSON error page; if `jq` chokes, re-run the call before debugging.

## Interpretation rules

- Run every query twice: full window and `90daysAgo..today`. Cumulative totals conflate launch spikes with steady demand; the recent window shows durable interest.
- Merge trailing-slash and www/non-www URL variants before comparing pages.
- Engagement seconds divided by sessions measures depth; compare it against the site median before calling anything "deep".
- Featured-article decisions are editorial: analytics shortlist, the site's positioning decides.
