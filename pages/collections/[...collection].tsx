/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import type { NextPage } from "next";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HomeCointainer } from "../../styles/components/home/home";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { getSession } from "next-auth/react";

const Collection: NextPage = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // function getChecked(array: any) {
  //   let checked = 0;
  //   array.forEach((element: any) => {
  //     if (element.checked) checked++;
  //   });
  //   return checked;
  // }
  // function getnotChecked(array: any) {
  //   let notchecked = 0;
  //   array.forEach((element: any) => {
  //     if (element.checked == false) notchecked++;
  //   });
  //   return notchecked;
  // }
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
                {data.collection.groupname}
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
          <motion.header
            className="mb-10 border-4 hover:border-[#23232c] border-[#1D1D25] rounded-3xl"
            initial={false}
          >
            <motion.li className=" cursor-pointer w-full rounded-3xl  h-14 flex justify-between items-center ">
              <div className="w-full h-11 flex justify-start items-center px-4">
                {/* <div
                  id="add_button"
                  onClick={() => setIsOpen(!isOpen)}
                  className=" w-8 h-8 bg-red-500 min-w-[2rem] rounded-xl mr-4 flex items-center justify-center"
                >
                  <i className="bx bx-plus text-black text-xl"></i>
                </div> */}
                <input
                  id="add_ToDo"
                  onClick={() => setIsOpen(true)}
                  className="text-gray-500 font-medium w-full h-full border-0 focus:border-0 placeholder:font-normal"
                  placeholder="Add a task"
                ></input>
              </div>
              <div id="send" className="mr-4 flex ">
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setIsOpen(true)}
                      className="text-white bg-[#32323c] rounded-lg mr-2 min-w-max px-4 py-1 origin-right"
                    >
                      <i className="bx bx-calendar text-white text-xl"></i>
                    </motion.button>
                  )}
                </AnimatePresence>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="text-white rounded-lg min-w-max px-4 py-1 origin-right"
                  style={{ backgroundColor: data.collection.groupcolor }}
                >
                  <i className="bx bx-plus text-xl"></i>
                </motion.button>
              </div>
            </motion.li>
          </motion.header>
          <div
            id="TasksToDo"
            className="w-full flex flex-col items-start justify-start"
          >
            <h4 className="text-white font-normal tracking-wide ">
              Tasks - {data.collection.todos.length}
            </h4>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export async function getServerSideProps(context: any) {
  // const router = useRouter();
  // const { collection } = router.query;

  const { collection } = context.query;
  const collection2 = collection[0];
  const session = await getSession(context);
  // console.log(session);
  const res = await axios.post(
    `https://notemock-website.vercel.app/api/collections`,
    {
      session: session,
      token: process.env.NEXT_PUBLIC_DBTOKEN,
      collectionid: collection2,
    }
  );
  // console.log(res.data);
  const data = res.data;
  if (data.collection === null) {
    return {
      notFound: true,
    };
  }
  return { props: { data } };
}

export default Collection;
