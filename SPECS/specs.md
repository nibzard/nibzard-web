# Project Brief: Minimalist Personal Website with Astro
## nibzard.com

## Overview
Create a personal website with a clean, minimalist aesthetic inspired by Scandinavian/Japanese/Bauhaus design principles. The site will feature a light color scheme with colorful accents, monospace typography, and subtle animations using Framer Motion. The website will be deployed on Cloudflare Pages with Cloudflare KV for any necessary data storage.

## Tech Stack
- **Framework**: Astro
- **Animation**: Framer Motion (via React islands)
- **Styling**: Modern CSS (custom properties, grid, flexbox)
- **Deployment**: Cloudflare Pages
- **Storage**: Cloudflare KV (if needed)
- **Version Control**: Git/GitHub

## Project Setup

### Step 1: Environment Setup
1. Ensure Node.js (v18+) and npm are installed
2. Install the Cloudflare Wrangler CLI tool:
   ```bash
   npm install -g wrangler
   ```
3. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

### Step 2: Install Required Dependencies
```bash
npm install framer-motion
npm install -D @astrojs/react react react-dom
```

### Step 3: Configure Astro
1. Update `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import react from '@astrojs/react';

   export default defineConfig({
     integrations: [react()],
     site: 'https://nibzard.com',
     output: 'static',
   });
   ```

### Step 5: Project Structure Setup
Check the following file structure:
```
nibzard/
├── public/
│   ├── fonts/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   └── animations/
│   │       └── FadeIn.jsx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── LogEntryLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── now.astro
│   │   ├── about.astro
│   │   ├── log.astro
│   │   └── log/
│   │       └── [...slug].astro
│   ├── content/
│   │   └── log/
│   │       ├── entry-1.md
│   │       └── entry-2.md
│   └── styles/
│       ├── global.css
│       ├── typography.css
│       ├── variables.css
│       └── utilities.css
└── package.json
```

### Step 6: CSS Setup
1. Create `src/styles/variables.css`:
   ```css
   :root {
     /* Color Palette */
     --color-background: #ffffff;
     --color-text: #222222;
     --color-accent-1: #FF6B6B; /* Vibrant coral */
     --color-accent-2: #4ECDC4; /* Turquoise */
     --color-accent-3: #FFE66D; /* Pale yellow */
     --color-subtle: #F7F7F7;
     
     /* Typography */
     --font-mono: 'JetBrains Mono', 'Roboto Mono', monospace;
     --font-sans: 'Inter', system-ui, sans-serif;
     
     /* Spacing */
     --space-xs: 0.25rem;
     --space-sm: 0.5rem;
     --space-md: 1rem;
     --space-lg: 2rem;
     --space-xl: 4rem;
     
     /* Other */
     --border-radius: 2px;
     --transition-normal: 0.3s ease;
   }
   ```

2. Create `src/styles/global.css`:
   ```css
   @import './variables.css';
   @import './typography.css';
   @import './utilities.css';

   html, body {
     margin: 0;
     padding: 0;
     background-color: var(--color-background);
     color: var(--color-text);
     font-family: var(--font-sans);
   }

   main {
     max-width: 800px;
     margin: 0 auto;
     padding: var(--space-lg);
   }

   a {
     color: var(--color-text);
     text-decoration-color: var(--color-accent-1);
     text-decoration-thickness: 2px;
     text-underline-offset: 2px;
     transition: all var(--transition-normal);
   }

   a:hover {
     color: var(--color-accent-1);
   }
   ```

3. Create `src/styles/typography.css`:
   ```css
   h1, h2, h3, h4, h5, h6 {
     font-family: var(--font-mono);
     font-weight: 500;
   }

   h1 {
     font-size: 2.5rem;
     line-height: 1.2;
   }

   code, pre {
     font-family: var(--font-mono);
     background-color: var(--color-subtle);
     padding: var(--space-xs) var(--space-sm);
     border-radius: var(--border-radius);
   }
   ```

### Step 7: Component Development

1. Create base layout in `src/layouts/BaseLayout.astro`:
   ```astro
   ---
   import '../styles/global.css';
   import Header from '../components/Header.astro';
   import Footer from '../components/Footer.astro';

   const { title = 'Personal Site' } = Astro.props;
   ---

   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="icon" type="image/svg+xml" href="/favicon.svg">
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
     <title>{title}</title>
   </head>
   <body>
     <Header />
     <main>
       <slot />
     </main>
     <Footer />
   </body>
   </html>
   ```

2. Create Framer Motion component in `src/components/animations/FadeIn.jsx`:
   ```jsx
   import React from 'react';
   import { motion } from 'framer-motion';

   export default function FadeIn({ children, delay = 0, duration = 0.5 }) {
     return (
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ 
           duration: duration,
           delay: delay,
           ease: [0.25, 0.1, 0.25, 1.0]
         }}
       >
         {children}
       </motion.div>
     );
   }
   ```

3. Create Header component in `src/components/Header.astro`:
   ```astro
   ---
   import Navigation from './Navigation.astro';
   ---

   <header>
     <div class="header-container">
       <a href="/" class="logo">nibzard</a>
       <Navigation />
     </div>
   </header>

   <style>
     header {
       padding: var(--space-md) var(--space-lg);
       border-bottom: 1px solid var(--color-subtle);
     }
     
     .header-container {
       max-width: 800px;
       margin: 0 auto;
       display: flex;
       justify-content: space-between;
       align-items: center;
     }
     
     .logo {
       font-family: var(--font-mono);
       font-weight: 500;
       font-size: 1.2rem;
       text-decoration: none;
     }
   </style>
   ```

4. Create Navigation component in `src/components/Navigation.astro`:
   ```astro
   <nav>
     <ul>
       <li><a href="/">Home</a></li>
       <li><a href="/now">Now</a></li>
       <li><a href="/log">Log</a></li>
       <li><a href="/about">About</a></li>
     </ul>
   </nav>

   <style>
     nav ul {
       display: flex;
       gap: var(--space-lg);
       list-style: none;
       padding: 0;
       margin: 0;
     }
     
     nav a {
       text-decoration: none;
       font-family: var(--font-mono);
       font-size: 0.9rem;
       letter-spacing: 0.5px;
     }
     
     @media (max-width: 600px) {
       nav ul {
         gap: var(--space-md);
       }
     }
   </style>
   ```

### Step 8: Create Pages

1. Create homepage in `src/pages/index.astro`: [DONE]
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   // Assuming FadeIn component might be added later or is optional
   // import { FadeIn } from '../components/animations/FadeIn';
   ---

   <BaseLayout title="nibzard - Home" description="Welcome to nibzard, a minimal personal website and log.">
     <style>
       .hero {
         text-align: center;
         padding: var(--space-xl) 0;
       }
       .hero h1 {
         font-size: 3rem; /* Larger for hero */
         margin-bottom: var(--space-sm);
       }
       .hero p {
         font-size: 1.2rem;
         color: #555; /* Slightly muted text for tagline */
         font-family: var(--font-sans);
         max-width: 60ch;
         margin: 0 auto var(--space-lg) auto;
       }
       .cta-button {
         display: inline-block;
         padding: var(--space-sm) var(--space-lg);
         background-color: var(--color-accent-1);
         color: var(--color-background); /* White text on accent color */
         text-decoration: none;
         font-family: var(--font-mono);
         border-radius: var(--border-radius);
         transition: background-color var(--transition-normal);
       }
       .cta-button:hover {
         background-color: var(--color-accent-2);
         color: var(--color-background);
       }
       .recent-posts { /* Added based on current index.astro */
         /* Styles for recent posts section if needed */
         margin-top: var(--space-xl);
         text-align: center; /* Or as desired */
       }
       .recent-posts h2 {
          margin-bottom: var(--space-md);
       }
     </style>
     <section class="hero fade-in"> {/* Assuming fade-in class is handled by global CSS or a component */}
       <h1>nibzard</h1>
       <p>A minimal personal website and log. Exploring ideas, projects, and everything in between.</p>
       <a href="/log" class="cta-button">View Log</a>
     </section>

     <section class="recent-posts">
       <h2>Recent Thoughts</h2>
       <p><em>(Content for recent posts will be dynamically populated here later)</em></p>
       <p><a href="/log">Browse all entries &rarr;</a></p>
     </section>
   </BaseLayout>

   <style>
     .hero {
       margin: var(--space-xl) 0;
     }
     
     .subtitle {
       font-size: 1.2rem;
       color: #555;
     }
     
     .accent {
       color: var(--color-accent-1);
     }
     
     .recent {
       margin: var(--space-xl) 0;
     }
     
     .entry-list {
       list-style: none;
       padding: 0;
     }
     
     .entry-list li {
       margin-bottom: var(--space-md);
       display: flex;
       align-items: baseline;
     }
     
     time {
       font-family: var(--font-mono);
       font-size: 0.8rem;
       color: #777;
       margin-right: var(--space-md);
       min-width: 100px;
     }
     
     .view-all {
       display: inline-block;
       margin-top: var(--space-lg);
       font-family: var(--font-mono);
     }
   </style>
   ```

2. Create similar pages for `/now.astro`, `/about.astro`, and `/log.astro` following the same pattern.

### Step 9: Implement Log/Changelog

1. Create `src/layouts/LogEntryLayout.astro` for individual log entries:
   ```astro
   ---
   import BaseLayout from './BaseLayout.astro';
   const { frontmatter } = Astro.props;
   ---

   <BaseLayout title={`${frontmatter.title} | Log`}>
     <article class="log-entry">
       <header>
         <h1>{frontmatter.title}</h1>
         <time datetime={frontmatter.date}>
           {new Date(frontmatter.date).toLocaleDateString('en-US', {
             year: 'numeric',
             month: 'long',
             day: 'numeric'
           })}
         </time>
         {frontmatter.tags && (
           <div class="tags">
             {frontmatter.tags.map((tag) => (
               <span class="tag">{tag}</span>
             ))}
           </div>
         )}
       </header>
       
       <div class="content">
         <slot />
       </div>
       
       <footer>
         <a href="/log">← Back to all entries</a>
       </footer>
     </article>
   </BaseLayout>

   <style>
     .log-entry {
       margin: var(--space-xl) 0;
     }
     
     header {
       margin-bottom: var(--space-xl);
     }
     
     time {
       display: block;
       font-family: var(--font-mono);
       font-size: 0.9rem;
       color: #777;
       margin: var(--space-md) 0;
     }
     
     .tags {
       display: flex;
       gap: var(--space-sm);
       margin-top: var(--space-md);
     }
     
     .tag {
       background-color: var(--color-subtle);
       padding: var(--space-xs) var(--space-sm);
       border-radius: var(--border-radius);
       font-size: 0.8rem;
       font-family: var(--font-mono);
     }
     
     footer {
       margin-top: var(--space-xl);
       padding-top: var(--space-lg);
       border-top: 1px solid var(--color-subtle);
     }
   </style>
   ```

2. Create a sample log entry in `src/content/log/entry-1.md`:
   ```markdown
   ---
   title: First Entry Title
   date: 2025-05-01
   tags: [project, thoughts]
   layout: ../../layouts/LogEntryLayout.astro
   ---

   This is your first log entry content. You can write anything here using Markdown.

   ## Subheading

   - List item one
   - List item two

   Some code example:

   ```js
   const greeting = "Hello, world!";
   console.log(greeting);
   ```
   ```

3. Set up dynamic routes for log entries in `src/pages/log/[...slug].astro`:
   ```astro
   ---
   export async function getStaticPaths() {
     const logEntries = await Astro.glob('../../content/log/*.md');
     
     return logEntries.map(entry => ({
       params: { 
         slug: entry.file.split('/').pop().replace('.md', '') 
       },
       props: { entry },
     }));
   }

   const { entry } = Astro.props;
   const { Content } = entry;
   ---

   <Content />
   ```

### Step 10: Cloudflare Deployment Setup

1. Create a `wrangler.toml` file in the project root:
   ```toml
   name = "nibzard"
   type = "webpack"
   account_id = "your-account-id"
   workers_dev = true
   route = ""
   zone_id = ""

   [site]
   bucket = "./dist"
   entry-point = "workers-site"
   ```

2. Add build scripts to `package.json`:
   ```json
   "scripts": {
     "dev": "astro dev",
     "build": "astro build",
     "preview": "astro preview",
     "deploy": "astro build && wrangler publish"
   }
   ```

### Step 11: Git Setup & GitHub Repository

1. Initialize Git:
   ```bash
   git init
   ```

2. Create `.gitignore`:
   ```
   node_modules/
   dist/
   .env
   .DS_Store
   ```

3. Create repository on GitHub and push:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/nkkko/nibzard.git
   git push -u origin main
   ```

### Step 12: Testing & Deployment

1. Test locally:
   ```bash
   npm run dev
   ```

2. Deploy to Cloudflare Pages:
   ```bash
   npm run deploy
   ```

## Deliverables
1. Complete source code in a GitHub repository
2. Deployed website on Cloudflare Pages
3. Documentation on how to add new log entries
4. Basic instructions for future maintenance and updates

## Timeline
- Project setup and environment configuration: 1 day
- Component development and styling: 2-3 days
- Content creation and page implementation: 2 days
- Testing and deployment: 1 day
- Total estimated time: 6-7 days

## Notes for Developer
- Keep animations subtle and performance-focused
- Ensure the site is fully responsive for all device sizes
- Focus on typography and whitespace for the minimal aesthetic
- Use the monospace font for headlines and UI elements, but keep body text in a sans-serif font for readability
- Consider implementing a simple dark mode toggle despite the client's preference for light mode