/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    'main',
    {
      name: 'beta',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@anolilab/semantic-release-pnpm',
    [
      '@semantic-release/exec',
      {
        prepareCmd: './scripts/update_issue_templates.sh ${nextRelease.version}',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['.github/ISSUE_TEMPLATE/bug_report_template.yml', 'package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            label: 'avm-web-provider.js',
            path: 'packages/module/dist/index.js',
          },
        ],
        releasedLabels: ['🚀 released'],
      },
    ],
  ],
};
