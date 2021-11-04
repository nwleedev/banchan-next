import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Banchan" />
          <meta name="apple-mobile-web-app-title" content="Banchan" />
          <meta name="msapplication-starturl" content="https://banchan.app/" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#fca31d" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
