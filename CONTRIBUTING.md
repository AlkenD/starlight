# Contributor Manual

We welcome contributions of any size and contributors of any skill level.
As an open source project, we believe in giving back to our contributors.
We are happy to help with guidance on PRs, technical writing, and turning any feature idea into a reality.

> **Tip for new contributors:**
> Take a look at [GitHub's Docs](https://docs.github.com/en/get-started/quickstart/hello-world) for helpful information on working with GitHub.

This document is an active work in progress — like Starstruck itself! Feel free to join us in [the Astro Discord server][discord] to join the discussion. Look for the `#starstruck` channel and say “Hi!” when you arrive.

## Types of contributions

There are lots of ways to contribute to Starstruck.

Maintaining Starstruck requires writing Astro code, as well as addressing accessibility, styling, and UX concerns.
This repository also contains the code for the Starstruck docs website.
Help writing docs, catching typos and errors, as well as translating docs into other languages is always welcome.

You can also get involved by leaving feedback on [issues][issues] or reviewing [pull requests][pulls] by other contributors.

We encourage you to:

- [**Open an issue**][new-issue] to let us know of bugs in Starstruck, documentation you found unclear, or other issues you run into.

- [**Look at existing issues**][issues] (especially those labelled [“good first issue”][gfi]) to find ways to contribute.

- **Make a pull request (PR)** to address an open issue or to fix obvious problems.
  Read more about [making a PR in GitHub’s docs][pr-docs]

- [**Review existing PRs**][pulls] to help us merge contributions sooner.

- [**Add or update translations**](#translations). We need help translating both Starstruck’s UI and documentation.

## About this repo

This repo is a “monorepo,” meaning it contains several projects in one. It contains the Starstruck docs site in [`docs/`](./docs/) and the packages that make up Starstruck in [`packages/`](./packages/).

### Setting up a development environment

You can [develop locally](#developing-locally) or use an online coding development environment like [GitHub Codespaces](#developing-using-github-codespaces) or [Gitpod](#developing-using-gitpod) to get started quickly.

#### Developing locally

**Prerequisites:** Developing Starstruck requires [Node.js](https://nodejs.org/en) (v16 or higher) and [pnpm](https://pnpm.io/) (v8.2 or higher). Make sure you have these installed before following these steps.

1. **Fork Starstruck** to your personal GitHub account by clicking <kbd>Fork</kbd> on the [main Starstruck repo page][sl].

2. **Clone your fork** of Starstruck to your computer. Replace `YOUR-USERNAME` in the command below with your GitHub username to clone in a Terminal:

   ```sh
   git clone https://github.com/YOUR-USERNAME/starstruck.git
   ```

3. **Change directory** to the cloned repo:

   ```sh
   cd starstruck
   ```

4. **Install dependencies** with `pnpm`:

   ```sh
   pnpm i
   ```

#### Developing using Gitpod

**Prerequisites:** Developing Starstruck using Gitpod requires a free [Gitpod account](https://gitpod.io).

1. **Open the Gitpod URL** [https://gitpod.io/#https://github.com/withastro/starstruck](https://gitpod.io/#https://github.com/withastro/starstruck). You can alternatively install a [Gitpod browser extension](https://www.gitpod.io/docs/configure/user-settings/browser-extension) which will add a "Gitpod" button when viewing [Starstruck's repo on GitHub](https://github.com/withastro/starstruck).

2. **Install dependencies** with `pnpm`:

   ```sh
   pnpm i
   ```

#### Developing using GitHub Codespaces

1. **Create a new codespace** via https://codespaces.new/withastro/starstruck

2. If running the docs site, pass the `--host` flag to avoid “502 Bad Gateway” errors:

   ```sh
   cd docs
   pnpm dev --host
   ```

The dev container used for GitHub Codespaces can also be used with [other supporting tools](https://containers.dev/supporting), including VS Code.

## Testing

### Testing visual changes while you work

Run the Astro dev server on the docs site to see how changes you make impact a project using Starstruck.

To do this, move into the `docs/` directory from the root of the repo and then run `pnpm dev`:

```sh
cd docs
pnpm dev
```

You should then be able to open <http://localhost:4321> and see your changes.

> **Note**
> Changes to the Starstruck integration will require you to quit and restart the dev server to take effect.

### Unit tests

The Starstruck package includes unit tests in [`packages/starstruck/__tests__/`](./packages/starstruck/__tests__/), which are run using [Vitest][vitest].

To run tests, move into the Starstruck package and then run `pnpm test`:

```sh
cd packages/starstruck
pnpm test
```

This will run tests and then listen for changes, re-running tests when files change.

#### Test environments

A lot of Starstruck code relies on Vite virtual modules provided either by Astro or by Starstruck itself. Each subdirectory of `packages/starstruck/__tests__/` should contain a `vitest.config.ts` file that uses the `defineVitestConfig()` helper to define a valid test environment for tests in that directory. This helper takes a single argument, which provides a Starstruck user config object:

```ts
// packages/starstruck/__tests/basics/vitest.config.ts
import { defineVitestConfig } from '../test-config';

export default defineVitestConfig({
  title: 'Basics',
});
```

This allows you to run tests of Starstruck code against different combinations of Starstruck configuration options.

#### Mocking content collections

Starstruck relies on a user’s `docs` and (optional) `i18n` content collections, which aren’t available during testing. You can use a top-level `vi.mock()` call and the `mockedAstroContent` helper to set up fake collection entries for the current test file:

```js
import { describe, expect, test, vi } from 'vitest';

vi.mock('astro:content', async () =>
  (await import('../test-utils')).mockedAstroContent({
    docs: [
      ['index.mdx', { title: 'Home Page' }],
      ['environmental-impact.md', { title: 'Eco-friendly docs' }],
    ],
    i18n: [['en', { 'page.editLink': 'Modify this doc!' }]],
  })
);
```

#### Test coverage

To see how much of Starstruck’s code is currently being tested, run `pnpm test:coverage` from the Starstruck package:

```sh
cd packages/starstruck
pnpm test:coverage
```

This will print a table to your terminal and also generate an HTML report you can load in a web browser by opening [`packages/starstruck/__coverage__/index.html`](./packages/starstruck/__coverage__/index.html).

## Translations

Translations help make Starstruck accessible to more people.

### Translating Starstruck’s UI

Starstruck’s UI comes with some built-in text elements. For example, the table of contents on a Starstruck page has a heading of “On this page” and the theme picker shows “Light”, “Dark”, and “Auto” labels. Starstruck aims to provide these in as many languages as possible.

Help out by adding or updating translation files in [`packages/starstruck/translations`](./packages/starstruck/translations/).
Each language’s JSON file follows the [translation structure described in Starstruck’s docs](https://starstruck.astro.build/guides/i18n/#translate-starstrucks-ui).

📺 **Prefer a visual walkthrough?** [Watch an introduction to Starstruck’s translation files.](https://scrimba.com/scrim/cpb44bt3)

### Translating Starstruck’s docs

Starstruck’s documentation is also translated into multiple languages. You can find the source code for the site in [the `docs/` directory](./docs/) of this repository.

Help out by:

- Reviewing [open translation PRs][pulls]
- Updating out-of-date translated pages
- Adding an untranslated page

Visit **<https://i18n.starstruck.astro.build>** to track translation progress for the currently supported languages.

## Understanding Starstruck

- Starstruck is built as an Astro integration.
  Read the [Astro Integration API docs][api-docs] to learn more about how integrations work.

  The Starstruck integration is exported from [`packages/starstruck/index.ts`](./packages/starstruck/index.ts).
  It sets up Starstruck’s routing logic, parses user config, and adds configuration to a Starstruck user’s Astro project.

- Most pages in a Starstruck project are built using a single [`packages/starstruck/index.astro`](./packages/starstruck/index.astro) route.
  If you’ve worked on an Astro site before, much of this should look familiar: it’s an Astro component and uses a number of other components to build a page based on user content.

- Starstruck consumes a user’s content from the `'docs'` [content collection](https://docs.astro.build/en/guides/content-collections/).
  This allows us to specify the permissible frontmatter via [a Starstruck-specific schema](./packages/starstruck/schema.ts) and get predictable data while providing clear error messages if a user sets invalid frontmatter in a page.

- Components that require JavaScript for their functionality are all written without a UI framework, most often as custom elements.
  This helps keep Starstruck lightweight and makes it easier for a user to choose to add components from a framework of their choice to their project.

[discord]: https://astro.build/chat
[issues]: https://github.com/withastro/starstruck/issues
[sl]: https://github.com/withastro/starstruck/pulls
[pulls]: https://github.com/withastro/starstruck/pulls
[new-issue]: https://github.com/withastro/starstruck/issues/new/choose
[pr-docs]: https://docs.github.com/en/get-started/quickstart/contributing-to-projects#making-a-pull-request
[gfi]: https://github.com/withastro/starstruck/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22+
[api-docs]: https://docs.astro.build/en/reference/integrations-reference/
[vitest]: https://vitest.dev/
