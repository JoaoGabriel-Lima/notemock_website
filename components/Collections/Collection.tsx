/* eslint-disable require-jsdoc */
import { motion } from "framer-motion";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Collection(props: any) {
  function hexToRgb(hex: string) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return r + "," + g + "," + b;
  }
  const isComplete = props.groupprogress === props.groupmax;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      className="cursor-pointer bg-[#21212b] hover:bg-[#1d1d26] rounded-3xl flex flex-col justify-between p-6"
    >
      <div className="collectionTop">
        <div className="Icon flex">
          <div
            className={`min-w-[50.75px] h-[48px] w-[50.75px] rounded-xl flex justify-center items-center`}
            style={{ backgroundColor: props.groupcolor }}
          >
            <i
              className={`bx bx-${props.groupicon} text-white text-[28px]`}
            ></i>
          </div>
        </div>
      </div>
      <div className="collectionBottom flex flex-col ">
        <div className="collectionName mb-2">
          <h3 className="text-xl font-medium text-white">{props.groupnane}</h3>
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
                  <i className="bx bx-check text-white"></i>
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
