/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import type { NextPage } from "next";
import React from "react";
import { HomeCointainer } from "../styles/components/home/home";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ToDoItem from "../components/Todo_Item";
import ToDo from "../components/Todo";
import { useSession, signIn } from "next-auth/react";
import Layout from "../components/Layout";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: true,
      // refetchInterval: 5000,
    },
  },
});

const Home: NextPage = () => {
  const { data: session } = useSession();
  const greet = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else if (hour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  // console.log(session);
  return (
    <>
      <HomeCointainer className="body">
        <Layout>
          {session ? (
            <>
              <div className="page_overview flex w-full justify-between items-center">
                <h4 className="text-white font-medium text-xl">Dashboard</h4>
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
                              <span className="ml-3">Change View Mode</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="page_treatment flex w-full flex-col justify-start items-start">
                <h2 className="text-white text-4xl mt-14 font-bold">
                  {greet()},
                  <br />
                  {session ? session.user!.name : "Not Logged In"}
                </h2>
                <div className="page-filter-options w-full flex items-center justify-start mt-14">
                  <button
                    id="daily_overview"
                    className="mr-4 pr-7 pl-7 h-12 bg-[#414052] rounded-2xl font-medium text-white text-base"
                  >
                    Daily Overview
                  </button>
                  <button
                    id="statistics"
                    className=" pr-7 pl-7 h-11 border-[#414052] border-2 rounded-2xl font-medium text-white text-base"
                  >
                    Statistic
                  </button>
                </div>
              </div>
              {/* <div>{props.data.user.name}</div> */}
              <section
                id="todos"
                className="flex w-full flex-col items-center mt-10 mb-10"
              >
                <QueryClientProvider client={queryClient}>
                  <Collections />
                </QueryClientProvider>
              </section>
            </>
          ) : (
            <>
              <div className="page_overview flex w-full justify-between items-center">
                <h4 className="text-white font-medium text-xl">
                  Note<span className="text-[#E95F5F]">mock</span>
                </h4>
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
                              <span className="ml-3">Change View Mode</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="flex flex-col mt-14 h-min">
                <h1 className="text-white font-bold text-4xl mb-5">
                  You are not logged in.
                </h1>
                <h4 className="text-gray-300 font-normal text-base text-justify mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </h4>
                <button
                  onClick={() => signIn()}
                  className="border-0 h-12 bg-[#414052] hover:bg-[#2c2b35] rounded-xl w-56 font-medium text-white text-base"
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </Layout>
      </HomeCointainer>
    </>
  );
};

// Home.getInitialProps = async (ctx: any) => {
//   // console.log("one time");
//   const session = await getSession(ctx);
//   const response = await axios.post("http://localhost:3000/api/user", {
//     session: session,
//   });
//   // console.log(response.data);
//   return { status: response.data.status, data: response.data };
// };

export default Home;

function Collections() {
  const { data: session } = useSession();
  const { isLoading, error, data } = useQuery("repoData", () =>
    axios
      .post(`/api/user`, {
        session: session,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      })
      .then((res) => res.data)
  );

  if (error)
    return (
      <div className="text-white bg-[#b32929] rounded-xl h-16 text-xl w-full flex justify-center items-center">
        Error loading data
      </div>
    );
  if (isLoading)
    return (
      <div className="text-white bg-transparent animate-pulse rounded-xl h-16 text-xl w-full flex justify-center items-center">
        <i className="animate-spin bx bx-loader-alt text-[#414052] text-4xl"></i>
      </div>
    );
  if (data.user === undefined || data.user === null) {
    return <div className="text-white text-2xl">No Todos</div>;
  } else {
    return data.user.collections.map((collection: any) => {
      if (collection.todos.length === 0) {
        return (
          <ToDo
            key={collection.groupid}
            groupcolor={collection.groupcolor}
            groupname={collection.groupname}
            iconname={collection.groupicon}
            groupid={collection.groupid}
          ></ToDo>
        );
      } else {
        return (
          <ToDo
            key={collection.groupid}
            groupcolor={collection.groupcolor}
            groupname={collection.groupname}
            iconname={collection.groupicon}
            groupid={collection.groupid}
          >
            {collection.todos.map((todo: any) => (
              <ToDoItem
                key={Math.random()}
                itemcontent={todo.itemcontent}
                itemtime={todo.itemtime}
                checked={todo.checked}
                groupcolor={collection.groupcolor}
                itemid={todo.itemid}
                collectionid={collection.groupid}
              />
            ))}
          </ToDo>
        );
      }
    });
  }
}
