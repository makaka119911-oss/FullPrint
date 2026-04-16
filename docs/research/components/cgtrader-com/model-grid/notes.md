# CGTrader model-grid — clone attempt

Source: https://www.cgtrader.com/3d-models

## Result
Automated fetch failed from this environment:
- HTTP 403 via `fetch`
- `curl` TLS revocation check error (`CRYPT_E_NO_REVOCATION_CHECK`)
- PowerShell `Invoke-WebRequest` returned CloudFront geo-block HTML

## Practical workaround
- Open the page in a normal browser (often works with VPN / different region).
- Save HTML manually into `raw.html` in this folder if you want pixel-perfect extraction.

## UI direction (what we implement in-app)
- Responsive grid: 1 col mobile, 2 tablet, 3–4 desktop
- Card: preview image, title, author line, price + meta chips (polycount / format)
- Hover: lift + stronger border + subtle shadow
