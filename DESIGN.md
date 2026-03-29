# Design System Specification: FlowMuse

## 1. Product Vision
FlowMuse should feel like a creative control room for musicians shaping ideas into structured AI-ready prompts. The interface blends the clarity of a modern productivity app with the atmosphere of premium music software. Every screen should feel calm, focused, and slightly futuristic rather than noisy or overly ornamental.

The core design principle is **Studio Precision with Creative Energy**. White space and clear hierarchy keep the workflow readable, while purple and cyan accents introduce a sense of motion, inspiration, and musical identity.

## 2. Color Palette & Usage

### Core Palette
- **Deep Purple** (`#462964`) - Primary brand anchor for headings, strong surfaces, active workspace framing, and high-importance UI moments.
- **Vibrant Purple** (`#9C54D5`) - Active tab states, focused inputs, selected controls, slider fills, and highlighted data.
- **Bright Cyan** (`#5EE2F0`) - Hover accents, suggestion chip highlights, secondary emphasis, and positive interaction feedback.
- **White** (`#FFFFFF`) - Main canvas color for readability and spaciousness.

### Supporting Neutrals
- **Studio Mist** (`#F7F5FB`) - App background wash used to soften the white canvas.
- **Soft Lilac Surface** (`#F2ECFA`) - Secondary cards and elevated panel backdrops.
- **Graphite Ink** (`#241C2E`) - Primary body text.
- **Muted Slate** (`#6E647A`) - Secondary text, helper copy, and placeholder text.

### Signature Gradient
Use the FlowMuse brand gradient only for moments that need clear emphasis:

`linear-gradient(90deg, #462964 0%, #9C54D5 50%, #5EE2F0 100%)`

Preferred uses:
- Brand marks
- Active tab indicators
- Primary buttons
- Highlight panels for generated prompt output

Avoid using the gradient as a page background. It should feel intentional and premium.

## 3. Typography
- **Headings:** `Sora`, SemiBold or Bold
- **Body / Inputs / Labels:** `Inter`, Regular or Medium

### Type Scale
- **Display** - Large workspace or brand titles
- **Section Heading** - Tab and card headers
- **Field Label** - Small uppercase or semi-bold utility labels
- **Body** - Inputs, prompt text, helper text

Typography should feel modern, crisp, and slightly editorial. Headings should use Deep Purple for authority. Body copy should stay dark and neutral for readability.

## 4. Layout Principles
- Desktop-first responsive layout with a centered main shell.
- Use a top header for product identity and status context.
- Place a horizontal tab bar directly beneath the header.
- Use a card-based content workspace with generous spacing and soft grouping.
- Prefer wide, readable forms over crowded multi-column density.
- On smaller screens, stack cards vertically and allow the tab bar to scroll horizontally.

The overall composition should resemble a creative studio dashboard rather than a generic SaaS admin panel.

## 5. Surface & Elevation
- Use white or near-white cards on a soft tinted background.
- Cards should have rounded corners between `16px` and `24px`.
- Shadows should be subtle, diffused, and soft rather than dramatic.
- Borders should be light and understated, using translucent purple-gray values when needed.
- Important panels can use faint tinted fills or blurred gradient glows to suggest energy and motion.

## 6. Component Rules

### Header
- Clean horizontal layout with FlowMuse branding.
- Include a subtle gradient accent or glow behind the logo mark.
- Maintain enough padding to feel premium and airy.

### Tab Navigation
- Rounded segmented navigation or pill-based tab row.
- Active tab uses purple or gradient emphasis.
- Inactive tabs remain calm and neutral with clear hover feedback.

### Cards
- Rounded, elevated, and spacious.
- Card titles should use Sora.
- Group related fields inside cards with consistent vertical rhythm.

### Inputs
- Rounded corners with soft borders.
- White background by default.
- Focus states should glow in purple or cyan.
- Placeholder text should stay muted and unobtrusive.

### Dropdowns
- Match text inputs visually.
- Use simple generic options for now.
- Selected state should feel polished but not overly heavy.

### Suggestion Chips
- Small pill-shaped chips with concise text.
- Default state uses a pale purple or white fill.
- Hover state can shift toward Bright Cyan.
- Selected or clicked chips should feel reactive and musical, not flat.

### Slider
- Rounded track with a Vibrant Purple active fill.
- Thumb should feel slightly oversized and tactile.
- Display BPM value clearly nearby.

### Arrangement Editor
- Each song section appears on its own row.
- Rows should resemble lightweight timeline or arrangement strips.
- Each row includes the section name and an intensity dropdown.
- Keep the editor clean, structured, and easy to scan.

### Prompt Workspace
- The generated prompt should live inside a large, polished output panel.
- Support clear actions for copy, save, load, delete, and unload.
- Saved prompt controls should feel like part of a final production console.

## 7. Motion & Interaction
- Use subtle hover lift and color transitions.
- Focus animations should be smooth and low-stress.
- Chips and buttons can slightly translate upward on hover.
- Avoid excessive motion; interactions should support concentration.

## 8. Iconography
- Use clean outline icons similar to Lucide.
- Icons should be rounded, minimal, and lightweight.
- Recommended metaphors:
  - Main: music, sliders, waveform
  - Premises: pen, book, idea
  - Vocals: microphone, audio lines
  - Instruments: guitar, piano, drum, equalizer
  - Structure: layers, list tree
  - Prompt: sparkles, clipboard, folder, trash

## 9. Implementation Notes
- Keep all data placeholders generic for now.
- Prioritize layout, interaction quality, and visual consistency over content depth.
- The first implementation should establish a reusable design foundation for later expansion into richer prompt logic and saved-project behavior.
