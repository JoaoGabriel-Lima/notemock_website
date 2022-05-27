/* eslint-disable require-jsdoc */
import React, { useEffect, useLayoutEffect } from "react";
import { SidebardContainer } from "../styles/components/home/sidebar";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

function Layout(props: any) {
  const canUseDOM = typeof window !== "undefined";
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const btn: any = document.getElementById("btn");
      const sidebar: any = document.getElementById("sidebar");
      const content: any = document.getElementById("notes_section");
      const close: any = document.getElementById("closesidebar");
      const main: any = document.querySelector("main");

      if (screen.width > 750) {
        if (localStorage.getItem("opened") == "null") {
        } else {
          if (localStorage.getItem("opened") == "true") {
            content.classList.add("active");
            close.classList.add("active");
            sidebar.classList.add("active");
            main.classList.add("active");
          } else {
            sidebar.classList.remove("active");
            content.classList.remove("active");
            close.classList.remove("active");
            main.classList.remove("active");
          }
        }
      }

      btn.onclick = function () {
        sidebar.classList.toggle("active");
        content.classList.toggle("active");
        close.classList.toggle("active");
        main.classList.toggle("active");
        main.classList.toggle("body");

        if (sidebar.classList.contains("active")) {
          localStorage.setItem("opened", "true");
        } else {
          localStorage.setItem("opened", "null");
        }
      };

      close.onclick = function () {
        sidebar.classList.toggle("active");
        content.classList.toggle("active");
        close.classList.toggle("active");
        main.classList.toggle("active");
        main.classList.toggle("body");

        if (sidebar.classList.contains("active")) {
          localStorage.setItem("opened", "true");
        } else {
          localStorage.setItem("opened", "null");
        }
      };
    }
  }, []);
  const isLoading = props.loading;
  return (
    <>
      <Head>
        <title>Notemock</title>
      </Head>
      <main>
        <Navbar />
        <section id="main-content">
          <SidebardContainer>
            <Sidebar isLoadingBool={isLoading || false} />
          </SidebardContainer>
          <div id="closesidebar" className="android"></div>
          <section id="notes_section" className="flex items-center flex-col ">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                {...(props.loading
                  ? { initial: "", animate: "" }
                  : { initial: "hidden", animate: "visible" })}
                // {props.loading
                //   ? { initial: "", animate: "" }
                //   : { initial: "hidden", animate: "visible" }}
                variants={{
                  hidden: { opacity: 0, x: "-50px" },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ type: "spring", duration: 0.3 }}
                id="dashboard-page-content"
                className="w-full max-w-3xl flex items-start justify-start mt-10 overflow-y-auto"
              >
                <div className="pr-7 box-box pl-7 w-full dash-margins mb-44">
                  {props.children}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </section>
      </main>
    </>
  );
}

Layout.defaultProps = {
  loading: false,
};

export default Layout;
