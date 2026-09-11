---
name: add-project
description: Add or curate GitHub projects on nibzard-web using the project sidecar and GitHub metadata sync.
allowed-tools: Bash, Read, Edit
---

# Add a project to nibzard-web

GitHub metadata is synced automatically. Do not add repository arrays to Astro pages.

1. Read `src/config/projects.json` and `docs/projects.md`.
2. Add the full `owner/repository` key to `repos` with `"visibility": "visible"`. Organization repositories are supported. Add an organization to `organizations` for automatic public discovery; its new projects still use the default visibility.
3. Add only needed editorial overrides. Use `featured`, `order`, `homepage`, `title`, `description`, `topics`, `article`, `image`, `attribution`, and `example` as documented. Hidden projects must remain hidden everywhere.
4. Run `pnpm run projects:sync --strict` to verify the public repository and refresh the snapshot. If a repository moved, update its key to the current name. Never make a private repository visible.
5. Run `pnpm run test:projects` and `pnpm run build`.

New repositories stay hidden by default. Source metadata lives in `src/data/github-projects.json`. Do not manually edit the generated snapshot. No authenticated GitHub CLI session is required; the sync can read public repositories without a token.
