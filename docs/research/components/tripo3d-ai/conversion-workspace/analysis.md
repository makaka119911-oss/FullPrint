# Tripo Conversion Workspace Notes

Source reviewed: https://www.tripo3d.ai/app

## Important caveat
- The app UI is rendered dynamically after auth/app boot.
- Static HTML extraction contains almost no direct form/viewer elements.

## Visual characteristics captured
- Dark app-like canvas with clear panel separation.
- Workflow-first UX: upload/input -> convert -> preview -> export.
- Prominent progress/status messaging during long-running conversion.
- Action buttons are grouped by primary (generate) and post-result utilities.

## Adaptation in our project
- Added step-based conversion progress (0/3, progress bar).
- Kept strong dark contrast panel style similar to Tripo workspace mood.
- Upgraded CTA to accent gradient and compact action chips for exports.
- Preserved existing API flow and generation ownership checks.

