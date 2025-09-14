const isGithubActions = process.env.GITHUB_ACTIONS || false;

module.exports = {
  assetPrefix: isGithubActions ? '/your-repo-name/' : '',
  basePath: isGithubActions ? '/components/TravelInRanya.tsx' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
