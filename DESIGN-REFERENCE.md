# Design Reference — Mahmoud Elshorbagy Art Portfolio

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0d0d0d` | Page background, near-black |
| Surface | `#1a1a1a` | Section backgrounds |
| Surface Elevated | `#242424` | Table headers, cards |
| Gold | `#c9a96e` | Primary accent, headings, links, frames |
| Gold Light | `#e0c88a` | Hover states, highlights |
| Gold Dim | `rgba(201,169,110,0.15)` | Glow, spotlight |
| Text Primary | `#f0ece4` | Body text, headings |
| Text Secondary | `#a09888` | Descriptions, labels |
| Text Muted | `#6b6358` | Footer, minor text |
| Frame Border | `#3a3530` | Gallery frame borders |

## Typography
| Role | Font | Fallback |
|------|------|----------|
| Display/Headings (EN) | Playfair Display | Georgia, serif |
| Body (EN) | Inter | -apple-system, sans-serif |
| Arabic (all) | Noto Naskh Arabic | Amiri, serif |
| Accent/Decorative | Cormorant Garamond | Georgia, serif |

## Spacing System (8px base)
| Token | Value |
|-------|-------|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 48px |
| xl | 80px |
| 2xl | 128px |

## Animation Patterns
- Scroll reveal: `translateY(40px) → 0`, `opacity 0 → 1`, 0.8s ease-out
- Stagger delay: 150ms per item (reveal-delay-1/2/3/4)
- Gallery hover: `perspective(1000px) rotateY(5deg) scale(1.02)`, box-shadow glow
- Language toggle: `rotateY(90deg)` flip, 200ms
- Hero canvas: Particles + radial gradient brush strokes, 0.08s fade trail
- Social link hover: `translateY(-4px)`, gold background

## Breakpoints
| Name | Width |
|------|-------|
| Desktop | > 768px |
| Tablet | ≤ 768px |
| Mobile | ≤ 480px |
