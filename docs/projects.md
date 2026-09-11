# GitHub projects

GitHub provides public repository metadata. `src/config/projects.json` controls the selection. The site renders from `src/data/github-projects.json`, a saved snapshot. Visitors make no GitHub requests.

## Select a project

Add an entry to `repos` in `src/config/projects.json`:

```json
"nibzard/example": {
  "visibility": "visible",
  "featured": true,
  "order": 1,
  "title": "Example",
  "description": "An optional editorial description.",
  "article": "/example"
}
```

All settings except visibility are optional. New repositories use `defaults.visibility`, currently `hidden`. Keep this default to review projects before they appear.

| Setting | Effect |
| --- | --- |
| `visibility` | `visible` includes the project; `hidden` removes it from the directory, features, and homepage. |
| `featured` | Adds a feature above the directory. The first feature also supplies the homepage specimen. |
| `order` | Lower values appear first within the featured or regular group. Unordered entries follow recent push activity. |
| `homepage` | Includes the project in the homepage's small-tools list, limited to three visible entries. |
| `title`, `description`, `topics` | Override GitHub values. Remove a setting to follow GitHub again. |
| `article` | Links the project to an existing local article. |
| `attribution` | A short credit, such as “At Steel”. |
| `example` | A documented command example, rendered as selectable text. |
| `image` | Optional local `src`, descriptive `alt`, and numeric `width` and `height`. Features work without an image. |

An editor can use `projects.schema.json` for suggestions and validation. Runtime checks also reject invalid settings. Visibility takes precedence over featured and homepage settings.

## Refresh metadata

Run `pnpm run projects:sync`. The script fetches all pages of the owner's public repositories, plus every public repository in the configured `organizations` list and any other explicit repository entries. It stores names, descriptions, links, topics, primary languages, activity dates, and archive/fork status. It does not store credentials, private repositories, or raw API responses.

An optional `GITHUB_TOKEN` or `GH_TOKEN` raises the request limit. It is used only by the sync process. Never put it in the sidecar or a public environment variable.

`pnpm run build` syncs before building. Development reads the saved snapshot; run the sync command to refresh it. Use `PROJECTS_OFFLINE=1 pnpm run build` when you need a network-independent build.

If GitHub is unavailable, a normal build keeps the previous valid snapshot. Without a valid snapshot, sync failures stop the build. `pnpm run projects:sync --strict` fails on any transient API error and is used by automation. A complete successful refresh removes repositories that are no longer public or available. Renamed repositories require updating the sidecar key.

The snapshot is replaced only after all requests finish. Unchanged metadata does not produce a file change or daily commit.

## Daily automation

`.github/workflows/sync-projects.yml` runs at 06:23 UTC and supports manual dispatch. It checks the sync tests, fetches metadata, verifies the site build, and commits only a changed snapshot to the default branch. It uses the repository's built-in token. The local Tina Cloud search upload is disabled for this verification build.

The schedule becomes active after the workflow is pushed to the default branch and Actions is enabled. Branch rules must allow the bot to push. The workflow does not deploy the site itself; deployment remains with the existing Git integration.

GitHub documents that token-generated pushes do not start other push-triggered Actions workflows. If deployment later moves into Actions, call it explicitly from this workflow or use an appropriate app token. See [GitHub workflow triggers](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow).

API behavior follows [GitHub's public repository endpoint](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user). The sync requests 100 repositories per page and follows all pages.

## Verification

Run `pnpm run test:projects` for selection, overrides, ordering, pagination, privacy filtering, renamed/deleted repositories, and offline fallback. Run `pnpm run build` before pushing.

Verified on 11 September 2026: 283 public repositories synced, with all 30 existing selections preserved. Eight sync tests and 42 browser route/viewport checks pass. The browser checks confirm that unselected repositories stay hidden and project metadata makes no client-side GitHub requests. Both online and offline builds pass. The local build skips the Tina Cloud search upload. The daily workflow is added but has not been pushed or run on GitHub.

## September feature update

`organizations: ["steel-experiments"]` enables automatic organization discovery. Its new repositories remain hidden under the existing default. Wire, skillctl, and Durable Researcher supply the homepage selection. Linkripper is also featured on Projects. OpenAPI Agent Lab and the official `steel-dev/pi-steel` integration are visible in the directory. AgentProbe remains available but is no longer the lead feature. Wire’s command example comes from its README; it is not a simulated run.
