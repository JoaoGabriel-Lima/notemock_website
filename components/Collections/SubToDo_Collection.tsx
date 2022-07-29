import axios from "axios";
import React, { useState } from "react";
import { CheckboxContainer } from "../../styles/components/home/checkbox";
import scss from "../../styles/home.module.scss";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

function SubToDoItem(props: any) {
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
  const [isOpenS, setIsOpenS] = useState(props.subtodoChecked || props.checked);

  const removeSubTodo = async () => {
    props.setIsLoading(true);
    await axios
      .post(`/api/deletetodo`, {
        collectionid: props.collectionid,
        subtodoid: props.subtodoid,
        todoid: props.itemid,
        session: session,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      })
      .then((res) => {
        // props.rerender();
        props.setIsLoading(false);
        props.refetch();
      });
  };

  function handleClick(id: any, subtodoid: any) {
    // props.refetch();
    props.sendcheck(!isOpenS);
    setIsOpenS(!isOpenS);
    props.setsubTodoCheckedDetails(!isOpenS);
    axios.post("/api/check", {
      id: id,
      subtodoid: subtodoid,
      checked: !isOpenS,
      session: session,
      token: process.env.NEXT_PUBLIC_DBTOKEN,
      collectionid: props.collectionid,
    });
  }

  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.02 }}
      className="bg-[#21212b] w-full mt-3 flex py-3 rounded-3xl justify-between items-center"
    >
      <CheckboxContainer
        color={colorsoftodo()}
        groupcolor={`${props.groupcolor}`}
        className="todo_list flex items-center "
      >
        <input
          type="checkbox"
          id={scss.todo_checkbox}
          className={`ml-4 w-6 checkbox h-6 rounded-xl c_color_pink checked:bg-[${
            props.groupcolor
          }] border-[${props.groupcolor}] ${pickTextColorBasedOnBgColorSimple(
            props.groupcolor,
            "before:border-white",
            "before:border-black"
          )}  border-4`}
          onChange={() => handleClick(props.itemid, props.subtodoid)}
          checked={isOpenS}
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
          htmlFor="todo_checkbox"
          data-content={props.itemcontent}
          onClick={() => handleClick(props.itemid, props.subtodoid)}
        >
          <div className="flex ml-4 flex-col justify-center items-start cursor-pointer">
            <h4
              className={`${
                isOpenS ? "text-gray-400" : "text-[#e0e0e0]"
              } font-normal text-[15px] whitespace-pre-wrap`}
              style={{
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {props.itemcontent}
            </h4>
            {/* <div className="flex justify-start items-center">
            <i className={`bx bx-calendar-alt mr-1 ${props.color} text-md`}></i>
            <h5 className={`${props.color} font-light text-sm`}>
              {messageusingdaysremaining()}
            </h5>
          </div> */}
          </div>
        </label>
      </CheckboxContainer>
      <button onClick={() => removeSubTodo()}>
        <i className="bx bx-trash text-gray-400 hover:text-red-600/80 mr-6 ml-3 text-xl"></i>
      </button>
    </motion.div>
  );
}

export default SubToDoItem;
