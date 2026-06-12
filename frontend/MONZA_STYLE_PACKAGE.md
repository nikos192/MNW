# MonzaWheels Style Package

Use this guide for all MonzaWheels frontend work.

## Brand Direction

MonzaWheels should feel like a modern forged wheel brand: technical, race-influenced, direct, and premium. Use real product media, short copy, hard edges, and clear fitment proof. Avoid generic luxury language, vague hero copy, decorative gradients, beige palettes, and oversized rounded cards.

## Typography

- Headings, navigation, labels, and numeric callouts: `Barlow Condensed`, weights 600-800.
- Body, forms, filters, and product metadata: `Rajdhani`, weights 400-600.
- Headings should be compact and confident. Body copy should be short and functional.
- Minimum body text size: 16px. Product metadata and labels may use 13-14px only when uppercase and high contrast.

## Color Tokens

Use the CSS variables in `src/app/globals.css` instead of new hard-coded colors.

- Deep black: `--bg-deep` / `#03070d`
- Midnight blue: `#07111f`
- Action blue: `--accent-blue` / `#0b5f98`
- Action blue hover: `--accent-blue-strong` / `#073f66`
- Pastel highlight blue: `--accent-blue-light` / `#64caff`
- Ice background: `--bg-dark` / `#f2f8ff`
- Panel blue: `--bg-card` / `#e6f2ff`
- White surface: `--bg-surface` / `#ffffff`

Do not introduce cream, beige, burgundy, red, or brown as primary UI colors.

## Contrast

- Primary actions on light surfaces use dark blue with off-white text.
- Bright pastel blue can be used for highlights on dark surfaces, but avoid white text on pastel blue.
- Text on black or midnight surfaces should use off-white or high-opacity ice blue.
- Borders on dark surfaces should use translucent pastel blue.

## Components

- Cards and media frames use 8px radius or less.
- Buttons are compact, uppercase, and technical. Do not use pill buttons.
- Product cards should show the wheel first, then model, price, construction, and fitment facts.
- Use real build, wheel, or production imagery before abstract decoration.
- Use video only where it supports trust or production proof. Do not autoplay production video with sound.

## Copy

- Prefer: "Forged wheels. Built to fit."
- Prefer: "Send the car. We confirm size, offset, finish, price, and lead time."
- Avoid filler phrases such as "elevate your journey", "crafted for enthusiasts", and "where performance meets style".
- Every homepage section should answer one buyer question: what fits, what it costs, how it is made, or how to order.
