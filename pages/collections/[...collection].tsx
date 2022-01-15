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

const Collection: NextPage = ({ content }: any) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const { data: session, status } = useSession();

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

  // const mutation = useMutation((newTodo) => {
  //   return axios.post("/api/addtodo", newTodo);
  // });

  async function addTodo(nw: any) {
    if (nw.itemcontent.trim()) {
      console.log(nw);
      setIsOpen(true);
      setInputvalue("");
      setIsLoading(true);
      await axios.post("http://localhost:3000/api/addtodo", nw).then((res) => {
        doRefetch();
        setIsLoading(false);
      });
    }
    // mutation.mutate(nw);
  }

  return (
    <>
      <HomeCointainer color={content.collection.groupcolor} className="body ">
        <Layout className="">
          <div className="page_overview flex w-full justify-between items-start mb-10">
            <div className="flex items-center justify-start ">
              <div
                className="w-11 h-11 rounded-2xl bg-[#21212b] mr-4 flex items-center justify-center cursor-pointer"
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
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => handleClick(e)}
                      className="text-white bg-[#32323c] hover:bg-[#25252c] rounded-lg mr-2 min-w-max px-4 py-1 origin-right"
                    >
                      <i className="bx bx-calendar text-white text-xl"></i>
                    </motion.button>
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
                  onClick={() =>
                    addTodo({
                      itemcontent: inputvalue,
                      collectionid: content.collection.groupid,
                      session: session,
                      token: process.env.NEXT_PUBLIC_DBTOKEN,
                      itemtime: sendDate,
                    })
                  }
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
            {isLoading && (
              <div className="w-full h-auto flex justify-center mt-5 mb-5">
                <i className="animate-spin bx bx-loader-alt text-[#414052] text-4xl"></i>
              </div>
            )}
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
  const res = await axios.post(`http://localhost:3000/api/collections`, {
    session: session,
    token: process.env.NEXT_PUBLIC_DBTOKEN,
    collectionid: collection2,
  });
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
let doRefetch: any;
function Todo(props: any) {
  const { content } = props;
  const { data: session } = useSession();
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    () =>
      axios
        .post(`http://localhost:3000/api/collections`, {
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
  };
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
      return data.collection.todos
        .slice()
        .reverse()
        .map((todo: any) => (
          <ToDoCollectionItem
            key={Math.random()}
            itemcontent={todo.itemcontent}
            itemtime={todo.itemtime}
            checked={todo.checked}
            groupcolor={props.content.collection.groupcolor}
            itemid={todo.itemid}
            collectionid={props.content.collection.groupid}
            subtodo={todo.subtodo}
            refetch={sendmsg}
          ></ToDoCollectionItem>
        ));
    } else {
      return <></>;
    }
  }
}

function sendmsg() {
  doRefetch();
}
