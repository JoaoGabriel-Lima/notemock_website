/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import "../styles/globals.css";
// import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React from "react";
// import { useSession, signIn } from "next-auth/react";
import Router from "next/router";
// import { AppProps } from "next/app";
import { AppProps } from "next/app";
import { HomeCointainer } from "../styles/components/home/home";
import Layout from "../components/Layout";

// const { data: session } = useSession();
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <SessionProvider session={pageProps.session}>
          <HomeCointainer className="body ">
            <Layout loading={true}>
              <div className="w-full h-20 flex justify-center items-center">
                <i className="animate-spin bx bx-loader-alt text-[#414052] text-4xl"></i>
              </div>
            </Layout>
          </HomeCointainer>
        </SessionProvider>
      ) : (
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      )}
    </>
  );
}

export default MyApp;
