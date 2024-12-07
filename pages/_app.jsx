import { useRouter } from 'nextra/hooks'
import { useEffect } from 'react'

import '@styles/global.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const h1Elements = document.querySelectorAll('h1')
    h1Elements.forEach(h1 => {
      h1.classList.add('custom-h1')
    })

    if (router.asPath === '/') {
      document.querySelector('h1').textContent = 'El bloc de notes'
    }
  }, [router.pathname])

  return <Component {...pageProps} />
}