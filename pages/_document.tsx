/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <meta name="theme-color" content="#c33939" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@juaozin__" />
        <meta name="twitter:creator" content="@juaozin__" />

        <meta property="og:site_name" content="Notemock" />
        <meta property="og:type" content="website" />
        <meta name="author" content="João Gabriel Lima Marinho" />
        <meta name="twitter:title" content="Notemock - Homepage" />
        <meta name="og:title" content="Notemock - Homepage" />

        <meta
          name="description"
          content="A to-do list website made with Next.js focused on students and developers, offering better organization and customization options"
        />
        <meta
          property="og:description"
          content="A to-do list website made with Next.js focused on students and developers, offering better organization and customization options"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
