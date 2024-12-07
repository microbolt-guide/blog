const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

const postsName = 'bloc'
const outputDir = path.join(__dirname, '..', 'public', 'rss')
const outputFile = path.join(outputDir, `${postsName}.xml`)

async function generate() {
  const feed = new RSS({
    title: 'El bloc de notes',
    site_url: `https://${postsName}.microbolt.guide`,
    feed_url: `https://${postsName}.microbolt.guide/rss/${postsName}.xml`
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages', postsName))
  const allPosts = []
  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', postsName, name)
      )
      const frontmatter = matter(content)

      allPosts.push({
        title: frontmatter.data.title,
        url: `/${postsName}/` + name.replace(/\.mdx?/, ''),
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tag.split(', '),
        author: frontmatter.data.author
      })
    })
  )

  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
  allPosts.forEach((post) => {
    feed.item(post)
  })

  // Crear el directori si no existeix
  await fs.mkdir(outputDir, { recursive: true })

  await fs.writeFile(outputFile, feed.xml({ indent: true }))
}

generate()