// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'overview',
    'terminology',
    {
      items: [
        {
          items: [
            'clients/getting-started',
            'clients/discover-providers',
            'clients/enabling-a-client',
            'clients/disabling-a-client',
            'clients/signing-transactions',
            'clients/posting-transactions',
            'clients/signing-and-posting-transactions',
            'clients/signing-a-message',
          ],
          label: 'Clients',
          link: {
            type: 'doc',
            id: 'clients/index',
          },
          type: 'category',
        },
        {
          items: [
            'providers/getting-started',
            'providers/responding-to-discover-requests',
            'providers/responding-to-enable-requests',
            'providers/responding-to-disable-requests',
            'providers/responding-to-sign-transactions-requests',
            'providers/responding-to-post-transactions-requests',
            'providers/responding-to-sign-and-post-transactions-requests',
            'providers/responding-to-sign-message-requests',
            'providers/throwing-an-error',
          ],
          label: 'Providers',
          link: {
            type: 'doc',
            id: 'providers/index',
          },
          type: 'category',
        },
      ],
      label: 'Usage',
      link: {
        type: 'doc',
        id: 'usage/index',
      },
      type: 'category',
    },
    {
      items: [
        'api-reference/avm-web-client',
        'api-reference/avm-web-provider',
        'api-reference/errors',
        'api-reference/types',
      ],
      label: 'API Reference',
      link: {
        type: 'doc',
        id: 'api-reference/index',
      },
      type: 'category',
    },
    'supported-wallets',
  ],
};

module.exports = sidebars;
