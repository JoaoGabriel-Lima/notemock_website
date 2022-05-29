/* eslint-disable require-jsdoc */
import axios from "axios";
import React, { useState } from "react";
import { CheckboxContainer } from "../styles/components/home/checkbox";
import scss from "../styles/home.module.scss";
import { useSession } from "next-auth/react";

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
function ToDoItem(props: any) {
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

  // return subtodos that is checked

  return (
    <CheckboxContainer
      color={colorsoftodo()}
      groupcolor={`${props.groupcolor}`}
      className="todo_list mb-7 flex items-center"
    >
      <input
        type="checkbox"
        id={scss.todo_checkbox}
        className={`w-6 checkbox h-6 rounded-xl c_color_pink ${pickTextColorBasedOnBgColorSimple(
          props.groupcolor,
          "before:border-white",
          "before:border-black"
        )} checked:bg-[${props.groupcolor}] border-[${
          props.groupcolor
        }] border-4`}
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
              isOpen ? "text-gray-400" : "text-white"
            } font-normal whitespace-pre-wrap`}
            style={{
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {props.itemcontent}
          </h4>
          <div className=" flex items-center justify-start ">
            <div className="flex justify-start items-center">
              <i
                className={`bx bx-calendar-alt mr-1 ${props.color} text-md`}
              ></i>
              <h5 className={`${props.color} font-light text-sm`}>
                {messageusingdaysremaining()}
              </h5>
            </div>
            {props.subtodo.length > 0 ? (
              <div className="flex justify-start items-center ml-3 ">
                <i
                  className="bx bx-folder-open mt-[2px]"
                  style={{ color: "#a8a7a7" }}
                ></i>
                <h5 className="text-sm ml-1" style={{ color: "#a8a7a7" }}>
                  {props.subtodo.filter((subtodo: any) => subtodo.checked)
                    .length == 0 ? (
                    <>{props.subtodo.length}</>
                  ) : (
                    <>
                      {
                        props.subtodo.filter((subtodo: any) => subtodo.checked)
                          .length
                      }
                      /{props.subtodo.length}
                    </>
                  )}
                </h5>
              </div>
            ) : (
              <></>
            )}
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
