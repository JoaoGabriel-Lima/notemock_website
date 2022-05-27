import React from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
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
function ToDo(props: any) {
  const router = useRouter();
  const iconholder = classnames(
    "icon-holder mr-4 ml-5",
    `bg-${props.groupcolor}`
  );
  function goToCollection(id: string) {
    router.push(`/collections/${id}`);
  }
  return (
    <motion.div
      id="todo"
      className="todonotation flex flex-col w-full todo-bg rounded-2xl"
    >
      <AnimatePresence>
        <motion.details open>
          <summary>
            <div className="todo-header w-full todo-bg-header h-20 flex justify-between items-center rounded-2xl ">
              <div className="flex items-center ">
                <div
                  className={iconholder}
                  style={{ backgroundColor: props.groupcolor }}
                >
                  <i
                    className={`bx bx-${props.iconname} menu-icon `}
                    style={{
                      color: pickTextColorBasedOnBgColorSimple(
                        props.groupcolor,
                        "white",
                        "black"
                      ),
                    }}
                  ></i>
                </div>
                <h4 className="text-white font-medium text-lg">
                  {props.groupname}
                </h4>
              </div>
              <div className="flex mr-5">
                <i className="bx bx-chevron-down text-gray-400 text-2xl"></i>
                <i className="bx bx-chevron-up text-gray-400 text-2xl"></i>
              </div>
            </div>
          </summary>

          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="todo_content mt-6"
          >
            <div className="todos_area ml-5 mr-5 flex-col items-center">
              {props.children}
            </div>

            <button
              onClick={() => goToCollection(props.groupid)}
              className="flex w-full h-16 justify-center items-center border-t-2  rounded-b-2xl hover:bg-[#1C1C25] border-gray-700/[.25]"
            >
              <h2 className="text-white font-semibold ">Go to Collection</h2>
              <i className="bx bx-right-arrow-alt text-white text-2xl ml-2"></i>
            </button>
          </motion.div>
        </motion.details>
      </AnimatePresence>
    </motion.div>
  );
}
export default ToDo;
