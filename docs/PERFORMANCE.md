# Performance

The app prioritizes product UI over decorative media in the authenticated shell. Generated editorial images are loaded only on the public story section; the layout uses responsive object-fit crops and the static fallback remains usable without them. Avoid adding video or 3D unless it improves comprehension. Production work should add responsive image transforms, lazy loading, bundle analysis, route-level code splitting, font self-hosting, and Core Web Vitals monitoring.
