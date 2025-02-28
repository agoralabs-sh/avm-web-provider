// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'overview',
    {
      items: [
        {
          items: [
            'usage/clients/getting-started',
            'usage/clients/discover-providers',
            'usage/clients/enabling-a-client',
            'usage/clients/disabling-a-client',
            'usage/clients/signing-transactions',
            'usage/clients/posting-transactions',
            'usage/clients/signing-and-posting-transactions',
            'usage/clients/signing-a-message',
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
            'usage/providers/getting-started',
            'usage/providers/responding-to-discover-requests',
            'usage/providers/responding-to-enable-requests',
            'usage/providers/responding-to-disable-requests',
            'usage/providers/responding-to-sign-transactions-requests',
            'usage/providers/responding-to-post-transactions-requests',
            'usage/providers/responding-to-sign-and-post-transactions-requests',
            'usage/providers/responding-to-sign-message-requests',
            'usage/providers/throwing-an-error',
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
    'terminology',
    'supported-wallets',
  ],
};

module.exports = sidebars;
