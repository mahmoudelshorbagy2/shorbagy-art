# Design Reference - Mahmoud Elshorbagy Art Portfolio

## Design Read
Portfolio for art education recruiters & students, with an editorial luxury language, leaning toward native CSS + custom typography + gallery-dark aesthetic.

## Dial Values
- DESIGN_VARIANCE: 8 (Asymmetric layouts, varied gallery patterns)
- MOTION_INTENSITY: 6 (Fluid CSS, scroll reveal, canvas particles)
- VISUAL_DENSITY: 3 (Art Gallery / Airy)

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Page background, near-black |
| Surface | `#141414` | Section backgrounds |
| Surface Elevated | `#1e1e1e` | Cards, table headers |
| Gold | `#c9a96e` | Primary accent, headings, interactive |
| Gold Light | `#dfc08a` | Hover states |
| Gold Dim | `rgba(201,169,110,0.12)` | Glow, spotlight |
| Gold Glow | `rgba(201,169,110,0.06)` | Ambient gallery glow |
| Text Primary | `#f0ece4` | Headings, body |
| Text Secondary | `#a09888` | Descriptions |
| Text Muted | `#5e574e` | Footer |
| Frame Border | `rgba(255,255,255,0.08)` | Subtle glass borders |

## Typography
| Role | Font | Notes |
|------|------|-------|
| Display (EN) | Playfair Display | Italic for subtitles, editorial feel |
| Body (EN) | Geist | Premium grotesk, not Inter |
| Arabic | Noto Naskh Arabic | Heritage-appropriate |

## Type Scale
| Token | Value |
|-------|-------|
| xs | 0.75rem |
| sm | 0.875rem |
| base | 1rem |
| lg | 1.125rem |
| xl | 1.25rem |
| 2xl | 1.5rem |
| 3xl | clamp(1.8rem, 4vw, 3rem) |
| 4xl | clamp(2.5rem, 6vw, 5rem) |

## Spacing System (8px base, airy)
| Token | Value |
|-------|-------|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 48px |
| xl | 80px |
| 2xl | 128px |

## Motion System
| Token | Value | Use |
|-------|-------|-----|
| ease-out-expo | cubic-bezier(0.16, 1, 0.3, 1) | Primary easing |
| ease-spring | cubic-bezier(0.32, 0.72, 0, 1) | Buttons, toggles |
| transition-fast | 200ms | Hovers, toggles |
| transition-base | 400ms | Gallery, cards |
| transition-slow | 700ms | Scroll reveals |

## Architecture Patterns
- **Double-Bezel Cards**: Outer shell (border + bg) + Inner core (content + inset highlight)
- **Gallery Layout Variety**: Alternating full/split/reverse layouts (no 3+ zigzag repetition)
- **Skills as Cards**: 2x2 grid instead of table
- **Noise Texture Overlay**: Fixed SVG noise at 3.5% opacity for editorial feel

## Accessibility
- Skip link for keyboard navigation
- `prefers-reduced-motion` fully supported
- `:focus-visible` with gold outline
- All SVGs marked `aria-hidden="true"`
- Semantic `<main>` wrapper
- `aria-label` on icon-only buttons

## Breakpoints
| Name | Width |
|------|-------|
| Desktop | > 768px |
| Tablet | <= 768px |
| Mobile | <= 480px |

## Skills Applied
- high-end-visual-design: Double-bezel, premium fonts, custom cubic-bezier
- design-taste-frontend: Anti-slop, editorial luxury, gallery layout variety
- frontend-design: Deliberate typography, subject-grounded choices
- web-design-guidelines: Skip link, focus states, reduced motion, aria labels
- ui-ux-pro-max: Design tokens, component architecture
