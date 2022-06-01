/* eslint-disable no-unused-vars */
import type { NextPage } from "next";
import { HomeCointainer } from "../../../styles/components/home/home";
import Layout from "../../../components/Layout";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
const RemoveCollection: NextPage = ({ content }: any) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [checktext, setChecktext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const removeCollection = async () => {
    setError(false);
    setIsLoading(true);

    try {
      const data = await axios.post("/api/collection/remove", {
        session: session,
        collectionid: content.collection.groupid,
        token: process.env.NEXT_PUBLIC_DBTOKEN,
      });
      setIsLoading(false);
      if (data.data.status == "Collection Removed") {
        localStorage.removeItem(content.collection.groupid);
        const localdata = `collectionStatus`;
        if (
          localStorage.getItem(localdata) != null ||
          localStorage.getItem(localdata) != undefined
        ) {
          const lsData: any = localStorage.getItem(localdata);
          const lsDataJson = JSON.parse(lsData);
          const itemidvalue = `${content.collection.groupid}`;

          delete lsDataJson[itemidvalue];
          localStorage.setItem(localdata, JSON.stringify(lsDataJson));
        }
        router.push(`/`);
      } else {
        setError(true);
        setIsLoading(false);
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
          <div className=" page_overview flex w-full justify-between items-start mb-7">
            <div className="flex items-center justify-start w-full">
              <div
                className="w-11 min-w-[2.75rem] h-11 rounded-2xl bg-[#21212b] mr-4 flex items-center justify-center cursor-pointer"
                onClick={() => router.back()}
              >
                <i className="bx bx-chevron-left text-white text-3xl"></i>
              </div>
              <h4 className="text-white text-ellipsis font-semibold overflow-hidden tracking-wide text-xl">
                Remove Collection
              </h4>
            </div>
          </div>
          {error && (
            <div className=" w-full bg-red-500/80 py-3 rounded-lg mb-4">
              <h5 className="text-white ml-5">An error has occurred</h5>
            </div>
          )}
          <section className="w-full h-20 rounded-2xl bg-[#272732] mb-4 flex items-center">
            <div
              className=" ml-5 mr-4 flex rounded-[9px] items-center justify-center h-[38px] w-[40.75px] min-w-[40.75px]"
              style={{ backgroundColor: content.collection.groupcolor }}
            >
              <i
                className={`bx bx-${content.collection.groupicon}  text-2xl`}
                style={{
                  color: pickTextColorBasedOnBgColorSimple(
                    content.collection.groupcolor,
                    "white",
                    "black"
                  ),
                }}
              ></i>
            </div>
            <h4 className="text-white mr-5 font-medium text-lg nametodoh4 text-ellipsis overflow-hidden  w-full">
              {content.collection.groupname}
            </h4>
          </section>
          <section className="flex w-full flex-col">
            <div className="flex w-full flex-col justify-start items-start">
              <p className="text-white/90 text-justify">
                Deleting a collection will remove all content related to it.
                Like{" "}
                {content.collection.todos.length > 1 ? (
                  <span
                    className="font-medium"
                    style={{
                      color: pickTextColorBasedOnBgColorSimple(
                        content.collection.groupcolor,
                        content.collection.groupcolor,
                        "white"
                      ),
                    }}
                  >
                    your {content.collection.todos.length} to-dos
                  </span>
                ) : (
                  <span>to-dos</span>
                )}{" "}
                and sub-to-dos. Be sure what you are doing before removing "
                <span
                  className="font-medium "
                  style={{
                    color: pickTextColorBasedOnBgColorSimple(
                      content.collection.groupcolor,
                      content.collection.groupcolor,
                      "white"
                    ),
                  }}
                >
                  {content.collection.groupname.length > 14
                    ? content.collection.groupname.substring(0, 14) + "..."
                    : content.collection.groupname}
                </span>
                " Collection.
              </p>
              <p className="text-white/80 text-justify mt-5 text-sm">
                For security reasons, type "
                <span className="font-bold text-slate-100">
                  {content.collection.groupid}
                </span>
                " to confirm this action:
              </p>
              <input
                maxLength={33}
                type="text"
                disabled={isLoading}
                onChange={(e) =>
                  setChecktext(e.target.value === content.collection.groupid)
                }
                placeholder={`Type "${content.collection.groupid}" to confirm removal`}
                className={`mt-3 w-full h-[3.45rem] bg-transparent rounded-2xl border-[3px] ${
                  error ? "border-red-500/70" : "border-[#21212b]"
                } px-3 box-box placeholder:text-gray-500 text-gray-400 placeholder:font-medium font-medium`}
              ></input>
            </div>
          </section>

          <div className="w-full flex items-center justify-center mt-3">
            <button
              onClick={() => removeCollection()}
              disabled={isLoading || !checktext}
              className={`text-white w-full flex justify-center items-center min-h-[3.5rem] rounded-3xl ${
                checktext ? "bg-red-500/80" : "bg-red-500/50 text-white/50"
              }`}
            >
              {isLoading ? (
                <i className="bx bx-loader-alt text-white text-2xl animate-spin"></i>
              ) : (
                <span className="text-center px-5 py-3">
                  Remove Collection. This action cannot be undone
                </span>
              )}
            </button>
          </div>
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default RemoveCollection;

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
