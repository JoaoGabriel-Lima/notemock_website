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
import { useRouter } from "next/router";

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
                                active ? " text-white/50" : "text-white/50"
                              } group flex rounded-xl cursor-default items-center w-full py-3 text-sm `}
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
                    className="cursor-default pr-7 pl-7 h-11 border-[#414052] border-2 rounded-2xl font-medium text-slate-300/50 text-base"
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
                                active ? " text-white/50" : "text-white/50"
                              } group flex rounded-xl cursor-default items-center w-full py-3 text-sm `}
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
                <section className="flex flex-col">
                  <h1 className="text-white font-bold text-4xl mb-5">
                    You are not logged in.
                  </h1>
                  <h4 className="text-gray-300 font-normal text-base text-justify mb-5">
                    A to-do list website made with Next.js focused on students
                    and developers, offering better organization and
                    customization options.
                  </h4>
                  <button
                    onClick={() => signIn()}
                    className="border-0 h-12 bg-[#414052] hover:bg-[#2c2b35] rounded-xl w-56 font-medium text-white text-base"
                  >
                    Sign In
                  </button>
                </section>
                <section className="flex flex-col mt-10 mb-10 box-border bg-[#414052]/20 py-5 px-6 rounded-lg">
                  <h2 className=" flex items-center">
                    <span className="text-lg text-white font-medium">
                      Notemock
                    </span>
                    <div>
                      <span className="ml-3 uppercase font-semibold rounded-[2px] tracking-wider  bg-[#9ae6b4]/[.16] px-1 py-[1px] text-green-200 text-[.75rem]">
                        Stable 0.95
                      </span>
                    </div>
                  </h2>
                  <section className="mt-3">
                    <h3 className="text-white/80 font-normal text-sm">
                      Added:
                    </h3>
                    <ul className="flex flex-col items-start ml-4 mt-1 gap-y-2">
                      <li className="text-white/50 font-light text-sm">
                        - Better organization of tasks lists with filters
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Subtasks progression on Dashboard
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Dashboard preferences are now saved on local storage
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Add, update, and delete subtasks functionality
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Custom accent color for collections
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Collection tab preference is now saved on local
                        storage
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Last custom color preference is now saved on local
                        storage
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Collection Icon color matches with collection accent
                        color
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Remove, update and add collection functionality
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Remove and add task scale animation
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Welcome instructions for new users
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - New Metadata
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Remove and add collection functionality
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Better arrangement of collections on the Dashboard
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Version changelogs
                      </li>
                    </ul>
                  </section>
                  <section className="mt-3 mb-2">
                    <h3 className="text-white/80 font-normal text-sm">
                      Fixed:
                    </h3>
                    <ul className="flex flex-col items-start ml-4 mt-1 gap-y-2">
                      <li className="text-white/50 font-light text-sm">
                        - Remove button has a new description
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Error 500 issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Loading padding issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Loading animation while removing tasks
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Search button is now disabled
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Tooltip padding issue on desktop version
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Custom color selector issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Removed the search icon instead of the collection icon
                        on Android viewport
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Realtime collection tasks length counter
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Calendar text matching accent color
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - PWA accent color
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Collections more options button position issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Collections name length issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Collections content length issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Collections content white line length issue
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Sidebar tooltip double animation bug on desktop
                        viewport
                      </li>
                      <li className="text-white/50 font-light text-sm">
                        - Disable buttons for features not yet available
                      </li>
                    </ul>
                  </section>
                </section>
              </div>
            </>
          )}
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default Home;

function Collections() {
  const router = useRouter();
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
    // check the first todo of each collection and reorder the todo list by the item_time
    function getadateandcalculatetimeremaingindays(time: string) {
      const today = new Date();
      const eventdate = new Date(time);
      const timeremaining = eventdate.getTime() - today.getTime();
      const daysremainingfloat = timeremaining / (1000 * 60 * 60 * 24) + 1;
      if (daysremainingfloat < 0) {
        return Math.floor(daysremainingfloat);
      } else {
        const value = parseInt(daysremainingfloat.toString().split(".")[0], 10); // before
        return value ? value : 0;
      }
    }

    // add a todo to each collection
    const newCollections: any = [];
    data.user.collections.map((collection: any) => {
      if (collection.todos.length > 0) {
        const todosChecked = collection.todos.filter((todo: any) => {
          return todo.checked === true;
        });
        const todosUnchecked = collection.todos.filter((todo: any) => {
          return todo.checked === false;
        });
        const todosCheckedSort = todosChecked.sort((a: any, b: any) => {
          const aTime: any = getadateandcalculatetimeremaingindays(a.itemtime);
          const bTime: any = getadateandcalculatetimeremaingindays(b.itemtime);

          // order witch one is next to 0
          if (
            Math.abs(0 - aTime) == Math.abs(0 - bTime) &&
            a.checked < b.checked
          ) {
            return -1;
          } else {
            return Math.abs(0 - aTime) - Math.abs(0 - bTime);
          }
        });

        const todosUncheckedSort = todosUnchecked.sort((a: any, b: any) => {
          const aTime: any = getadateandcalculatetimeremaingindays(a.itemtime);
          const bTime: any = getadateandcalculatetimeremaingindays(b.itemtime);

          if (
            Math.abs(0 - aTime) == Math.abs(0 - bTime) &&
            a.checked < b.checked
          ) {
            return -1;
          } else {
            return Math.abs(0 - aTime) - Math.abs(0 - bTime);
          }
        });

        const todos = [...todosUncheckedSort, ...todosCheckedSort];

        newCollections.push({
          ...collection,
          todos: todos,
        });
      }
    });

    const collectionsSorted = newCollections.sort((a: any, b: any) => {
      if (a.todos.length === 0 || b.todos.length === 0) {
        return -1;
      }
      const aTime: any = getadateandcalculatetimeremaingindays(
        a.todos[0].itemtime
      );
      const bTime: any = getadateandcalculatetimeremaingindays(
        b.todos[0].itemtime
      );

      if (a.todos[0].checked === true || b.todos[0].checked === true) {
        return 1;
      }
      return Math.abs(0 - aTime) - Math.abs(0 - bTime);
    });

    const collectionsWithTodos = collectionsSorted.filter((collection: any) => {
      return collection.todos.length > 0;
    });
    if (data.user.collections.length === 0) {
      return (
        <div className="text-white w-full h-auto py-7 rounded-xl bg-[#21212b] flex justify-start items-center flex-col">
          <h2 className="text-white text-xl mb-1 text-center px-5">
            You don't have a collection yet!
          </h2>
          <h4 className="text-white/60 mb-7 text-center px-5">
            To enjoy all the features of Notemock you need a collection
          </h4>
          <button
            onClick={() => {
              router.push("/collections/add");
            }}
            className="bg-[#414052] px-7 py-3 rounded-lg font-medium text-center"
          >
            Add my first collection
          </button>
        </div>
      );
    } else if (collectionsWithTodos.length == 0) {
      return (
        <div className="text-white w-full h-auto py-7 rounded-xl bg-[#21212b] flex justify-start items-center flex-col">
          <h2 className="text-white text-xl mb-1 px-5 text-center">
            Your collections doesn't have any task
          </h2>
          <h4 className="text-white/60 text-center px-5">
            Add a task and it will appear in your daily overview
          </h4>
        </div>
      );
    }

    return collectionsSorted.map((collection: any) => {
      const todosChecked = collection.todos.filter((todo: any) => {
        return todo.checked === true;
      });
      const todosUnchecked = collection.todos.filter((todo: any) => {
        return todo.checked === false;
      });
      const todosCheckedSort = todosChecked.sort((a: any, b: any) => {
        const aTime: any = getadateandcalculatetimeremaingindays(a.itemtime);
        const bTime: any = getadateandcalculatetimeremaingindays(b.itemtime);

        // order witch one is next to 0
        if (
          Math.abs(0 - aTime) == Math.abs(0 - bTime) &&
          a.checked < b.checked
        ) {
          return -1;
        } else {
          return Math.abs(0 - aTime) - Math.abs(0 - bTime);
        }
      });

      const todosUncheckedSort = todosUnchecked.sort((a: any, b: any) => {
        const aTime: any = getadateandcalculatetimeremaingindays(a.itemtime);
        const bTime: any = getadateandcalculatetimeremaingindays(b.itemtime);

        if (
          Math.abs(0 - aTime) == Math.abs(0 - bTime) &&
          a.checked < b.checked
        ) {
          return -1;
        } else {
          return Math.abs(0 - aTime) - Math.abs(0 - bTime);
        }
      });

      const todos = [...todosUncheckedSort, ...todosCheckedSort];

      if (todos.length === 0) {
        return;
      } else {
        return (
          <ToDo
            key={collection.groupid}
            groupcolor={collection.groupcolor}
            groupname={collection.groupname}
            iconname={collection.groupicon}
            groupid={collection.groupid}
          >
            {todos.slice(0, 4).map((todo: any) => (
              <ToDoItem
                key={todo.itemid}
                itemcontent={todo.itemcontent}
                itemtime={todo.itemtime}
                subtodo={todo.subtodo}
                checked={todo.checked}
                groupcolor={collection.groupcolor}
                itemid={todo.itemid}
                collectionid={collection.groupid}
              />
            ))}
            {/* {collection.todos.length > 4 && (
              <div className="text-white/80 mb-2 mt-[-15px] py-2 rounded-md flex w-full justify-start">
                And {collection.todos.length - 4} more...
              </div>
            )} */}
          </ToDo>
        );
      }
    });
  }
}
