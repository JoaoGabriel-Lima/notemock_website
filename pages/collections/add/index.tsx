/* eslint-disable no-unused-vars */
import type { NextPage } from "next";
import { HomeCointainer } from "../../../styles/components/home/home";
import Layout from "../../../components/Layout";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const AddCollection: NextPage = ({ content }: any) => {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectoption = (option: number, value: string) => {
    switch (option) {
      case 1:
        setColor(value);
        break;
      case 2:
        setName(value);
        break;
      case 3:
        setIcon(value);
        break;
    }
  };

  const addCollection = async () => {
    setError(false);
    setIsLoading(true);
    if (!color || !name || !icon) {
      setError(true);
      setIsLoading(false);
      return;
    }
    try {
      const data = await axios.post("/api/addcollection", {
        session: session,
        groupname: name,
        groupcolor: color,
        groupicon: icon,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      });

      setIsLoading(false);
      console.log(data.data);
      if (data.data.status == "Collection Added") {
        console.log(data.data.collection.groupid);
        router.push(`/collections/${data.data.collection.groupid}`);
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
          <div className="page_overview flex w-full justify-between items-start mb-10">
            <div className="flex items-center justify-start ">
              <div
                className="w-11 h-11 rounded-2xl bg-[#21212b] mr-4 flex items-center justify-center cursor-pointer"
                onClick={() => router.back()}
              >
                <i className="bx bx-chevron-left text-white text-3xl"></i>
              </div>
              <h4 className="text-white font-semibold tracking-wide text-xl">
                Add a collection
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
              className="flex flex-col justify-start items-start h-auto w-full mb-7"
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
                className="w-full flex justify-between items-center"
              >
                <div className="w-full flex justify-start items-center h-6 overflow-hidden flex-wrap space-x-4 overflow-x-auto">
                  <CollectionColor
                    colorvalue="#fbe114"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#4ceece"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#13d3fb"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#b6adff"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#fc1467"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#f4815e"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#158cf9"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                  <CollectionColor
                    colorvalue="#a948bf"
                    selectedcolor={color}
                    selectoption={selectoption}
                  />
                </div>
                <button
                  id="addcolor"
                  className="ml-4 bg-[#3e3e51] w-[23px] h-[23px] min-w-[23px] flex items-center justify-center rounded-full cursor-pointer"
                >
                  <i className="ml-[1px] mt-[1px] bx bx-plus text-sm text-white"></i>
                </button>
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
                type="text"
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Compras da semana"
                className={`mt-5 w-full h-[3.45rem] bg-transparent rounded-2xl border-[3px] ${
                  error ? "border-red-500/70" : "border-[#21212b]"
                } pl-3 box-box placeholder:text-gray-500 text-gray-400 placeholder:font-medium font-medium`}
              ></input>
              <div
                id="IconSection"
                className="flex flex-col justify-start items-start h-auto w-full pt-5"
              >
                <h4
                  className={`${
                    error ? "text-red-500/60" : "text-gray-100/[.5]"
                  }  font-normal text-sm tracking-wide mb-5`}
                >
                  Collection icon
                </h4>
                <div className="flex justify-start items-start w-full box-box min-h-24 pb-2 space-x-8 overflow-x-auto">
                  <CollectionIcon
                    iconname="shopping-bag"
                    icontitle="Shopping Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                  <CollectionIcon
                    iconname="paper-plane"
                    icontitle="Travel Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                  <CollectionIcon
                    iconname="bowl-hot"
                    icontitle="Food Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                  <CollectionIcon
                    iconname="group"
                    icontitle="Group Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                  <CollectionIcon
                    iconname="world"
                    icontitle="General Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                  <CollectionIcon
                    iconname="heart"
                    icontitle="Love Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                  <CollectionIcon
                    iconname="code-alt"
                    icontitle="Code Icon"
                    selectedicon={icon}
                    selectoption={selectoption}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="w-full flex items-center justify-center mt-10">
            <button
              onClick={() => addCollection()}
              className="text-white w-full flex justify-center items-center h-14 rounded-3xl bg-[#2c2c3a]"
            >
              {isLoading ? (
                <i className="bx bx-loader-alt text-white text-2xl animate-spin"></i>
              ) : (
                <span>Add Collection</span>
              )}
            </button>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default AddCollection;

interface CollectionIconProps {
  iconname: string;
  icontitle: string;
  selectedicon: string;
  selectoption: (option: number, icon: string) => void;
}

const CollectionIcon = ({
  iconname,
  icontitle,
  selectedicon,
  selectoption,
}: CollectionIconProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => selectoption(3, iconname)}
        className={`flex justify-center items-center box-box px-6 py-3 rounded-lg bg-[#21212b] ${
          selectedicon == iconname && "border-white border-2 "
        }`}
      >
        <i className={`bx bx-${iconname} text-white text-2xl`}></i>
      </button>
      <h4 className="text-white/80 text-xs mt-2 text-center">{icontitle}</h4>
    </div>
  );
};

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
      onClick={() => selectoption(1, colorvalue)}
      className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent w-5 h-5 rounded-full cursor-pointer"
      style={{ backgroundColor: colorvalue }}
    />
  );
};
