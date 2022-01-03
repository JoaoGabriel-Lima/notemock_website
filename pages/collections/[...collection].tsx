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
import { getSession, useSession } from "next-auth/react";
import ToDoCollectionItem from "../../components/Collections/Todo_Collection_Item";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import SubToDoItem from "../../components/Collections/SubToDo_Collection";

const Collection: NextPage = ({ content }: any) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // initialData: content,
        refetchOnWindowFocus: true,
      },
    },
  });
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
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
                {content.collection.groupname}
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
                  style={{ backgroundColor: content.collection.groupcolor }}
                >
                  <i className="bx bx-plus text-xl"></i>
                </motion.button>
              </div>
            </motion.li>
          </motion.header>
          <div
            id="TasksToDo"
            className="w-full flex flex-col items-start justify-start mb-[140px]"
          >
            <h4 className="text-white font-normal tracking-wide ">
              Tasks - {content.collection.todos.length}
            </h4>
            <QueryClientProvider client={queryClient}>
              <Todo content={content} session={session} />
            </QueryClientProvider>
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
  const content = res.data;
  // console.log(content);
  if (content.collection === null) {
    return {
      notFound: true,
    };
  }
  return { props: { content } };
}

export default Collection;

function Todo(props: any) {
  const { content } = props;
  const { data: session } = useSession();
  const { isLoading, error, data } = useQuery(
    "repoData",
    () =>
      axios
        .post(`https://notemock-website.vercel.app/api/collections`, {
          session: session,
          token: process.env.NEXT_PUBLIC_DBTOKEN,
          collectionid: props.content.collection.groupid,
        })
        .then((res) => res.data),
    {
      initialData: content,
    }
  );
  // console.log(data);
  if (error)
    return (
      <ToDoCollectionItem
        key={Math.random()}
        itemcontent="Error"
        itemtime="1997-06-30"
        checked={false}
        groupcolor="#f83d3d"
        itemid="404"
        collectionid="404"
        subtodo={[]}
      ></ToDoCollectionItem>
    );
  if (isLoading) return <></>;
  if (data.collection === null) {
    return (
      <ToDoCollectionItem
        key={Math.random()}
        itemcontent="Error"
        itemtime="1997-06-30"
        checked={false}
        groupcolor="#3d59f8"
        itemid="404"
        collectionid="404"
        subtodo={[]}
      ></ToDoCollectionItem>
    );
  } else {
    if (data.collection.todos.length > 0 && data.collection.todos[0] != "") {
      return data.collection.todos.map((todo: any) => (
        <ToDoCollectionItem
          key={Math.random()}
          itemcontent={todo.itemcontent}
          itemtime={todo.itemtime}
          checked={todo.checked}
          groupcolor={props.content.collection.groupcolor}
          itemid={todo.itemid}
          collectionid={props.content.collection.groupid}
          subtodo={todo.subtodo}
        >
          {todo.subtodo.length > 0 &&
            todo.subtodo[0] != "" &&
            todo.subtodo.map((subtodo: any) => (
              <SubToDoItem
                key={Math.random()}
                itemcontent={subtodo.itemcontent}
                checked={subtodo.checked}
                groupcolor={props.content.collection.groupcolor}
                subtodoid={subtodo.subtodoid}
                collectionid={props.content.collection.groupid}
                itemid={todo.itemid}
              ></SubToDoItem>
            ))}

          <div className="flex flex-row mt-4 items-start justify-center w-full ">
            <div className=" text-sm  w-full border-[3px] rounded-3xl flex justify-center font-medium text-center text-[#8e8e9b] items-center border-[#21212b] h-[45px] mr-3">
              Add a SubToDo
            </div>
            <div className="text-sm w-full border-[3px] rounded-3xl flex justify-center text-center font-medium text-[#8e8e9b] items-center border-[#21212b] h-[45px]">
              Edit Collection
            </div>
          </div>
        </ToDoCollectionItem>
      ));
    } else {
      return <></>;
    }
  }
}

// function SubTodo(props: any) {
//   const { data: session } = useSession();

//   console.log(props.itemid);
//   const { isLoading, error, data } = useQuery("repoData", () =>
//     axios
//       .post(`http://localhost:3000/api/subtodo`, {
//         session: session,
//         token: process.env.NEXT_PUBLIC_DBTOKEN,
//         collectionid: props.collectionid,
//         todoid: props.itemid,
//       })
//       .then((res) => res.data)
//   );

//   if (error)
//     return (
//       <SubToDoItem
//         key={Math.random()}
//         itemcontent="Error"
//         checked={false}
//         groupcolor="#f83d3d"
//         subitemid="404"
//         collectionid="404"
//       ></SubToDoItem>
//     );
//   if (isLoading)
//     return (
//       <SubToDoItem
//         className="animate-pulse"
//         key={Math.random()}
//         itemcontent="Loading"
//         checked={false}
//         groupcolor="#2c2c2c"
//         subitemid="404"
//         collectionid="404"
//       ></SubToDoItem>
//     );
//   if (data.todo === undefined || data.todo === null) {
//     return (
//       <SubToDoItem
//         key={Math.random()}
//         itemcontent="Error"
//         checked={false}
//         groupcolor="#3df846"
//         subitemid="404"
//         collectionid="404"
//       ></SubToDoItem>
//     );
//   } else {
//     console.log(data.todo.subtodo);
//     if (data.todo.subtodo.length > 0 && data.todo.subtodo[0] != "") {
//       return data.todo.subtodo.map((subtodo: any) => (
//         <SubToDoItem
//           key={Math.random()}
//           itemcontent={subtodo.itemcontent}
//           checked={subtodo.checked}
//           groupcolor={props.groupcolor}
//           subtodoid={subtodo.subtodoid}
//         ></SubToDoItem>
//       ));
//     } else {
//       return <></>;
//     }
//   }
// }
