# Zawiyah Studio: demo website

A 4-page demo site for Zawiyah, a handmade art and gifts studio.
*Your place to slow down, create & come back to yourself.*

Plain HTML, CSS and a little JavaScript. No frameworks, no build step.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `gallery.html` | Gallery, with category filters |
| `about.html` | About |
| `contact.html` | Contact, with a demo-only form (nothing is sent) |

Shared files: `css/styles.css` (all styles and brand colors) and `js/main.js` (mobile menu, gallery filters, form messages).

## Viewing it

Open `index.html` in a browser. Everything works from the file system or any static host.

## Photos

Real photos live in `images/` as WebP files in two widths (`-480` and `-960`), with metadata removed. Each `<img>` lists both in `srcset`, so phones download the smaller one. Two photo spots on the About page (maker portrait, work table) are still placeholders.

## Replacing a photo placeholder

Each placeholder is a dashed box like this:

```html
<div class="ph" role="img" aria-label="Photo placeholder: wood slice coasters">
  <span class="ph-tag" aria-hidden="true">Photo placeholder</span>
  <span class="ph-label" aria-hidden="true">Wood slice coasters</span>
</div>
```

Swap the whole box for an image, and describe what is in the photo in the `alt` text:

```html
<img src="images/wood-coasters.jpg" alt="Three wood slice coasters with autumn designs"
     width="800" height="600" loading="lazy">
```

Use a photo with roughly the same shape as the box you replaced (4:3, 1:1, 3:4 or 16:9) so the layout stays the same.

## Text still to write

Search the HTML for `class="todo"`. Each one marks text only the owner can provide (the story, captions, email address, market dates).

## Scroll animations

Elements marked `data-reveal` fade and rise in as they scroll into view (`data-reveal="left"`, `"right"` and `"zoom"` are variations). The hero animates on load and a thin progress bar tracks scrolling. Animations are skipped when the visitor's device asks for reduced motion, and all content stays visible if JavaScript is off.

## Notes

- Changing the header or footer means changing it in all four HTML files (they are kept identical).
- Pumpkin and gold are used only as decoration, because they are too light to read as text on cream.
