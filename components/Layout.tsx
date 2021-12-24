/* eslint-disable require-jsdoc */
import React, { useEffect, useLayoutEffect } from "react";
import sidebarScript from "../pages/scripts/sidebar";
import { SidebardContainer } from "../styles/components/sidebar";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { AnimatePresence, motion } from "framer-motion";

function Layout(props: any) {
  const canUseDOM = typeof window !== "undefined";
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    sidebarScript();
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
