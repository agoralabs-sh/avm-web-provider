// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'overview',
    {
      items: ['dapps/getting-started'],
      label: 'dApps',
      link: {
        type: 'doc',
        id: 'dapps/index',
      },
      type: 'category',
    },
    {
      items: ['wallets/getting-started'],
      label: 'Wallets',
      link: {
        type: 'doc',
        id: 'wallets/index',
      },
      type: 'category',
    },
    {
      items: ['api-reference/avm-web-provider'],
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
