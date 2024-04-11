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
const agoraLabsLink = 'https://agoralabs.sh';
const githubLink = 'https://github.com/agoralabs-sh/avm-web-provider';
const npmLink = 'https://npmjs.com/package/@agoralabs-sh/avm-web-provider';
const url = 'https://avm-web-provider.agoralabs.sh';

// header
const tagline =
  'A TypeScript implementation that allows clients to connect and interact with web-based providers.';
const title = 'AVM Web Provider';

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
  projectName: 'avm-web-provider',
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
            require.resolve(path.resolve(stylesDir, 'footer.scss')),
            require.resolve(path.resolve(stylesDir, 'functions.scss')),
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
          content: 'algorand, algosdk, arc0027, avm, blockchain voi',
        },
      ],
      navbar: {
        title,
        logo: {
          alt: 'AVM logo',
          src: 'images/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Overview',
          },
          {
            type: 'doc',
            docId: 'api-reference/index',
            position: 'left',
            label: 'API',
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
        copyright: `
<div class="footer__copyright-container">
    <p class="footer__text">Licensed under <a class="footer__text--link" href="${githubLink}/blob/main/LICENSE" target="_blank">MIT</a>.</p>
</div>
        `,
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/',
              },
              {
                label: 'Terminology',
                to: 'terminology',
              },
              {
                label: 'Clients',
                to: 'clients/index',
              },
              {
                label: 'Providers',
                to: 'providers/index',
              },
              {
                label: 'API Reference',
                to: 'api-reference/index',
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
        logo: {
          alt: 'Agora Labs logo',
          height: '50px',
          href: agoraLabsLink,
          src: '/images/developed_by_agora_labs_banner.svg',
          target: '_blank',
        },
        style: 'dark',
      },
      prism: {
        darkTheme: themes.dracula,
        theme: themes.github,
      },
    }),
  title,
  trailingSlash: false,
  url,
};

module.exports = config;
