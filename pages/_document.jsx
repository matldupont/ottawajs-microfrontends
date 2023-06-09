import Document from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { APP_CONFIG } from '@/lib/constants'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:title" content={APP_CONFIG.title} />
          <meta property="twitter:title" content={APP_CONFIG.title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={APP_CONFIG.canonical} />
          <meta property="twitter:url" content={APP_CONFIG.canonical} />
          <meta property="og:image" content={APP_CONFIG.previewImg} />
          <meta property="twitter:image" content={APP_CONFIG.previewImg} />
          {!!APP_CONFIG.description && (
            <>
              <meta property="og:description" content={APP_CONFIG.description} />
              <meta name="twitter:description" content={APP_CONFIG.description} />
              <meta name="description" content={APP_CONFIG.description} />
            </>
          )}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={APP_CONFIG.site_name} />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Roboto:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
