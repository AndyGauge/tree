// Term definitions. Reference any of these from a section's `body`, `gesture`,
// `eli5`, or any other rendered-through-md field as `[[term]]` — it will
// auto-link to `/glossary#term-slug`. Case-insensitive match.
//
// Keys are the canonical display term; values are plain-markdown definitions.
// You can also use an object with { definition, see } if a term cross-refs
// another term — the render page will display both.

export const GLOSSARY = {
  'term one': 'First example. Referenced from any section as `[[term one]]` — that becomes a link here.',
  'term two': {
    definition: 'An object-form entry lets you attach extras.',
    see: ['term one']
  }
};
