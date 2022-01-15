/* eslint-disable no-unused-vars */
import type { NextPage } from "next";
import { HomeCointainer } from "../../../styles/components/home/home";
import Layout from "../../../components/Layout";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AddCollection: NextPage = ({ content }: any) => {
  const router = useRouter();
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
          <div className="mt-4 flex flex-col justify-start w-full h-auto items-start divide-y  divide-slate-700/[.4]">
            <section
              id="colorsSection"
              className="flex flex-col justify-start items-start h-auto w-full mb-7"
            >
              <h4 className="text-gray-100/[.5] font-medium text-sm tracking-wide mb-5">
                Collection Color
              </h4>
              <div
                id="colors"
                className="w-full flex justify-start items-center space-x-7 overflow-x-auto "
              >
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#fbe114] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#4ceece] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2  min-w-[1.25rem] border-transparent bg-[#13d3fb] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#b6adff] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#fc1467] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#f4815e] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#158cf9] w-5 h-5 rounded-full cursor-pointer"
                />
                <input
                  type="radio"
                  id="color"
                  name="age"
                  value="30"
                  className="appearance-none checked:border-white border-2 min-w-[1.25rem] border-transparent bg-[#a948bf] w-5 h-5 rounded-full cursor-pointer"
                />
                <button
                  id="addcolor"
                  className="bg-[#3e3e51] w-[23px] h-[23px] min-w-[23px] flex items-center justify-center rounded-full cursor-pointer"
                >
                  <i className="ml-[1px] mt-[1px] bx bx-plus text-sm text-white"></i>
                </button>
              </div>
            </section>
            <section
              id="NameSection"
              className="flex flex-col justify-start items-start h-auto w-full pt-5"
            >
              <h4 className="text-gray-100/[.5] font-normal text-sm tracking-wide">
                Collection Name
              </h4>
            </section>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default AddCollection;
