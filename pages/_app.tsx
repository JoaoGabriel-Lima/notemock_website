/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import "../styles/globals.css";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React from "react";
// import { useSession, signIn } from "next-auth/react";

// import { AppProps } from "next/app";

import { AppProps } from "next/app";

// const { data: session } = useSession();
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
