# Project Instructions — Premium 3D Cinematic Website

## Role
Act as a senior Next.js/TypeScript engineer, Three.js and React Three Fiber specialist, GSAP animation engineer, performance engineer, and premium UI/UX designer.

## Project Goal
Evolve the existing Next.js project into a premium, dark, futuristic, cinematic website featuring original interactive 3D robot characters. The result should feel like a high-end creative technology agency experience, not a generic template.

---

## ⚡ Non-Negotiable Performance & Smooth Motion Standards

The website **must not lag, stutter, or hang under any circumstance**. Animations must be weightless, gentle, and buttery smooth (targeting stable 60–120 FPS).

### 1. Zero-Hang Animation Loop
- **Frame-Rate Independent Damping**: Never use fixed-rate linear interpolation (`val += (target - val) * 0.1`). Use delta-based exponential decay: `val += (target - val) * (1 - Math.exp(-lambda * delta))`.
- **Delta-Time Clamping**: Always clamp frame delta (`Math.min(delta, 0.05)`). Prevent "catch-up" teleportation or browser freezing when returning from a background tab.
- **Offscreen & Background Freeze**: All WebGL render loops must immediately suspend when the canvas is scrolled out of the viewport (`IntersectionObserver`) or when the browser tab is hidden (`document.hidden`).

### 2. Zero-Leak WebGL Resource Management
- **Explicit Garbage Collection**: Never rely solely on JavaScript garbage collection for Three.js. Every instantiated `Geometry`, `Material`, and `Texture` must be explicitly traversed and disposed of on component unmount.
- **Context Limit Protection**: Never mount redundant WebGL canvases. Respect the browser's hard limit of 8–16 contexts by sharing canvases or cleanly dismantling inactive scenes.
- **Adaptive DPR**: Cap `devicePixelRatio` strictly at `1.5` for desktop and `1.0–1.2` for mobile to prevent fill-rate GPU choking on Retina/4K displays.

### 3. Gentle Smooth Transitions
- **Cinematic Easing**: Use sophisticated decelerating curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` or GSAP `power3.out`). Never use jarring instant cuts or harsh spring bounces.
- **Hardware-Accelerated Properties**: Only animate `transform` and `opacity`. Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`).
- **Single Property Ownership**: Assign exactly one owner per animated property. GSAP, Motion, and `useFrame` must never fight for control of the same object property simultaneously.

---

## Non-Negotiable Workflow
1. Inspect the repository before editing.
2. Read `.agent/SKILLS/3d-cinematic-website/SKILL.md` and `.agent/RULES/*.mdc`.
3. Inspect `package.json`, lockfile, Next.js version, React version, TypeScript settings, styling system, and current routes.
4. Preserve the existing architecture and design unless a change is necessary and explained.
5. Check compatibility before installing or upgrading dependencies. Do not blindly upgrade Next.js or React.
6. Propose a short implementation plan before making broad changes.
7. Implement in small, verifiable milestones.
8. Run lint, type-check, and production build commands that actually exist in the project.
9. Report changed files, commands run, test results, and remaining work honestly.

## Design Direction
- Dark charcoal/black foundations (`#0a0a0c`, `#111317`).
- Metallic materials with restrained amber, electric-blue, and cyber-red accents.
- Cinematic lighting, controlled glow, atmospheric depth, and premium typography.
- Clear hierarchy, generous spacing, strong contrast, and accessible controls.
- Responsive compositions designed deliberately for desktop, tablet, and mobile.
- Motion should communicate hierarchy and storytelling, not merely decorate.

## Technical Direction
- Next.js App Router and TypeScript.
- Three.js and React Three Fiber for 3D.
- Drei for useful R3F helpers.
- GSAP/ScrollTrigger for timeline and scroll choreography.
- Motion for interface transitions and micro-interactions.
- Client-only dynamic imports with SSR disabled for browser-dependent canvas code.
- Semantic HTML, headings, navigation, and SEO metadata must live outside the WebGL canvas.

## 3D Asset and IP Rules
- Use original, commissioned, public-domain, or appropriately licensed assets.
- Verify commercial website use, modification, redistribution, attribution, and animation/rigging rights before use.
- Do not assume that a model being downloadable means it is commercially usable.
- Do not reproduce Transformers characters, names, logos, signature silhouettes, or recognizable character designs without appropriate written authorization.
- Prefer an original robot visual identity with distinct proportions, panel layout, head design, color scheme, and insignia.
- Never fabricate asset licenses or claim rights have been verified when they have not.

## Accessibility
- Respect `prefers-reduced-motion` with static or gentle cross-fade fallbacks.
- Ensure keyboard navigation, visible focus states, readable contrast, and semantic HTML.
- Provide loading, error, and WebGL-unavailable fallbacks.
- Do not make essential information available only inside the 3D scene.

## Code Quality
- Prefer small, reusable, typed components.
- Avoid giant components and unnecessary abstractions.
- Avoid unnecessary dependencies and global mutable state.
- Handle loading and errors explicitly.
- Clean up event listeners, animation timelines, and Three.js resources on unmount.
- Do not suppress TypeScript or lint errors just to make a build pass.

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command from this file's directory: npx @next/codemod agents-md --output AGENTS.md|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-partial-prerendering.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers-and-middleware.mdx,16-deploying.mdx,17-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,middleware.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,eslint.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,logging.mdx,mdxRs.mdx,middlewareClientMaxBodySize.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,ppr.mdx,productionBrowserSourceMaps.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackPersistentCaching.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useCache.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{amp.mdx,analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,middleware.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-amp.mdx,use-report-web-vitals.mdx,use-router.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,eslint.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,middlewareClientMaxBodySize.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,runtime-configuration.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbo.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
