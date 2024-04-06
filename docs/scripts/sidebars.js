// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'overview',
    {
      items: ['clients/getting-started', 'clients/discover-providers'],
      label: 'Clients',
      link: {
        type: 'doc',
        id: 'clients/index',
      },
      type: 'category',
    },
    {
      items: ['providers/getting-started'],
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
