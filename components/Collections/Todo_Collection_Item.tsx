/* eslint-disable react/jsx-no-undef */
/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useState } from "react";
import { CheckboxContainer } from "../../styles/components/home/checkbox";
import scss from "../../styles/home.module.scss";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import SubToDoItem from "./SubToDo_Collection";

/** This is a description of the foo function.
 * @param {string} props - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function ToDoCollectionItem(props: any) {
  /** This is a description of the foo function.
  //  * @return {boolean} This is a description of what the function returns.
   * @param {string} e - This is a description of the foo parameter.
   */
  // if the day has already gone, return a negative number
  // if the day has not yet gone, return a positive number
  // if the date is today, return 0
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
  // Create a function that get today's date and calculate the time remaining in days
  // if the day has already gone, return a negative int number
  // if the day has not yet gone, return a positive int number
  // if the date is today, return int 0

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

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(props.checked);

  // const [isft, setIsft] = useState(false);

  function getopenstatus() {
    const localdata = `${props.collectionid}.${props.itemid}`;
    if (
      localStorage.getItem(localdata) != null ||
      localStorage.getItem(localdata) != undefined
    ) {
      if (localStorage.getItem(localdata) === "true") {
        return true;
      } else {
        return false;
      }
    } else {
      localStorage.setItem(localdata, "false");
      return false;
    }
  }

  function openclose() {
    const localdata = `${props.collectionid}.${props.itemid}`;
    if (isOpenCollection) {
      setIsOpenCollection(false);
      refetchSubtodo();

      localStorage.setItem(localdata, "false");
    } else {
      setIsOpenCollection(true);

      localStorage.setItem(localdata, "true");
    }
  }

  async function deleteitem() {
    await axios
      .post(`/api/deletetodo`, {
        collectionid: props.collectionid,
        id: props.itemid,
        session: session,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      })
      .then((res) => {
        // props.rerender();
        props.refetch();
      });
  }

  // create a function that will find the checked todo inside a array of objects and return the number of checked todos in the array
  // function getChecked(array: any) {
  //   let checked = 0;
  //   array.forEach((element: any) => {
  //     if (element.checked) checked++;
  //   });
  //   return checked;
  // }

  function refetchSubtodo() {
    props.refetch();
  }

  // const [checked] = useState(getChecked(props.subtodo));
  // const counter = (c: any) => {
  //   if (c == true) {
  //     setChecked(checked + 1);
  //   } else {
  //     setChecked(checked - 1);
  //   }
  // };

  function sendcheck(c: any) {
    console.log(c);
  }

  console.log(props.subtodo);
  const [isOpenCollection, setIsOpenCollection] = useState(getopenstatus());
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
  return (
    <div className="w-full h-auto">
      <div className="w-full mt-5 py-4 bg-[#21212b] rounded-3xl flex justify-between items-center">
        <CheckboxContainer
          color={colorsoftodo()}
          groupcolor={`${props.groupcolor}`}
          className="todo_list ml-4 flex items-center"
        >
          <input
            type="checkbox"
            id={scss.todo_checkbox}
            className={`w-6 checkbox h-6 rounded-xl c_color_pink checked:bg-[${props.groupcolor}] border-[${props.groupcolor}] border-4`}
            onChange={() => handleClick(props.itemid)}
            checked={isOpen}
            style={{
              borderColor: props.groupcolor,
            }}
          ></input>
          <label
            className={scss.todo_label}
            htmlFor="todo_checkbox"
            data-content={props.itemcontent}
            onClick={() => handleClick(props.itemid)}
          >
            <div className="flex ml-4 flex-col justify-center items-start cursor-pointer">
              <h4
                className={`${
                  isOpen ? "text-gray-400" : "text-[#e0e0e0]"
                } font-normal text-[15px] `}
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
            transition={{ duration: 0.2 }}
            className={`ml-8 flex flex-col items-start justify-start`}
          >
            {props.subtodo.length > 0 &&
              props.subtodo[0] != "" &&
              props.subtodo.map((subtodo: any) => (
                <SubToDoItem
                  key={Math.random()}
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

            <div className="flex flex-row mt-4 items-start justify-center w-full ">
              <div className="cursor-pointer text-sm  w-full border-[3px] hover:bg-[#1b1b24] rounded-3xl flex justify-center font-medium text-center text-[#8e8e9b] items-center border-[#21212b] h-[45px] mr-3">
                Add a SubToDo
              </div>
              {isOpen ? (
                <div
                  onClick={() => deleteitem()}
                  className="cursor-pointer text-sm w-full border-[3px] hover:bg-[#1b1b24] rounded-3xl flex justify-center text-center font-medium text-[#8e8e9b] items-center border-[#21212b] h-[45px]"
                >
                  Delete Todo
                </div>
              ) : (
                <div className="cursor-pointer text-sm w-full border-[3px] hover:bg-[#1b1b24] rounded-3xl flex justify-center text-center font-medium text-[#8e8e9b] items-center border-[#21212b] h-[45px]">
                  Edit Todo
                </div>
              )}
            </div>
          </motion.div>
        )}
        {/* {isOpenCollection && props.refetch()} */}
      </AnimatePresence>
    </div>
  );
}
// TodoItem.defaultProps = {
//   color: "gray",
// };
export default ToDoCollectionItem;
