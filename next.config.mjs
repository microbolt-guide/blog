import nextra from 'nextra'
import path from 'path'

const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
  readingTime: true
})

export default withNextra({
  webpack: (config) => {
    config.resolve.alias['@styles'] = path.join(process.cwd(), 'styles');
    return config;
  },
  reactStrictMode: true,
  cleanDistDir: true
})