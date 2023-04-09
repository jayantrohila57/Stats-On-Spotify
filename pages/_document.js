import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/ios/100.png" />
          <meta name="theme-color" content="#000000" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&family=Uncial+Antiqua&display=swap"
            rel="stylesheet"
          ></link>
          <meta
            name="title"
            content="Stats On Spotify | Your Top Tracks, Artists, Playlists & more. "
          />
          <meta
            name="description"
            content="An Easy Approach To Review Your Spotify Data. Get all your top 50 Tracks, Artists,  and Playlists for Free, with Secure login with the official Spotify platform.   "
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://statsonspotify.vercel.app/"
          />
          <meta
            property="og:title"
            content="Stats On Spotify | Your Top Tracks, Artists, Playlists & more. "
          />
          <meta
            property="og:description"
            content="An Easy Approach To Review Your Spotify Data. Get all your top 50 Tracks, Artists,  and Playlists for Free, with Secure login with the official Spotify platform.   "
          />
          <meta property="og:image" content="" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://statsonspotify.vercel.app/"
          />
          <meta
            property="twitter:title"
            content="Stats On Spotify | Your Top Tracks, Artists, Playlists & more. "
          />
          <meta
            property="twitter:description"
            content="An Easy Approach To Review Your Spotify Data. Get all your top 50 Tracks, Artists,  and Playlists for Free, with Secure login with the official Spotify platform.   "
          />
          <meta property="twitter:image" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
