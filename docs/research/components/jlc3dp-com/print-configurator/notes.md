# JLC3DP print-configurator — clone attempt

Source attempted: https://jlc3dp.com/quote

## Result
Automated fetch did not yield a usable static configurator UI:
- `fetch` returned HTTP 404 for `/quote`
- HTML response indicates a JS-heavy Nuxt app and ends up as a generic 404 shell

## Practical workaround
- Open the quote flow in a browser and save HTML manually if you need exact markup.
- Otherwise implement the UX based on common JLC-like quoting patterns (material, layer height, infill, qty, lead time).
