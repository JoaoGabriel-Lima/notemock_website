/* eslint-disable require-jsdoc */
import type { NextPage } from "next";
import React from "react";
import { HomeCointainer } from "../../styles/components/home/home";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CollectionsGrid } from "../../styles/components/collections/grid";
import "react-circular-progressbar/dist/styles.css";
import Collection from "../../components/Collections/Collection";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();
const Collections: NextPage = () => {
  const router = useRouter();
  //   const { data: session } = useSession();
  const { data: session, status } = useSession();
  function none(session: any) {
    return "";
  }
  none(session);

  if (status === "loading") {
    return (
      <HomeCointainer className="body">
        <Layout></Layout>
      </HomeCointainer>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
  }
  if (status === "authenticated") {
    return (
      <>
        <HomeCointainer className="body">
          <Layout>
            <div className="page_overview flex w-full justify-between items-start h-24">
              <h4 className="text-white font-medium text-xl">Collections</h4>
              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
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
                            <span className="ml-3">Add a new Collection</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="page_treatment flex w-full flex-col justify-start items-start">
              <div className="page-filter-options w-full flex flex-col items-start justify-center">
                <Tab.Group vertical={true} defaultIndex={1}>
                  <Tab.List>
                    <Tab
                      className={({ selected }) =>
                        (selected
                          ? "h-12 bg-[#414052]"
                          : "h-12 outline outline-[#414052] outline-2") +
                        " box-border mr-4 pr-7 pl-7 rounded-2xl font-medium cursor-pointer text-white text-base"
                      }
                    >
                      Favorites
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        (selected
                          ? "h-12 bg-[#414052]"
                          : "h-12 outline outline-[#414052] outline-2") +
                        " topmarginneed box-border pr-7 pl-7 rounded-2xl font-medium text-white text-base cursor-pointer"
                      }
                    >
                      All Collections
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="w-full">
                    <Tab.Panel className="w-full">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <CollectionsGrid className="grid w-full justify-center mt-8 ease-in mb-8">
                          <QueryClientProvider client={queryClient}>
                            <CollectionsProgressFavorite />
                          </QueryClientProvider>
                        </CollectionsGrid>
                      </motion.div>
                    </Tab.Panel>
                    <Tab.Panel className="w-full">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <CollectionsGrid className="grid w-full justify-center mt-8 ease-in mb-8">
                          <QueryClientProvider client={queryClient}>
                            <CollectionsProgress />
                          </QueryClientProvider>
                          <div className="w-full h-24 flex justify-center items-start cursor-pointer">
                            <div className="flex items-center w-full h-full justify-center border-[3px] border-[#21212B] hover:border-[#2A2A37] rounded-3xl">
                              <i className="bx bx-plus text-3xl text-[#8A8A8E]"></i>
                            </div>
                          </div>
                        </CollectionsGrid>
                      </motion.div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </Layout>
        </HomeCointainer>
      </>
    );
  }
  return (
    <HomeCointainer className="body">
      <Layout></Layout>
    </HomeCointainer>
  );
};

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
export default Collections;

function getChecked(array: any) {
  let checked = 0;
  array.forEach((element: any) => {
    if (element.checked) checked++;
  });
  return checked;
}
function CollectionsProgressFavorite() {
  const { data: session } = useSession();

  const { isLoading, error, data } = useQuery("repoData", () =>
    axios
      .post("http://localhost:3000/api/user", { session: session })
      .then((res) => res.data)
  );

  if (error)
    return (
      <Collection
        className="animate-pulse"
        groupnane="Error"
        groupicon="x"
        groupcolor="#f83d3d"
        groupid="404"
        groupprogress={6}
        groupmax={6}
      ></Collection>
    );
  if (isLoading)
    return (
      <Collection
        className="animate-pulse"
        groupnane="Loading"
        groupicon="message-square-dots"
        groupcolor="#2c2c2c"
        groupid="200"
        groupprogress={6}
        groupmax={6}
      ></Collection>
    );
  if (data.user === undefined || data.user === null) {
    return (
      <Collection
        className="animate-pulse"
        groupnane="Error"
        groupicon="x"
        groupcolor="#f83d3d"
        groupid="404"
        groupprogress={6}
        groupmax={6}
      ></Collection>
    );
  } else {
    return data.user.collections.map((collection: any) => {
      if (collection.favorite) {
        return (
          <Collection
            key={collection.groupid}
            groupnane={collection.groupname}
            groupicon={collection.groupicon}
            groupcolor={collection.groupcolor}
            groupid={collection.groupid}
            groupprogress={getChecked(collection.todos)}
            groupmax={collection.todos.length}
          ></Collection>
        );
      }
    });
  }
}
function CollectionsProgress() {
  const { data: session } = useSession();

  const { isLoading, error, data } = useQuery("repoData", () =>
    axios
      .post("http://localhost:3000/api/user", { session: session })
      .then((res) => res.data)
  );

  if (error)
    return (
      <Collection
        className="animate-pulse"
        groupnane="Error"
        groupicon="x"
        groupcolor="#f83d3d"
        groupid="404"
        groupprogress={6}
        groupmax={6}
      ></Collection>
    );
  if (isLoading)
    return (
      <Collection
        className="animate-pulse"
        groupnane="Loading"
        groupicon="message-square-dots"
        groupcolor="#2c2c2c"
        groupid="200"
        groupprogress={6}
        groupmax={6}
      ></Collection>
    );
  if (data.user === undefined || data.user === null) {
    return (
      <Collection
        className="animate-pulse"
        groupnane="Error"
        groupicon="x"
        groupcolor="#f83d3d"
        groupid="404"
        groupprogress={6}
        groupmax={6}
      ></Collection>
    );
  } else {
    return data.user.collections.map((collection: any) => (
      <Collection
        key={collection.groupid}
        groupnane={collection.groupname}
        groupicon={collection.groupicon}
        groupcolor={collection.groupcolor}
        groupid={collection.groupid}
        groupprogress={getChecked(collection.todos)}
        groupmax={collection.todos.length}
      ></Collection>
    ));
  }
}
