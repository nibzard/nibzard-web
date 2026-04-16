import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const bodyField = {
  type: "rich-text" as const,
  name: "body",
  label: "Body",
  isBody: true,
};

const baseSeoFields = [
  {
    type: "boolean" as const,
    name: "draft",
    label: "Draft",
  },
  {
    type: "string" as const,
    name: "author",
    label: "Author",
  },
];

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
      static: false,
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN!,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  schema: {
    collections: [
      {
        name: "log",
        label: "Log",
        path: "src/content/log",
        // This collection is markdown-only for now.
        // The repo has an `.mdx` log entry with an Astro component import,
        // which Tina cannot safely round-trip without explicit MDX templates.
        match: {
          exclude: "agent-stress-test",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tldr",
            label: "TL;DR",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
          },
          {
            type: "datetime",
            name: "updated",
            label: "Updated Date",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "topics",
            label: "Topics",
            list: true,
          },
          {
            type: "string",
            name: "entities",
            label: "Entities",
            list: true,
          },
          {
            type: "string",
            name: "answers_questions",
            label: "Answers Questions",
            list: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          ...baseSeoFields,
          bodyField,
        ],
      },
      {
        name: "now",
        label: "Now",
        path: "src/content/now",
        fields: [
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          ...baseSeoFields,
          bodyField,
        ],
      },
      {
        name: "thoughts",
        label: "Thoughts",
        path: "src/content/thoughts",
        fields: [
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          ...baseSeoFields,
          bodyField,
        ],
      },
      {
        name: "images",
        label: "Images",
        path: "src/content/images",
        fields: [
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "image",
            name: "imageUrl",
            label: "Image",
          },
          ...baseSeoFields,
          bodyField,
        ],
      },
      {
        name: "idea",
        label: "Ideas",
        path: "src/content/idea",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["product", "service", "campaign", "strategy", "innovation"],
          },
          ...baseSeoFields,
          bodyField,
        ],
      },
    ],
  },
});
