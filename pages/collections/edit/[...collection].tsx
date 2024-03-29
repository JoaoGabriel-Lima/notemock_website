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
import CustomIconsComponent from "../../../components/Collections/icons";

const EditCollection: NextPage = ({ content }: any) => {
  const router = useRouter();
  const [color, setColor] = useState(content.collection.groupcolor);
  const customvalue =
    typeof window !== "undefined" ? localStorage.getItem("customcolor") : null;
  const [customcolor, setCustomColor] = useState(
    content.collection.groupcolor || "#ffffff"
  );
  const [toggleCustom, setToggleCustom] = useState(false);
  const [name, setName] = useState(content.collection.groupname);
  const [icon, setIcon] = useState(content.collection.groupicon);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggleCustom(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const selectoption = (option: number, value: string) => {
    switch (option) {
      case 1:
        setColor(value);
        setCustomColor(value);
        break;
      case 2:
        setName(value);
        break;
      case 3:
        setIcon(value);
        break;
    }
  };

  const updateCollection = async () => {
    setError(false);
    setIsLoading(true);
    if (!color || !name || !icon || name.trim() === "") {
      setError(true);
      setIsLoading(false);
      return;
    }
    try {
      const data = await axios.post("/api/collection/update", {
        session: session,
        groupname: name,
        groupcolor: color,
        groupicon: icon,
        collectionid: content.collection.groupid,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      });

      setIsLoading(false);
      console.log(data.data);
      if (data.data.status == "Collection Updated") {
        console.log(content.collection.groupid);
        router.push(`/collections/${content.collection.groupid}`);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

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
      <HomeCointainer className="body ">
        <Layout>
          <div className=" page_overview flex w-full justify-between items-start mb-10">
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
                Edit "{content.collection.groupname}"
              </h4>
            </div>
          </div>
          {error && (
            <div className=" w-full bg-red-500/80 py-3 rounded-lg">
              <h5 className="text-white ml-5">Please fill out all fields</h5>
            </div>
          )}
          <div className="mt-4 flex flex-col justify-start w-full h-auto items-start divide-y  divide-slate-700/[.4]">
            <section
              id="colorsSection"
              className="flex flex-col justify-start items-start h-auto w-full mb-4"
            >
              <h4
                className={`${
                  error ? "text-red-500/60" : "text-gray-100/[.5]"
                }  font-medium text-sm tracking-wide mb-5`}
              >
                Collection Color
              </h4>
              <div
                id="colors"
                className="w-full flex justify-between items-start"
              >
                <div className="w-full flex pb-4 justify-start items-center h-6 overflow-x-auto gap-x-4">
                  <CollectionColor
                    colorvalue="#fc1467"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#dd3b3b"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#f4815e"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#e7bb43"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#3fa755"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#28a3a1"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#14abc9"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#158cf9"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#816fd3"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#9b62b5"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                </div>
                <div className="relative">
                  <AnimatePresence>
                    {toggleCustom && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ originX: 1, originY: 0 }}
                        ref={wrapperRef}
                        className="absolute right-[0px] top-8"
                      >
                        <HexColorPicker
                          color={customcolor}
                          onChange={(e) => {
                            setColor(e.toString());
                            setCustomColor(e.toString());
                            localStorage.setItem("customcolor", e.toString());
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    id="addcolor"
                    className="ml-4 checked:border-white border-2 min-w-[1.25rem] border-transparent w-5 h-5 flex items-center justify-center rounded-full cursor-pointer"
                    onClick={() => {
                      setToggleCustom(!toggleCustom);
                      setColor(customcolor);
                    }}
                    style={{
                      backgroundColor:
                        customcolor != "" && customcolor == color
                          ? customcolor
                          : "#3e3e51",
                      borderColor:
                        customcolor == color ? "white" : "transparent",
                    }}
                  >
                    {customcolor == "" ||
                      (customcolor != color && (
                        <img
                          src="/rainbow.gif"
                          className="w-full h-full rounded-full opacity-40"
                        ></img>
                      ))}
                    <i className="absolute ml-[1px] mt-[1px] bx bx-plus text-md text-white "></i>
                  </button>
                </div>
              </div>
            </section>
            <section
              id="NameSection"
              className="flex flex-col justify-start items-start h-auto w-full pt-5 mb-5"
            >
              <h4
                className={`${
                  error ? "text-red-500/60" : "text-gray-100/[.5]"
                }  font-normal text-sm tracking-wide`}
              >
                Collection Name
              </h4>
              <input
                maxLength={33}
                max={33}
                type="text"
                disabled={isLoading}
                value={name}
                onChange={(e) =>
                  e.target.value.length <= 33 && setName(e.target.value)
                }
                placeholder="Ex: Compras da semana"
                className={`mt-5 w-full h-[3.45rem] bg-transparent rounded-2xl border-[3px] ${
                  error ? "border-red-500/70" : "border-[#21212b]"
                } px-3 box-box placeholder:text-gray-500 text-gray-400 placeholder:font-medium font-medium`}
              ></input>
              <div
                id="IconSection"
                className="flex flex-col justify-start items-start h-auto w-full pt-5"
              >
                <h4
                  className={`${
                    error ? "text-red-500/60" : "text-gray-100/[.5]"
                  }  font-normal text-sm tracking-wide mb-5 `}
                >
                  Collection icon
                </h4>
                <div className="custom_scrollbar flex justify-start items-start w-full box-box min-h-24 pb-2 space-x-7 overflow-x-auto">
                  <CustomIconsComponent
                    icon={icon}
                    selectoption={selectoption}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="w-full flex items-center justify-center mt-10 gap-x-2">
            <button
              onClick={() =>
                router.push(`/collections/remove/${content.collection.groupid}`)
              }
              className="text-white w-full flex justify-center items-center min-h-[3.5rem] rounded-3xl bg-red-600/80"
            >
              <span className="px-3 text-center">Remove Collection</span>
            </button>
            <button
              onClick={() => updateCollection()}
              className="text-white w-full flex justify-center items-center min-h-[3.5rem] rounded-3xl bg-[#2c2c3a]"
            >
              {isLoading ? (
                <i className="bx bx-loader-alt text-white text-2xl animate-spin"></i>
              ) : (
                <span className="px-3 text-center">Update Collection</span>
              )}
            </button>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default EditCollection;

interface CollectionColorProps {
  colorvalue: string;
  selectedcolor: string;
  selectoption: (option: number, color: string) => void;
}

const CollectionColor = ({
  colorvalue,
  selectedcolor,
  selectoption,
}: CollectionColorProps) => {
  return (
    <input
      type="radio"
      id={colorvalue}
      readOnly
      checked={selectedcolor === colorvalue}
      onClick={() => {
        selectoption(1, colorvalue);
      }}
      className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent w-5 h-5 rounded-full cursor-pointer"
      style={{ backgroundColor: colorvalue }}
    />
  );
};

export async function getServerSideProps(context: any) {
  const { collection } = context.query;
  const collection2 = collection[0];
  const session = await getSession(context);
  const res = await axios.post(
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
  const content = res.data;
  if (content.collection === null) {
    return {
      notFound: true,
    };
  }
  return { props: { content } };
}
