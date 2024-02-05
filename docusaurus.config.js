// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { themes } = require('prism-react-renderer');
/* eslint-enable @typescript-eslint/no-var-requires */

// directories
const docsDir = path.resolve(__dirname, 'docs');
const staticDir = path.resolve(docsDir, 'static');
const scriptsDir = path.resolve(docsDir, 'scripts');
const stylesDir = path.resolve(docsDir, 'styles');

// links
const githubLink = 'https://github.com/agoralabs-sh/arc0027-sdk';
const npmLink = 'https://npmjs.com/package/@agoralabs-sh/arc0027-sdk';

// header
const tagline =
  'A TypeScript implementation of the ARC-0027 specification that allows dApps to connect and interact with wallets in a standardized way.';
const title = 'ARC-0027 SDK';

/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: '/',
  deploymentBranch: 'gh-pages',
  favicon: 'images/favicon.png',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
  organizationName: 'agoralabs-sh',
  projectName: 'arc0027-sdk',
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: false,
        docs: {
          remarkPlugins: [
            [
              require('@docusaurus/remark-plugin-npm2yarn'),
              {
                sync: true,
              },
            ],
          ],
          routeBasePath: '/',
          sidebarPath: require.resolve(path.resolve(scriptsDir, 'sidebars.js')),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: [
            require.resolve(path.resolve(stylesDir, 'global.scss')),
            require.resolve(path.resolve(stylesDir, 'navbar.scss')),
          ],
        },
      }),
    ],
  ],
  staticDirectories: [staticDir],
  tagline,
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO: create a social card
      // image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {
          name: 'keywords',
          content:
            'algorand, algosdk, arc0027, avm, blockchain, cryptocurrency',
        },
      ],
      navbar: {
        title,
        logo: {
          alt: 'Algorand logo',
          src: 'images/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Overview',
          },
          // right
          {
            href: githubLink,
            position: 'right',
            className: 'navbar__icon navbar__icon--github',
            'aria-label': 'GitHub repository',
          },
          {
            href: npmLink,
            position: 'right',
            className: 'navbar__icon navbar__icon--npm',
            'aria-label': 'npm registry',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: 'overview',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: githubLink,
              },
              {
                label: 'npm',
                href: npmLink,
              },
            ],
          },
        ],
        copyright: `Developed with ❤️ by Agora Labs. Licensed under <a href="${githubLink}/blob/main/LICENSE" target="_blank">MIT</a>.`,
      },
      prism: {
        darkTheme: themes.dracula,
        theme: themes.github,
      },
    }),
  title,
  trailingSlash: false,
  url: 'https://arc0027-sdk.agoralabs.sh',
};

module.exports = config;
