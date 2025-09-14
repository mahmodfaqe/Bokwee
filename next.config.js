const isGithubActions = process.env.GITHUB_ACTIONS || false;

module.exports = {
  assetPrefix: isGithubActions ? '/your-repo-name/' : '',
  basePath: isGithubActions ? '/your-repo-name' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
