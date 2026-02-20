# Release notes

This file is the single copy paste source for release notes, organized by Figma Community version.

Current published version: v4
Next planned version: v5

## v4

### Summary

v4 adds OKLCH output and makes the format list customizable with drag and drop ordering that persists across sessions.

### Highlights

* Added OKLCH format output
* Added drag and drop reordering of format rows
* Persisted format order using figma.clientStorage
* Added a reset control when the order differs from the default

### Details

* Formats supported: HEX, RGB, HSL, CSS, OKLCH
* OKLCH conversion uses linear RGB to XYZ to OKLab to OKLCH
* UI updated to fit the additional row and maintain consistent spacing

### Compatibility

* Figma desktop
* Figma web

### Plugin ID

1605725747312426245

## v3

### Summary

v3 introduces smart color naming based on the NTC database and improves overall UI polish and responsiveness.

### Highlights

* Added smart color naming with a 1,566 color database
* Added exact versus approximate matching indicator
* Added click to copy for the color name
* Improved micro interactions and responsive layout

### Plugin ID

1605725747312426245
