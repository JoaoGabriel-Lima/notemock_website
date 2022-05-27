/* eslint-disable react/jsx-no-undef */
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
// import SubToDoItem from "../../components/Collections/SubToDo_Collection";
import DatePicker from "react-datepicker";
// import "../../styles/calendar.css";
import "react-datepicker/dist/react-datepicker.css";

function pickTextColorBasedOnBgColorSimple(
  bgColor: string,
  lightColor: string,
  darkColor: string
) {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}
const Collection: NextPage = ({ content }: any) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const { data: session, status } = useSession();
  const [isFavorite, setIsFavorite] = useState(content.collection.favorite);

  const [taskLength, setTaskLength] = useState(content.collection.todos.length);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const router = useRouter();

  const getDate = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const startdate = getDate(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [sendDate, setSendDate] = useState(startdate);
  const [isOpenDate, setIsOpenDate] = useState(false);
  // const [date, setDate] = useState("");5555555555555

  const handleChange = (e: any) => {
    setIsOpenDate(!isOpenDate);
    setStartDate(e);
    setSendDate(getDate(e));
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpenDate(!isOpenDate);
  };
  // Create a function that get a date and return a string with the format yyyy-mm-dd

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

  async function addTodo(nw: any) {
    if (nw.itemcontent.trim()) {
      setIsOpen(true);
      setInputvalue("");
      setIsLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/addtodo`, nw)
        .then((res) => {
          setTaskLength(taskLength + 1);
          doRefetch().then(setIsLoading(false));
        });
    }
    // mutation.mutate(nw);
  }

  async function favoriteCollection(favorite: boolean) {
    await axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/favoritecollection`, {
        session: session,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
        collectionid: content.collection.groupid,
        favorite: favorite,
      })
      .then((res) => {
        setIsFavorite(!isFavorite);
      });
  }

  return (
    <>
      <HomeCointainer
        color={content.collection.groupcolor}
        textColor={pickTextColorBasedOnBgColorSimple(
          content.collection.groupcolor,
          "white",
          "black"
        )}
        className="body "
      >
        <Layout className="">
          <div className="page_overview flex w-full justify-between relative items-center mb-10">
            <div className="flex items-center justify-start w-[90%]">
              <div
                className="w-11 min-w-[2.75rem] h-11 rounded-2xl bg-[#21212b] mr-4 flex items-center justify-center cursor-pointer"
                onClick={() => router.back()}
              >
                <i className="bx bx-chevron-left text-white text-3xl"></i>
              </div>
              <h4 className="text-white nametodoh4 text-ellipsis overflow-hidden font-semibold tracking-wide text-2xl">
                {content.collection.groupname}
              </h4>
            </div>
            <Menu as="div" className="relative inline-block">
              <div className="">
                <Menu.Button className=" flex items-center justify-center w-full h-full text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
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
                <Menu.Items className="z-[5] absolute right-0  w-56 origin-top-right todo-bg-header divide-y divide-blue-300/[.10] ring-1 rounded-xl shadow-lg ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => favoriteCollection(!isFavorite)}
                          className={`${
                            active ? "bgmenucolor text-white" : "text-white"
                          } group flex rounded-xl items-center w-full py-3 text-sm `}
                        >
                          <span className="ml-3">
                            {isFavorite
                              ? "Unfavorite this collection"
                              : "Favorite this collection"}
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() =>
                            router.push(
                              `/collections/edit/${content.collection.groupid}`
                            )
                          }
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
            <form>
              <motion.li className=" cursor-pointer w-full rounded-3xl  h-14 flex justify-between items-center ">
                <div className="w-full h-11 flex justify-start items-center px-4">
                  <input
                    maxLength={50}
                    id="add_ToDo"
                    onClick={() => setIsOpen(true)}
                    onSubmit={() =>
                      addTodo({
                        itemcontent: inputvalue,
                        collectionid: content.collection.groupid,
                        session: session,
                        token: process.env.NEXT_PUBLIC_DBTOKEN,
                        itemtime: sendDate,
                      })
                    }
                    onChange={(e) => setInputvalue(e.target.value)}
                    className="placeholder:text-gray-500 text-gray-400 placeholder:font-medium font-medium w-full h-full border-0 focus:border-0 rounded-md autofill:bg-transparent "
                    placeholder="Add a task"
                    value={inputvalue}
                  ></input>
                </div>
                <div id="send" className="mr-4 flex relative ">
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => handleClick(e)}
                        className="text-white bg-[#32323c] hover:bg-[#25252c] rounded-lg mr-2 min-w-max px-4 py-1 origin-right"
                      >
                        <i className="bx bx-calendar text-white text-xl"></i>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence initial={false}>
                    {isOpenDate && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        style={{ originY: 0 }}
                        transition={{ duration: 0.1 }}
                        className="z-[6] absolute top-[40px] left-[-135px]"
                      >
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          disabledKeyboardNavigation
                          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
                          wrapperClassName="datePicker"
                          selected={startDate}
                          onChange={handleChange}
                          inline
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      addTodo({
                        itemcontent: inputvalue,
                        collectionid: content.collection.groupid,
                        session: session,
                        token: process.env.NEXT_PUBLIC_DBTOKEN,
                        itemtime: sendDate,
                      });
                    }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="text-white rounded-lg min-w-max px-4 py-1 origin-right"
                    style={{ backgroundColor: content.collection.groupcolor }}
                  >
                    <i
                      className="bx bx-plus text-xl"
                      style={{
                        color: pickTextColorBasedOnBgColorSimple(
                          content.collection.groupcolor,
                          "white",
                          "black"
                        ),
                      }}
                    ></i>
                  </motion.button>
                </div>
              </motion.li>
            </form>
          </motion.header>
          <div
            id="TasksToDo"
            className="w-full flex flex-col items-start justify-start mb-[140px]"
          >
            <div className="flex w-full justify-between items-center">
              <h4 className="text-white font-normal tracking-wide">
                Tasks - {taskLength}
              </h4>
              {isLoading && (
                <div className="h-auto flex justify-center">
                  <i className="animate-spin bx bx-loader-alt text-[#ffffff]/80 text-xl"></i>
                </div>
              )}
            </div>
            <QueryClientProvider client={queryClient}>
              <Todo
                content={content}
                session={session}
                reduceCounter={() => setTaskLength(taskLength - 1)}
              />
            </QueryClientProvider>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { collection } = context.query;
  const collection2 = collection[0];
  const session = await getSession(context);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/collections`,
    {
      session: session,
      token: process.env.NEXT_PUBLIC_DBTOKEN,
      collectionid: collection2,
    }
  );
  const content = res.data;
  if (content.collection === null) {
    return {
      notFound: true,
    };
  }
  return { props: { content } };
}

export default Collection;
let doRefetch: any;
function Todo(props: any) {
  const { content } = props;
  const { data: session } = useSession();
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    () =>
      axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/collections`, {
          session: session,
          token: process.env.NEXT_PUBLIC_DBTOKEN,
          collectionid: props.content.collection.groupid,
        })
        .then((res) => res.data),
    {
      initialData: content,
    }
  );
  doRefetch = async () => {
    await refetch();
    return true;
  };
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
      return (
        <AnimatePresence>
          {data.collection.todos
            .slice()
            .reverse()
            .map((todo: any) => (
              <ToDoCollectionItem
                reduceCounter={() => props.reduceCounter()}
                key={todo.itemid}
                itemcontent={todo.itemcontent}
                itemtime={todo.itemtime}
                checked={todo.checked}
                groupcolor={props.content.collection.groupcolor}
                itemid={todo.itemid}
                collectionid={props.content.collection.groupid}
                subtodo={todo.subtodo}
                refetch={sendmsg}
              ></ToDoCollectionItem>
            ))}
        </AnimatePresence>
      );
    } else {
      return <AnimatePresence></AnimatePresence>;
    }
  }
}

function sendmsg() {
  doRefetch();
}
