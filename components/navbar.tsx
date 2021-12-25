import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Navbarlayout } from "../styles/components/home/navbar";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
/** This is a description of the foo function.
 * @param {string} - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function Navbar() {
  /** This is a description of the none function
   * @param {string} - This is a description of the none parameter.
   */
  function none() {}
  const { data: session } = useSession();
  const router = useRouter();
  const url = router.pathname;
  let isDashboard;
  if (url == "/") {
    isDashboard = true;
  } else {
    isDashboard = false;
  }
  // console.log(router.pathname);
  return (
    <Navbarlayout>
      {/* Make a creativa navbar */}
      <div id="nav-content" className="justify-between">
        <div id="nav-right-details" className="flex items-center">
          <i id="btn" className="bx bx-menu text-gray-400 menuicon mr-10"></i>
          <AnimatePresence>
            <Link href="/">
              <motion.div
                // initial={
                //   isDashboard
                //     ? { color: "rgb(107, 114, 128)" }
                //     : { color: "rgb(255, 255, 255)" }
                // }
                animate={
                  isDashboard
                    ? { color: "rgb(255, 255, 255)" }
                    : { color: "rgb(107, 114, 128)" }
                }
                exit={
                  isDashboard
                    ? { color: "rgb(107, 114, 128)" }
                    : { color: "rgb(255, 255, 255)" }
                }
                transition={{ type: "spring", duration: 0.05 }}
                id="dashboard-button"
                className={`text-gray-500 cursor-pointer font-semibold mr-10 flex items-center`}
              >
                <i className="bx bx-compass mr-3 text-3xl"></i>
                <h4 className={`text-base`}>Dashboard</h4>
              </motion.div>
            </Link>
          </AnimatePresence>
          <AnimatePresence>
            <Link href="/collections">
              <motion.div
                // initial={
                //   isDashboard
                //     ? { color: "rgb(255, 255, 255)" }
                //     : { color: "rgb(107, 114, 128)" }
                // }
                animate={
                  isDashboard
                    ? { color: "rgb(107, 114, 128)" }
                    : { color: "rgb(255, 255, 255)" }
                }
                exit={
                  isDashboard
                    ? { color: "rgb(255, 255, 255)" }
                    : { color: "rgb(107, 114, 128)" }
                }
                transition={{ type: "spring", duration: 0.05 }}
                id="collections-button"
                className={`
                 text-gray-500 cursor-pointer font-semibold mr-10 flex items-center`}
              >
                <i className="bx bx-collection mr-3 text-3xl"></i>
                <h4 className="text-base">Collections</h4>
              </motion.div>
            </Link>
          </AnimatePresence>
        </div>
        <div
          id="nav-right-details"
          className="flex items-center flex-row-reverse"
        >
          <Menu as="div" className="relative inline-block">
            <div>
              <Menu.Button className="inline-flex mt-2 justify-center w-full text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
                <div
                  className="bg-gray-500 rounded-full w-10 h-10 mr-7 bg-cover"
                  style={{
                    backgroundImage: `url(${
                      session ? session.user!.image : ""
                    })`,
                  }}
                ></div>
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
              <Menu.Items className="absolute right-6  w-56 min-w-max mt-2 origin-top-right todo-bg-header divide-y divide-blue-300/[.10] ring-1 rounded-xl shadow-lg ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={session ? () => none() : () => signIn()}
                        className={`${
                          active
                            ? `${session ? "" : "bgmenucolor"} ${
                                session ? "cursor-default" : "cursor-pointer"
                              } text-white`
                            : "text-white"
                        } group flex rounded-md w-full flex-col py-3 text-sm`}
                      >
                        {session ? (
                          <h4 className="ml-3 flex flex-col items-start justify-center mr-3">
                            Logged as:
                            <br />
                            <span className="font-bold text-left left-0">
                              {session.user!.email}
                            </span>
                          </h4>
                        ) : (
                          <h4 className="ml-3 flex flex-col items-start justify-center">
                            Você não está logado.
                            <br />
                            <span className="font-bold text-left left-0">
                              Faça login com Google
                            </span>
                          </h4>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                </div>
                {session ? (
                  <div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bgmenucolor text-white" : "text-white"
                            } group flex rounded-md items-center w-full py-2 text-sm`}
                          >
                            {active ? (
                              <i className="bx bx-cog text-pink-200 ml-3 text-xl  mr-2"></i>
                            ) : (
                              <i className="bx bx-cog textmenucolor ml-3 text-xl  mr-2"></i>
                            )}
                            Account settings
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bgmenucolor text-white" : "text-white"
                            } group flex rounded-md items-center w-full py-2 text-sm`}
                          >
                            {active ? (
                              <i className="bx bx-support text-pink-200 ml-3 text-xl  mr-2"></i>
                            ) : (
                              <i className="bx bx-support textmenucolor ml-3 text-xl  mr-2"></i>
                            )}
                            Support
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 border-t border-slate-600/[.4] ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={session ? () => signOut() : () => none()}
                            className={`${
                              active ? "bgmenucolor text-white" : "text-white"
                            } group flex rounded-md items-center w-full py-3 text-sm`}
                          >
                            {active ? (
                              <i className="bx bx-exit text-pink-200 ml-3 text-xl mr-2"></i>
                            ) : (
                              <i className="bx bx-exit textmenucolor ml-3 text-xl  mr-2"></i>
                            )}
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu as="div" className="bellmenu inline-block mr-7">
            <div>
              <Menu.Button className="inline-flex justify-center w-full text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
                <i className="bx bx-bell text-2xl text-white cursor-pointer"></i>
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
              <Menu.Items className="absolute right-0 mr-6 mt-[1.25rem] w-56 origin-center todo-bg-header divide-y divide-blue-300/[.10] ring-1 rounded-xl shadow-lg ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "cursor-default text-white" : "text-white"
                        } group flex rounded-xl items-center w-full py-3 text-sm flex justify-between`}
                      >
                        <span className="ml-3 font-semibold">
                          Notifications
                        </span>
                        <div className="rounded-full flex items-center justify-center bgmenucolor w-6 h-6 mr-3">
                          <span className="text-xs text-white">0</span>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "cursor-pointer text-white" : "text-white"
                        } group flex rounded-xl items-center w-full py-3 text-sm `}
                      >
                        <span className="ml-3 bgmenucolor rounded-md p-2">
                          Comming Soon
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <div className="search-box flex items-center justify-center">
            <button className="btn-search">
              <i className="bx bx-search text-2xl text-white cursor-pointer searchicon"></i>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Search a Task"
            />
          </div>
          {session ? (
            <Link href="/collections">
              <div
                id="add_todo_btn"
                className="cursor-pointer bg-gradient-to-tr from-pink-600 border-2 border-white/[.4] to-orange-300 w-9 h-9 rounded-xl flex justify-center items-center"
              >
                <i className="bx bx-plus text-white text-2xl"></i>
              </div>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </Navbarlayout>
  );
}
export default Navbar;
