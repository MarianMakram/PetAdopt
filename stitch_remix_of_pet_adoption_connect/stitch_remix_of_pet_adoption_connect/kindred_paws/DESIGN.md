```markdown
# Design System Document: The Empathetic Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Living Sanctuary"**

This design system transcends the typical "directory" feel of adoption platforms. Instead of a clinical grid of data, we are building a "Living Sanctuary"—a high-end, editorial-inspired digital space that treats every animal with the dignity of a magazine cover story. 

We break the "template" look by rejecting rigid borders and standard container boxes. We use **intentional asymmetry**, where high-quality photography breaks out of containers, and **layered tonal depth** to create a sense of physical space. The goal is to move the user emotionally, using vast white space (breath) and sophisticated typography to signal that this is a professional, trustworthy, and premium experience.

---

## 2. Colors & Atmospheric Layering
The palette is a sophisticated dialogue between deep, trustworthy teals (`primary`) and warm, energetic terracotta accents (`secondary`). 

### The "No-Line" Rule
**Borders are forbidden for sectioning.** To define a new content area, you must use a background shift (e.g., transitioning from `surface` to `surface-container-low`). This creates a seamless, organic flow that feels modern and expensive.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested, physical layers. 
- **Base Layer:** `surface` (#e9f9ff) — The foundation of the page.
- **Mid-Tier:** `surface-container-low` (#d9f6ff) — Used for secondary content blocks.
- **Top-Tier:** `surface-container-lowest` (#ffffff) — Reserved for the most important interactive cards to make them "pop" against the tinted background.

### The "Glass & Gradient" Rule
To add soul to the UI, avoid flat `primary` fills for large areas. Use a subtle linear gradient from `primary` (#00656f) to `primary-container` (#89e9f6) at a 135-degree angle. For floating navigation or modals, utilize **Glassmorphism**: 
- **Fill:** `surface` at 70% opacity.
- **Effect:** Background Blur (20px–30px).
- **Result:** Elements feel integrated into the environment rather than "pasted" on top.

---

## 3. Typography: The Editorial Voice
We utilize a dual-sans-serif approach to balance authority with approachability.

*   **Display & Headlines (Plus Jakarta Sans):** A modern, slightly wide sans-serif that feels high-end and confident. Use `display-lg` for hero sections to create a "magazine masthead" feel.
*   **Body & Labels (Be Vietnam Pro):** Chosen for its exceptional legibility and warm, technical precision.

**Typography as Brand:** 
- Use `display-md` with `secondary` (#9b3e20) color for emotional pull quotes about adoption.
- Pair `headline-sm` with `on-surface-variant` (#2c6370) for a sophisticated, low-contrast secondary header that doesn't compete with the animal photography.

---

## 4. Elevation & Depth
We eschew traditional "Drop Shadows" in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` section. The change in hex value provides all the "lift" needed.
*   **Ambient Shadows:** If a floating action (like a "Favorite" button) requires a shadow, use:
    - `Y: 10px, Blur: 30px`
    - Color: `on-surface` (#00343e) at **6% opacity**. 
    - *Never use pure black or grey shadows.*
*   **The "Ghost Border" Fallback:** If a container sits on a background of the same color, use a `outline-variant` (#81b5c5) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Interface Elements

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text. Shape: `full` (9999px) for a soft, pill-shaped finish.
- **Secondary:** `secondary-container` fill with `on-secondary-container` text. Use for "Support" or "Donate" actions.
- **Tertiary:** No fill. `primary` text with an underline that appears only on hover.

### Cards (The "Profile" Card)
- **Shape:** `xl` (3rem) top corners, `md` (1.5rem) bottom corners. This intentional asymmetry makes the UI feel custom.
- **Content:** No dividers. Use `body-lg` for the pet's name and `label-md` in `on-surface-variant` for the breed/age. Use vertical spacing (2rem) to separate the image from the text.

### Input Fields
- **Background:** `surface-container-high` (#adecff).
- **Border:** None.
- **Focus State:** A 2px "Ghost Border" using `primary` at 40% opacity.
- **Corners:** `sm` (0.5rem) to provide a slight structural contrast to the rounder buttons.

### Imagery (The Hero Component)
- All animal photography must use `lg` (2rem) or `xl` (3rem) rounded corners.
- **The "Overhang" Effect:** Allow images to bleed off the edge of the grid or overlap into the next background section to break the "box" feel.

---

## 6. Do's and Don'ts

### Do
- **Do** use `surface-container-lowest` (#ffffff) to highlight the pet's biography against a `surface` background.
- **Do** lean into white space. If you think there is enough space, add 20% more.
- **Do** use `secondary` (#9b3e20) sparingly as an "emotional spark"—save it for "Adopt Me" or "Success Stories."

### Don't
- **Don't** use 1px solid borders. It shatters the high-end editorial feel and makes the platform look like a legacy database.
- **Don't** use standard "Grey" (#808080). Always use our tinted neutrals like `on-surface-variant` to maintain the warm, teal-underlined atmosphere.
- **Don't** cram multiple animals into a tight grid. Give each pet a "stage" to tell their story.

---

## 7. Spacing Scale (The "Breath" Metric)
Spacing must be generous to maintain the "Professional yet Emotional" balance.
- **Section Spacing:** Use 8rem to 12rem between major content blocks.
- **Component Padding:** Never less than 1.5rem (`md`).
- **Text Grouping:** Use 0.5rem (`sm`) between a headline and its sub-copy to create a tight visual "unit."```