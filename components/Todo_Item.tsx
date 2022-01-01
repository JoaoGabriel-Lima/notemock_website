/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useState } from "react";
import { CheckboxContainer } from "../styles/components/home/checkbox";
import scss from "../styles/home.module.scss";
import { useSession } from "next-auth/react";
/** This is a description of the foo function.
 * @param {string} props - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function ToDoItem(props: any) {
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
    <CheckboxContainer
      color={colorsoftodo()}
      groupcolor={`${props.groupcolor}`}
      className="todo_list mb-7 flex items-center"
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
            className={`${isOpen ? "text-gray-400" : "text-white"} font-normal`}
          >
            {props.itemcontent}
          </h4>
          <div className="flex justify-start items-center">
            <i className={`bx bx-calendar-alt mr-1 ${props.color} text-md`}></i>
            <h5 className={`${props.color} font-light text-sm`}>
              {messageusingdaysremaining()}
            </h5>
          </div>
        </div>
      </label>
    </CheckboxContainer>
  );
}
// TodoItem.defaultProps = {
//   color: "gray",
// };
export default ToDoItem;
