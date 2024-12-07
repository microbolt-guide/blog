import { useRouter } from 'nextra/hooks'

const LOCALE = 'ca'
const LICENSE_HELP = 'Aquest lloc i tot el seu contingut estan sota llicència de Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.'

const DATE_FORMAT = (date) => (
  <time dateTime={date.toISOString()} suppressHydrationWarning={true}>
    {date.toLocaleDateString(LOCALE, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}
  </time>
);

const FOOTER = (
  <small style={{ display: 'block', marginTop: '8rem' }}>
    <abbr
      title={LICENSE_HELP}
      style={{ cursor: 'help' }}
    >
      CC BY-NC-SA 4.0
    </abbr>{' '}
    {new Date().getFullYear()} © doitwithnotepad.
    <a href="/rss/bloc.xml">RSS</a>
    <a href="https://microbolt.guide" target="_blank">Microbolt</a>
    <style jsx>{`
    a {
      float: right;
      margin-right: 0.5rem;
    }

    @media screen and (max-width: 480px) {
      article {
        padding-top: 2rem;
        padding-bottom: 4rem;
      }
    }
  `}</style>
  </small>
)

export default {
  comments: null,
  components: {
    h1: ({ children }) => (
      <h1
        class="custom-h1"
      >
        {children}
      </h1>
    )
  },
  darkMode: true,
  dateFormatter: DATE_FORMAT,
  footer: FOOTER,
  head: ({ title, meta }) => {
    const router = useRouter()
    title = router.asPath === '/' ? 'El bloc de notes' : title

    return (
      <>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {meta.description && (
          <meta name="og:description" content={meta.description} />
        )}
        {meta.tag && <meta name="keywords" content={meta.tag} />}
        {meta.author && <meta name="author" content={meta.author} />}
        {/* Favicons, meta */}
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
        />
        <meta name="msapplication-TileColor" content="#f79413" />
        <meta httpEquiv="Content-Language" content={LOCALE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@doitwithnotepad" />
        {/* <meta property="og:image" content={image} /> */}
        <meta name="apple-mobile-web-app-title" content={title} />
      </>
    )
  },
  // navs: [ ],
  readMore: 'Llegeix més →',
  titleSuffix: ' – El bloc de notes'
}