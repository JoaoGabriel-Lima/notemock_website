import type { NextPage } from "next";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HomeCointainer } from "../../styles/components/home/home";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const Collection: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <HomeCointainer className="body">
        <Layout>
          <div className="page_overview flex w-full justify-between items-start h-24 mb-20">
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
        </Layout>
      </HomeCointainer>
    </>
  );
};
export default Collection;
