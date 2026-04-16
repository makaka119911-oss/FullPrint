# O.xyz Animations Notes

Source reviewed: https://o.xyz

## What we observed in `raw.html`
- The page ships an inline animation runtime (WAAPI / motion primitives) bundled into a large `<script>` block.
- This is not something we should copy verbatim into the app bundle.

## What we adopted (product-friendly)
- Soft page entrance (fade + slight translate + blur settle).
- Consistent easing curves for interactive elements.
- Subtle press feedback on buttons/links.
- Optional shimmer sweep on gradient CTAs.
- `prefers-reduced-motion` disables motion.

## Implementation location
- Global motion tokens + keyframes: `app/globals.css`
- Motion root wrapper: `app/layout.tsx` (`fp-motion-root`)
