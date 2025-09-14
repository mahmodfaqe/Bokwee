const isGithubActions = process.env.GITHUB_ACTIONS || false;

module.exports = {
  assetPrefix: isGithubActions ? '/Bokwee/' : '',
  basePath: isGithubActions ? '/Bokwee' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
}
