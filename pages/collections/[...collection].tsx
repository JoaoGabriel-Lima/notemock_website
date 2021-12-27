/* eslint-disable require-jsdoc */
import type { NextPage } from "next";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HomeCointainer } from "../../styles/components/home/home";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const Collection: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Create a fuction that will get the height of #content div and set it to the state
  return (
    <>
      <HomeCointainer className="body ">
        <Layout className="">
          <div className="page_overview flex w-full justify-between items-start mb-10">
            <div className="flex items-center justify-start ">
              <div
                className="w-11 h-11 rounded-2xl bg-[#21212B] mr-4 flex items-center justify-center cursor-pointer"
                onClick={() => router.back()}
              >
                <i className="bx bx-chevron-left text-white text-3xl"></i>
              </div>
              <h4 className="text-white font-semibold tracking-wide text-2xl">
                School
              </h4>
            </div>
            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button className="inline-flex justify-center w-full mt-3 text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
                  <i className="bx bx-dots-horizontal-rounded cursor-pointer text-gray-400 text-2xl"></i>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0  w-56 origin-top-right todo-bg-header divide-y divide-blue-300/[.10] ring-1 rounded-xl shadow-lg ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bgmenucolor text-white" : "text-white"
                          } group flex rounded-xl items-center w-full py-3 text-sm `}
                        >
                          <span className="ml-3">Favorite the collection</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bgmenucolor text-white" : "text-white"
                          } group flex rounded-xl items-center w-full py-3 text-sm `}
                        >
                          <span className="ml-3">Edit this collection</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <motion.header className="mb-10" initial={false}>
            <li
              onClick={() => setIsOpen(!isOpen)}
              className=" mb-5 cursor-pointer w-full rounded-3xl border-4 hover:border-[#23232c] border-[#1D1D25] h-14 flex justify-center items-center "
            >
              <div className="w-full h-11 flex justify-start items-center px-4">
                <div
                  id="add_button"
                  className=" w-8 h-8 bg-red-500 min-w-[2rem] rounded-xl mr-4 flex items-center justify-center"
                >
                  <i className="bx bx-plus text-black text-xl"></i>
                </div>
                <input
                  id="add_ToDo"
                  className="text-gray-500 font-medium w-full h-full border-0 focus:border-0 placeholder:font-normal"
                  placeholder="Add a task"
                ></input>
              </div>
            </li>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.section
                  className=" overflow-hidden h-auto"
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  variants={{
                    open: {
                      opacity: 1,
                      transition: { duration: 0.3, ease: "easeIn" },
                    },
                    collapsed: { opacity: 0 },
                  }}
                  // transition={{
                  //   duration: 0.5,
                  //   ease: "easeIn",
                  // }}
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    exit={{
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                    animate={{
                      scale: 1,
                      transition: { duration: 0.2 },
                    }}
                    // variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                    // transition={{ duration: 0.2 }}
                    className="myRef w-full h-[140px] bg-[#21212b] rounded-3xl origin-top"
                    id="content"
                  ></motion.div>
                </motion.section>
              )}
            </AnimatePresence>
          </motion.header>
          <div
            id="TasksToDo"
            className="w-full flex flex-col items-start justify-start"
          >
            <h4 className="text-white font-normal tracking-wide ">Tasks - 8</h4>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};
export default Collection;
