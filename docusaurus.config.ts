import type * as Preset from '@docusaurus/preset-classic';
import remarkPlugin from '@docusaurus/remark-plugin-npm2yarn';
import type { Config } from '@docusaurus/types';
import { resolve } from 'node:path';
import { themes } from 'prism-react-renderer';

const config: () => Config = () => {
  // directories
  const docsDir = resolve(__dirname, 'docs');
  const staticDir = resolve(docsDir, 'static');
  const scriptsDir = resolve(docsDir, 'scripts');
  const stylesDir = resolve(docsDir, 'styles');
  // links
  const agoraLabsLink = 'https://agoralabs.sh';
  const githubLink = 'https://github.com/agoralabs-sh/avm-web-provider';
  const npmLink = 'https://npmjs.com/package/@agoralabs-sh/avm-web-provider';
  const url = 'https://avm-web-provider.agoralabs.sh';
  // header
  const tagline = 'A TypeScript implementation that allows clients to connect and interact with web-based providers.';
  const title = 'AVM Web Provider';

  return {
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
        {
          blog: false,
          docs: {
            remarkPlugins: [
              [
                remarkPlugin,
                {
                  sync: true,
                },
              ],
            ],
            routeBasePath: '/',
            sidebarPath: resolve(scriptsDir, 'sidebars.js'),
          },
          sitemap: {
            changefreq: 'weekly',
            priority: 0.5,
            ignorePatterns: ['/tags/**'],
            filename: 'sitemap.xml',
          },
          theme: {
            customCss: [
              resolve(stylesDir, 'footer.scss'),
              resolve(stylesDir, 'functions.scss'),
              resolve(stylesDir, 'global.scss'),
              resolve(stylesDir, 'navbar.scss'),
            ],
          },
        } satisfies Preset.Options,
      ],
    ],
    staticDirectories: [staticDir],
    tagline,
    themeConfig: {
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
            docId: 'usage/index',
            position: 'left',
            label: 'Usage',
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
    <p class="footer__text">Licensed under <a class="footer__text--link" href="${githubLink}/blob/main/LICENSE" target="_blank">CC0</a>.</p>
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
                label: 'Usage',
                to: 'usage/index',
              },
              {
                label: 'API Reference',
                to: 'api-reference/index',
              },
              {
                label: 'Supported Wallets',
                to: 'supported-wallets',
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
    } satisfies Preset.ThemeConfig,
    title,
    trailingSlash: false,
    url,
  };
};

export default config();
