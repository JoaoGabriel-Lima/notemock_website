/* eslint-disable require-jsdoc */
import React, { useEffect, useLayoutEffect } from "react";
import { SidebardContainer } from "../styles/components/home/sidebar";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { AnimatePresence, motion } from "framer-motion";

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
            main.classList.add("active");
          } else {
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

  return (
    <main>
      <Navbar />
      <section id="main-content">
        <SidebardContainer>
          <Sidebar />
        </SidebardContainer>
        <div id="closesidebar" className="android"></div>
        <section id="notes_section" className="flex items-center flex-col ">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: "-50px" },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ type: "spring", duration: 0.45 }}
              id="dashboard-page-content"
              className="w-full max-w-3xl flex items-start justify-start mt-10 overflow-y-auto"
            >
              <div className="mr-7 ml-7 w-full dash-margins">
                {props.children}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </section>
    </main>
  );
}

export default Layout;
