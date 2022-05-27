/* eslint-disable require-jsdoc */
import { motion } from "framer-motion";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
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

export default function Collection(props: any) {
  const router = useRouter();
  function hexToRgb(hex: string) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return r + "," + g + "," + b;
  }
  function goToCollection(id: string) {
    router.push(`/collections/${id}`);
  }
  const isComplete = props.groupprogress === props.groupmax;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      className="cursor-pointer bg-[#21212b] hover:bg-[#1d1d26] rounded-3xl flex flex-col justify-between p-6"
      onClick={() => goToCollection(props.groupid)}
    >
      <div className="collectionTop">
        <div className="Icon flex">
          <div
            className={`min-w-[50.75px] h-[48px] w-[50.75px] rounded-xl flex justify-center items-center`}
            style={{ backgroundColor: props.groupcolor }}
          >
            <i
              className={`bx bx-${props.groupicon} text-white text-[28px]`}
              style={{
                color: pickTextColorBasedOnBgColorSimple(
                  props.groupcolor,
                  "white",
                  "black"
                ),
              }}
            ></i>
          </div>
        </div>
      </div>
      <div className="collectionBottom flex flex-col ">
        <div className="collectionName mb-2">
          <h3 className="text-xl font-medium text-white text-ellipsis overflow-hidden nametodoh4">
            {props.groupnane}
          </h3>
        </div>
        <div className="CollectionProgress flex justify-between items-center">
          {isComplete ? (
            <>
              <h4 className="text-gray-400 font-medium text-sm">{`All ${props.groupprogress} done!`}</h4>
              <div className=" w-6 h-6">
                <div
                  className=" rounded-full w-full h-full flex items-center justify-center"
                  style={{
                    backgroundColor: props.groupcolor,
                    outline: `3px solid rgba(${hexToRgb(
                      props.groupcolor.substr(1, props.groupcolor.lenght)
                    )}, 0.5)`,
                  }}
                >
                  <i
                    className="bx bx-check"
                    style={{
                      color: pickTextColorBasedOnBgColorSimple(
                        props.groupcolor,
                        "white",
                        "black"
                      ),
                    }}
                  ></i>
                </div>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-gray-400 font-medium text-sm">{`${props.groupprogress}/${props.groupmax} done`}</h4>
              <div className=" w-6 h-6">
                <CircularProgressbar
                  value={props.groupprogress}
                  maxValue={props.groupmax}
                  strokeWidth={18}
                  styles={buildStyles({
                    pathColor: props.groupcolor,
                    trailColor: "#32323F",
                  })}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
