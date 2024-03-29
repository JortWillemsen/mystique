module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-designs",
    "../dist/preset.js"
  ],
  "framework": "@storybook/react",
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin'
  },
}