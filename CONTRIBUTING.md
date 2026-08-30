# Contributing

Thanks for your interest in the Efolusi site. This repository holds the marketing site of PT. Efolusi Dunia Teknologi; it is open source so people can learn from it and reuse pieces of it, and we welcome fixes.

## Ground rules

- Site copy, product entries and company facts are owned by Efolusi. Please open an issue before proposing content changes.
- Code contributions (bug fixes, accessibility, performance) are welcome as pull requests.
- The site follows the [Meridian design system](https://github.com/efolusi/meridian). Use its tokens and components; do not introduce new colors, fonts or motion values.

## Working locally

```bash
npm install
npm run dev        # Next.js dev server on :3000
npm run build      # production build check
npm run preview    # build and serve in the Cloudflare workerd runtime
```

CI runs `npm run build` and the OpenNext Cloudflare build on every pull request; both must pass.

## License

By contributing you agree that your contributions are licensed under the MIT license. The Efolusi name and the owl mark are not covered by the MIT grant.
