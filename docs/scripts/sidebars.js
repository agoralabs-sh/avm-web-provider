// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'overview',
    'terminology',
    {
      items: [
        'clients/getting-started',
        'clients/discover-providers',
        'clients/enabling-a-client',
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
      ],
      label: 'Providers',
      link: {
        type: 'doc',
        id: 'providers/index',
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
  ],
};

module.exports = sidebars;
