import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Early chunk error handling script */}
        <script 
          src="/chunk-error-handling.js" 
          strategy="beforeInteractive" 
          id="chunk-error-handling" 
          defer={false}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 