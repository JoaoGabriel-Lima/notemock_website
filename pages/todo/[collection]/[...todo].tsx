/* eslint-disable no-unused-vars */
import type { NextPage } from "next";
import { HomeCointainer } from "../../../styles/components/home/home";
import Layout from "../../../components/Layout";
import React, { useEffect, useRef, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { HexColorPicker } from "react-colorful";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
// import "../../styles/calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const EditTodo: NextPage = ({ content, tododata2 }: any) => {
  const router = useRouter();
  const [name, setName] = useState(tododata2.todo.itemcontent);
  const [date, setDate] = useState(tododata2.todo.itemtime);
  const [subtodoText, setSubTodoText] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [focusInput, setFocusInput]: any = useState(null);

  const getDate = (date: any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const startdate = getDate(new Date());
  const [startDate, setStartDate] = useState(new Date(tododata2.todo.itemtime));
  const [sendDate, setSendDate] = useState(
    getDate(new Date(tododata2.todo.itemtime))
  );
  const [isOpenDate, setIsOpenDate] = useState(false);

  const handleChange = (e: any) => {
    setIsOpenDate(!isOpenDate);
    setStartDate(e);
    setSendDate(getDate(e));
    setDate(getDate(e));
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpenDate(!isOpenDate);
  };

  const removeTodo = async () => {
    setIsLoading2(true);
    try {
      const data = await axios.post("/api/deletetodo", {
        session: session,
        todoid: tododata2.todo.itemid,
        collectionid: content.collection.groupid,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      });
      setIsLoading2(false);
      if (data.data.status == "Removed todo") {
        router.push(`/collections/${content.collection.groupid}`);
      }
    } catch (error) {
      setError(true);
      setIsLoading2(false);
    }
  };
  const updateTodo = async () => {
    setIsLoading(true);
    const subtodoData = tododata2.todo.subtodo;
    const newSubTodo = subtodoData.map((subtodo: any, index: number) => {
      return {
        ...subtodo,
        itemcontent: subtodoText[index] || subtodo.itemcontent,
      };
    });
    const todoData = tododata2.todo;
    const newTodo = {
      ...todoData,
      itemcontent: name,
      itemtime: sendDate,
      subtodo: newSubTodo,
    };

    if (
      name === "" ||
      sendDate === "" ||
      newSubTodo.map((subtodo: any) => subtodo.itemcontent.trim()).includes("")
    ) {
      setError(true);
      setIsLoading(false);
      return;
    }
    try {
      const data = await axios.post("/api/todo/update", {
        session: session,
        newTodo: newTodo,
        collectionid: content.collection.groupid,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      });
      setIsLoading(false);
      if (data.data.status == "ToDo Updated") {
        router.push(`/collections/${content.collection.groupid}`);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };
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

  const { data: session, status } = useSession();
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

  return (
    <>
      <HomeCointainer
        className="body "
        color={content.collection.groupcolor}
        textColor={pickTextColorBasedOnBgColorSimple(
          content.collection.groupcolor,
          "white",
          "black"
        )}
      >
        <Layout>
          <div
            className={`${
              tododata2.todo.subtodo.length > 0 ? "pb-[30px]" : "pb-[250px]"
            }`}
          >
            <div className="  page_overview flex w-full justify-between items-start mb-10">
              <div className="flex items-center justify-start w-full">
                <div
                  className="w-11 min-w-[2.75rem] h-11 rounded-2xl bg-[#21212b] mr-4 flex items-center justify-center cursor-pointer"
                  onClick={() => router.back()}
                >
                  <i className="bx bx-chevron-left text-white text-3xl"></i>
                </div>
                <h4
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                  className="line-clamp-2 whitespace-pre-wrap text-white text-ellipsis font-semibold overflow-hidden tracking-wide text-xl"
                >
                  Edit "To-Do"
                </h4>
              </div>
            </div>
            {error && (
              <div className=" w-full bg-red-500/80 py-3 rounded-lg">
                <h5 className="text-white ml-5">Please fill out all fields</h5>
              </div>
            )}
            <div className="mt-4 flex flex-col justify-start w-full h-auto items-start divide-y  divide-slate-700/[.4]">
              <section className="w-full flex flex-col mb-5">
                <div className="w-full">
                  <h4
                    className={`${
                      error ? "text-red-500/60" : "text-gray-100/[.5]"
                    }  font-normal text-sm tracking-wide`}
                  >
                    To-Do Content
                  </h4>
                  <input
                    maxLength={100}
                    max={100}
                    type="text"
                    disabled={isLoading}
                    value={name}
                    onChange={(e) =>
                      e.target.value.length <= 100 && setName(e.target.value)
                    }
                    placeholder="Ex: Compras da semana"
                    className={`mt-2 w-full h-[3.45rem] bg-transparent rounded-2xl border-[3px] ${
                      error ? "border-red-500/70" : "border-[#21212b]"
                    } px-3 box-box placeholder:text-gray-500 text-gray-400 placeholder:font-medium font-medium`}
                  ></input>
                </div>

                <div className="w-full mt-5">
                  <h4
                    className={`${
                      error ? "text-red-500/60" : "text-gray-100/[.5]"
                    }  font-normal text-sm tracking-wide mb-2`}
                  >
                    To-Do Date
                  </h4>
                  <div
                    className={`w-full border-[3px] ${
                      error ? "border-red-500/70" : "border-[#21212b]"
                    }  rounded-2xl flex items-center`}
                  >
                    <input
                      maxLength={9}
                      max={9}
                      type="text"
                      disabled={true}
                      value={date}
                      onChange={(e) =>
                        e.target.value.length <= 9 && setName(e.target.value)
                      }
                      placeholder="Ex: Compras da semana"
                      className={`w-full h-[3rem] bg-transparent  px-3 box-box placeholder:text-gray-500 text-gray-400 placeholder:font-medium font-medium`}
                    ></input>
                    <div id="send" className="mr-3 flex relative ">
                      <AnimatePresence initial={false}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => handleClick(e)}
                          className=" cursor-pointer text-white bg-[#32323c] hover:bg-[#25252c] rounded-lg min-w-max px-4 py-1 origin-right"
                        >
                          <i className="bx bx-calendar text-white text-xl"></i>
                        </motion.div>
                      </AnimatePresence>
                      <AnimatePresence initial={false}>
                        {isOpenDate && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            style={{ originY: 0 }}
                            transition={{ duration: 0.1 }}
                            className="z-[6] absolute top-[40px] right-[-15px]"
                          >
                            <DatePicker
                              dateFormat="yyyy/MM/dd"
                              disabledKeyboardNavigation
                              formatWeekDay={(nameOfDay) =>
                                nameOfDay.substr(0, 1)
                              }
                              wrapperClassName="datePicker"
                              selected={startDate}
                              onChange={handleChange}
                              inline
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </section>
              {tododata2.todo.subtodo.length > 0 && (
                <section className="w-full flex flex-col pt-3">
                  <h3 className="mt-1 text-lg text-white/90 font-medium">
                    Subtasks
                  </h3>
                  <h4 className="mb-2 text-white/70 text-sm ">Click to edit</h4>
                  <div className="w-full mt-3 flex flex-col gap-y-3">
                    {tododata2.todo.subtodo.map(
                      (subtodo: any, index: number) => {
                        return (
                          <div
                            key={index}
                            onFocus={() => setFocusInput(index)}
                            onBlur={() => setFocusInput(null)}
                            className={`${
                              focusInput == index && "border-dashed "
                            } w-full h-[55px] rounded-2xl flex items-center justify-between border-[4px] ${
                              error ? "border-red-500/70" : "border-[#21212b]"
                            }`}
                          >
                            <input
                              max={100}
                              maxLength={100}
                              className="text-white/70 px-4 bg-transparent w-full h-full"
                              onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                  const newArray: any = subtodoText;
                                  newArray[index] = e.target.value;
                                  setSubTodoText(newArray);
                                }
                              }}
                              defaultValue={subtodo.itemcontent}
                            ></input>
                            <i className="bx bx-edit text-white/60 mr-5 text-xl" />
                          </div>
                        );
                      }
                    )}
                  </div>
                </section>
              )}
            </div>
            <div className="w-full flex items-center justify-center mt-5 gap-x-2">
              <button
                onClick={() => removeTodo()}
                className="text-white w-full flex justify-center items-center min-h-[3.5rem] rounded-3xl bg-red-600/80"
              >
                {isLoading2 ? (
                  <i className="bx bx-loader-alt text-white text-2xl animate-spin"></i>
                ) : (
                  <span className="px-3 text-center">Remove To-Do</span>
                )}
              </button>
              <button
                onClick={() => updateTodo()}
                className="text-white w-full flex justify-center items-center min-h-[3.5rem] rounded-3xl bg-[#2c2c3a]"
              >
                {isLoading ? (
                  <i className="bx bx-loader-alt text-white text-2xl animate-spin"></i>
                ) : (
                  <span className="px-3 text-center">Update To-Do</span>
                )}
              </button>
            </div>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default EditTodo;

export async function getServerSideProps(context: any) {
  const { collection } = context.query;
  const { todo } = context.query;
  const collection2 = collection;
  const todo2 = todo[0];

  const session = await getSession(context);
  const contentdata = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/collections`,
    {
      session: session,
      token: process.env.NEXT_PUBLIC_DBTOKEN,
      collectionid: collection2,
    },
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  );
  const tododata = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/todoid`,
    {
      session: session,
      token: process.env.NEXT_PUBLIC_DBTOKEN,
      collectionid: collection2,
      todoid: todo2,
    },
    {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    }
  );
  const content = contentdata.data;
  const tododata2 = tododata.data;
  if (content.collection === null || tododata2.todo === null) {
    return {
      notFound: true,
    };
  }
  return { props: { content, tododata2 } };
}
