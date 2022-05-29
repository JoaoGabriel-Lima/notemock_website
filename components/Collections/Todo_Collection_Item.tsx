/* eslint-disable react/jsx-no-undef */
/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CheckboxContainer } from "../../styles/components/home/checkbox";
import scss from "../../styles/home.module.scss";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import SubToDoItem from "./SubToDo_Collection";
import { useRouter } from "next/router";

/** This is a description of the foo function.
 * @param {string} props - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function ToDoCollectionItem(props: any) {
  const [subtodoChecked, setSubTodoChecked]: any = useState([]);
  const [inputValue, setInputvalue] = useState("");

  const setsubTodoCheckedDetails = (index: number, action: boolean) => {
    const array = subtodoChecked;
    array[index] = action;
    setSubTodoChecked(array);
  };

  function getadateandcalculatetimeremaingindays() {
    const today = new Date();
    const eventdate = new Date(props.itemtime);
    const timeremaining = eventdate.getTime() - today.getTime();
    const daysremainingfloat = timeremaining / (1000 * 60 * 60 * 24) + 1;
    if (daysremainingfloat < 0) {
      return Math.floor(daysremainingfloat);
    } else {
      const value = parseInt(daysremainingfloat.toString().split(".")[0], 10); // before
      return value ? value : 0;
    }
  }

  const yellow = "#E09E51";
  const gray = "#B2B2B6";
  const green = "#3FB970";
  const blue = "#41B2AB";
  const red = "#C65456";
  function messageusingdaysremaining() {
    const daysremaining = getadateandcalculatetimeremaingindays();
    if (daysremaining === -1) {
      return "Yesterday";
    } else if (daysremaining === -7) {
      return "Last Week";
    } else if (
      (daysremaining * -1) / 30 < 2 &&
      (daysremaining * -1) / 30 >= 1
    ) {
      return "Last month";
    } else if ((daysremaining * -1) / 30 >= 1) {
      return Math.floor((daysremaining * -1) / 30) + " months ago";
    } else if (daysremaining < -1) {
      return daysremaining * -1 + " days ago";
    } else if (daysremaining === 0) {
      return "Today";
    } else if (daysremaining === 1) {
      return "Tomorrow";
    } else if (
      (daysremaining * -1) / 30 > -2 &&
      (daysremaining * -1) / 30 <= -1
    ) {
      return "Next month";
    } else if ((daysremaining * -1) / 30 <= -1) {
      return "In " + Math.floor(daysremaining / 30) + " months";
    } else {
      return `In ${daysremaining} days`;
    }
  }

  function colorsoftodo() {
    const daysremaining = getadateandcalculatetimeremaingindays();
    if (daysremaining === -1) {
      return gray;
    } else if (daysremaining === -7) {
      return gray;
    } else if (
      (daysremaining * -1) / 30 < 2 &&
      (daysremaining * -1) / 30 >= 1
    ) {
      return red;
    } else if ((daysremaining * -1) / 30 >= 1) {
      return red;
    } else if (daysremaining < -1) {
      return gray;
    } else if (daysremaining === 0) {
      return yellow;
    } else if (daysremaining === 1) {
      return green;
    } else if (
      (daysremaining * -1) / 30 > -2 &&
      (daysremaining * -1) / 30 <= -1
    ) {
      return blue;
    } else if ((daysremaining * -1) / 30 <= -1) {
      return blue;
    } else {
      return blue;
    }
  }

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

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(props.checked);
  const [isOpenSub, setIsOpenSub] = useState(false);

  function getopenstatus() {
    const localdata = `${props.collectionid}`;
    if (
      localStorage.getItem(localdata) != null ||
      localStorage.getItem(localdata) != undefined
    ) {
      const lsData: any = localStorage.getItem(localdata);
      const lsDataJson = JSON.parse(lsData);
      const itemidvalue = `${props.itemid}`;
      if (lsDataJson[itemidvalue] == undefined) {
        if (lsDataJson[itemidvalue] == null) {
          delete lsDataJson[itemidvalue];
        } else {
          lsDataJson[itemidvalue] = "false";
        }
        localStorage.setItem(localdata, JSON.stringify(lsDataJson));
        return false;
      } else {
        if (lsDataJson[itemidvalue] === "true") {
          return true;
        } else {
          return false;
        }
      }
    }
    let lsDataJson: any;
    if (
      localStorage.getItem(localdata) != null ||
      localStorage.getItem(localdata) != undefined
    ) {
      const lsData: any = localStorage.getItem(localdata);
      lsDataJson = JSON.parse(lsData);
    } else {
      lsDataJson = {};
    }
    const itemidvalue = `${props.itemid}`;
    lsDataJson[itemidvalue] = "false";

    localStorage.setItem(localdata, JSON.stringify(lsDataJson));
    return false;
  }

  function openclose() {
    const localdata = `${props.collectionid}`;
    if (isOpenCollection) {
      setIsOpenCollection(false);
      refetchSubtodo();

      const lsData: any = localStorage.getItem(localdata);
      const lsDataJson = JSON.parse(lsData);
      const itemidvalue = `${props.itemid}`;
      lsDataJson[itemidvalue] = "false";
      localStorage.setItem(localdata, JSON.stringify(lsDataJson));
    } else {
      setIsOpenCollection(true);

      const lsData: any = localStorage.getItem(localdata);
      const lsDataJson = JSON.parse(lsData);
      const itemidvalue = `${props.itemid}`;
      lsDataJson[itemidvalue] = "true";

      localStorage.setItem(localdata, JSON.stringify(lsDataJson));
    }
  }

  const removeItem = () => {
    const localdata = `${props.collectionid}`;
    const lsData: any = localStorage.getItem(localdata);
    const lsDataJson = JSON.parse(lsData);
    const itemidvalue = `${props.itemid}`;
    lsDataJson[itemidvalue] = null;
    localStorage.setItem(localdata, JSON.stringify(lsDataJson));
    return lsDataJson;
  };

  async function deleteitem() {
    props.setIsLoading(true);
    await axios
      .post(`/api/deletetodo`, {
        collectionid: props.collectionid,
        id: props.itemid,
        session: session,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      })
      .then(async (res) => {
        // props.rerender();
        props.setIsLoading(false);
        props.reduceCounter();

        await props.refetch();
        removeItem();
      });
  }

  function refetchSubtodo() {
    props.refetch();
  }

  function sendcheck(c: any) {}
  const [isOpenCollection, setIsOpenCollection] = useState(getopenstatus());

  useEffect(() => {
    if (!isOpenCollection) {
      setIsOpenSub(false);
    }
  }, [isOpenCollection]);

  function handleClick(id: any) {
    setIsOpen(!isOpen);
    axios.post("/api/check", {
      id: id,
      checked: !isOpen,
      session: session,
      token: process.env.NEXT_PUBLIC_DBTOKEN,
      collectionid: props.collectionid,
    });
  }

  const addSubTodo = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    setInputvalue("");
    props.setIsLoading(true);
    await axios
      .post(`/api/subtodo/subtodo`, {
        collectionid: props.collectionid,
        todogroupid: props.itemid,
        itemcontent: inputValue.trim(),
        session: session,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      })
      .then((res) => {
        // props.rerender();
        props.setIsLoading(false);

        setIsOpenSub(true);
        props.refetch();
      });
  };
  const router = useRouter();
  return (
    <motion.div
      key={props.itemid}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto"
    >
      <div className="w-full mt-5 py-4 bg-[#21212b] rounded-3xl flex justify-between items-center">
        <CheckboxContainer
          color={colorsoftodo()}
          groupcolor={`${props.groupcolor}`}
          className="todo_list ml-4 flex items-center"
        >
          <input
            type="checkbox"
            id={scss.todo_checkbox}
            className={`w-6 checkbox h-6 rounded-xl c_color_pink checked:bg-[${
              props.groupcolor
            }] ${pickTextColorBasedOnBgColorSimple(
              props.groupcolor,
              "before:border-white",
              "before:border-black"
            )} border-[${props.groupcolor}] border-4`}
            onChange={() => handleClick(props.itemid)}
            checked={isOpen}
            style={{
              borderColor: props.groupcolor,
              color: pickTextColorBasedOnBgColorSimple(
                props.groupcolor,
                "white",
                "black"
              ),
            }}
          ></input>
          <label
            className={scss.todo_label}
            style={{
              color: pickTextColorBasedOnBgColorSimple(
                props.groupcolor,
                "white",
                "black"
              ),
            }}
            htmlFor="todo_checkbox"
            data-content={props.itemcontent}
            onClick={() => handleClick(props.itemid)}
          >
            <div className="flex ml-4 flex-col justify-center items-start cursor-pointer">
              <h4
                className={`${
                  isOpen ? "text-gray-400" : "text-[#e0e0e0]"
                } font-normal text-[15px] whitespace-pre-wrap`}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {props.itemcontent}
              </h4>
              <div className="mt-1 flex items-center justify-start ">
                {props.subtodo.length > 0 ? (
                  <div className="flex justify-start items-center mr-3">
                    <i
                      className="bx bx-folder-open"
                      style={{ color: "#a8a7a7" }}
                    ></i>
                    <h5 className="text-sm ml-1" style={{ color: "#a8a7a7" }}>
                      {props.subtodo.length}
                    </h5>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex justify-start items-center">
                  <i
                    className={`bx bx-calendar-alt mr-1 ${props.color} text-md`}
                  ></i>
                  <h5 className={`${props.color} font-light text-sm`}>
                    {messageusingdaysremaining()}
                  </h5>
                </div>
              </div>
            </div>
          </label>
        </CheckboxContainer>
        <div className="mr-5 ml-3 flex h-full justify-end items-center">
          <button
            className="rounded-lg h-full min-h-full"
            onClick={() => openclose()}
          >
            <i
              className={`bx h-full bx-chevron-${
                isOpenCollection ? "up" : "down"
              } text-2xl text-gray-400 `}
            ></i>
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {/* {isOpenCollection && refetchSubtodo()} */}
        {isOpenCollection && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.1 }}
            className={`ml-8 flex flex-col items-start justify-start`}
          >
            <AnimatePresence>
              {props.subtodo.length > 0 &&
                props.subtodo[0] != "" &&
                props.subtodo.map((subtodo: any, index: number) => (
                  <SubToDoItem
                    setsubTodoCheckedDetails={(action: boolean) =>
                      setsubTodoCheckedDetails(index, action)
                    }
                    setIsLoading={props.setIsLoading}
                    subtodoChecked={subtodoChecked[index]}
                    key={subtodo.subtodoid}
                    itemcontent={subtodo.itemcontent}
                    checked={subtodo.checked}
                    groupcolor={props.groupcolor}
                    subtodoid={subtodo.subtodoid}
                    collectionid={props.collectionid}
                    itemid={props.itemid}
                    refetch={props.refetch}
                    sendcheck={sendcheck}
                  ></SubToDoItem>
                ))}
            </AnimatePresence>
            <AnimatePresence>
              {isOpenSub && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center justify-between w-full border-4 border-[#21212b] py-3 mt-3 h-8 rounded-3xl"
                >
                  <form className="flex items-center justify-between w-full">
                    <div className="w-full h-11 flex justify-start items-center px-4">
                      <input
                        maxLength={100}
                        id="add_SubToDo"
                        autoComplete="off"
                        onChange={(e) => setInputvalue(e.target.value)}
                        className="placeholder:text-gray-500 text-gray-400 bg-transparent placeholder:font-medium font-medium w-full h-full border-0 focus:border-0 rounded-md autofill:bg-transparent "
                        placeholder="Add a subtask"
                        value={inputValue}
                      ></input>
                    </div>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        addSubTodo();
                      }}
                      className="text-white rounded-lg min-w-max px-4 mr-4 py-1 origin-right"
                      style={{ backgroundColor: props.groupcolor }}
                    >
                      <i
                        className="bx bx-plus text-xl"
                        style={{
                          color: pickTextColorBasedOnBgColorSimple(
                            props.groupcolor,
                            "white",
                            "black"
                          ),
                        }}
                      ></i>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-row mt-4 items-start justify-center w-full ">
              <div
                onClick={() => setIsOpenSub(!isOpenSub)}
                className="cursor-pointer text-sm  w-full border-[3px] hover:bg-[#1b1b24] rounded-3xl flex justify-center font-medium text-center text-[#8e8e9b] items-center border-[#21212b] h-[45px] mr-3"
              >
                {isOpenSub ? "Close Input" : "Add a SubToDo"}
              </div>
              {isOpen ? (
                <div
                  onClick={() => deleteitem()}
                  className="cursor-pointer text-sm w-full border-[3px] hover:bg-[#1b1b24] rounded-3xl flex justify-center text-center font-medium text-[#8e8e9b] items-center border-[#21212b] h-[45px]"
                >
                  Delete Todo
                </div>
              ) : (
                <div
                  onClick={() =>
                    router.push(`/todo/${props.collectionid}/${props.itemid}`)
                  }
                  className="cursor-pointer text-sm w-full border-[3px] hover:bg-[#1b1b24] rounded-3xl flex justify-center text-center font-medium text-[#8e8e9b] items-center border-[#21212b] h-[45px]"
                >
                  Edit Todo
                </div>
              )}
            </div>
          </motion.div>
        )}
        {/* {isOpenCollection && props.refetch()} */}
      </AnimatePresence>
    </motion.div>
  );
}
// TodoItem.defaultProps = {
//   color: "gray",
// };
export default ToDoCollectionItem;
