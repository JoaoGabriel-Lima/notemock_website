/* eslint-disable require-jsdoc */
import type { NextPage } from "next";
import React from "react";
import { HomeCointainer } from "../styles/components/home/home";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ToDoItem from "../components/Todo_Item";
import ToDo from "../components/Todo";
import { useSession, signIn } from "next-auth/react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const { data: session } = useSession();
  // greet depending on the time
  const greet = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else if (hour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  return (
    <>
      <HomeCointainer className="body">
        <Layout>
          {session ? (
            <>
              <div className="page_overview flex w-full justify-between items-center">
                <h4 className="text-white font-medium text-xl">Dashboard</h4>
                <Menu as="div" className="relative inline-block">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
                      <i className="bx bx-dots-horizontal-rounded cursor-pointer text-gray-400 text-2xl"></i>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0  w-56 origin-top-right todo-bg-header divide-y divide-blue-300/[.10] ring-1 rounded-xl shadow-lg ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bgmenucolor text-white" : "text-white"
                              } group flex rounded-xl items-center w-full py-3 text-sm `}
                            >
                              <span className="ml-3">Change View Mode</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="page_treatment flex w-full flex-col justify-start items-start">
                <h2 className="text-white text-4xl mt-14 font-bold">
                  {greet()},
                  <br />
                  {session ? session.user!.name : "Not Logged In"}
                </h2>
                <div className="page-filter-options w-full flex items-center justify-start mt-14">
                  <button
                    id="daily_overview"
                    className="mr-4 pr-7 pl-7 h-12 bg-[#414052] rounded-2xl font-medium text-white text-base"
                  >
                    Daily Overview
                  </button>
                  <button
                    id="statistics"
                    className=" pr-7 pl-7 h-11 border-[#414052] border-2 rounded-2xl font-medium text-white text-base"
                  >
                    Statistic
                  </button>
                </div>
              </div>

              <section
                id="todos"
                className="flex w-full flex-col items-center mt-10 mb-10"
              >
                <ToDo
                  groupcolor="#e7ae43"
                  groupname="Games"
                  iconname="dizzy"
                  groupid="7165"
                >
                  <ToDoItem
                    groupcolor="#e7ae43"
                    itemcontent="Jogar Fortnite com o David"
                    itemtime="2021-12-26"
                    checked={false}
                  />

                  <ToDoItem
                    groupcolor="#e7ae43"
                    itemcontent="Jogar Valorant com o Camomilla"
                    itemtime="2021-12-27"
                    checked={false}
                  />

                  <ToDoItem
                    groupcolor="#e7ae43"
                    itemcontent="Noite do Just Dance"
                    itemtime="2021-12-28"
                    checked={false}
                  />
                </ToDo>
                <ToDo
                  groupcolor="#9843e7"
                  groupname="Coisas de Halloween"
                  iconname="ghost"
                >
                  <ToDoItem
                    groupcolor="#9843e7"
                    itemcontent="Ir para Minas Gerais"
                    itemtime="2022-04-02"
                    checked={false}
                  />

                  <ToDoItem
                    groupcolor="#9843e7"
                    itemcontent="Cabo Frio com o Nego e com o Bielll 🥳🪅🎉"
                    itemtime="2022-02-21"
                    checked={false}
                  />
                  <ToDoItem
                    groupcolor="#9843e7"
                    itemcontent="Assistir Homem Aranha com Julia, já tá na hora"
                    itemtime="2021-12-28"
                    checked={false}
                  />
                </ToDo>

                <ToDo groupcolor="#ee8b61" groupname="Code" iconname="code-alt">
                  <ToDoItem
                    groupcolor="#ee8b61"
                    itemcontent="Como fazer maconha com maizena e javascript 🍂"
                    itemtime="2021-12-21"
                    checked={false}
                  />

                  <ToDoItem
                    groupcolor="#ee8b61"
                    itemcontent="Procurar esse tal de java pra pedir umas dicas"
                    itemtime="2021-10-21"
                    checked={true}
                  />
                  <ToDoItem
                    groupcolor="#ee8b61"
                    itemcontent="Não tenho dinheiro para comprar açaí 😢"
                    itemtime="2021-12-22"
                    checked={false}
                  />
                </ToDo>

                <ToDo groupcolor="#fc76a1" groupname="Games" iconname="game">
                  <ToDoItem
                    groupcolor="#fc76a1"
                    itemcontent="Dormir até desmaiar"
                    itemtime="2022-01-22"
                    checked={false}
                  />

                  <ToDoItem
                    groupcolor="#fc76a1"
                    itemcontent="Matar o toriel de manhã se não programar nada 😳"
                    itemtime="2021-11-21"
                    checked={false}
                  />
                  <ToDoItem
                    groupcolor="#fc76a1"
                    itemcontent="Dormir até desmaiar"
                    itemtime="2021-12-28"
                    checked={false}
                  />
                </ToDo>
              </section>
            </>
          ) : (
            <>
              <div className="page_overview flex w-full justify-between items-center">
                <h4 className="text-white font-medium text-xl">
                  Note<span className="text-[#E95F5F]">mock</span>
                </h4>
                <Menu as="div" className="relative inline-block">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full text-sm font-medium focus:outline-none focus-visible:ring-opacity-75">
                      <i className="bx bx-dots-horizontal-rounded cursor-pointer text-gray-400 text-2xl"></i>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0  w-56 origin-top-right todo-bg-header divide-y divide-blue-300/[.10] ring-1 rounded-xl shadow-lg ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bgmenucolor text-white" : "text-white"
                              } group flex rounded-xl items-center w-full py-3 text-sm `}
                            >
                              <span className="ml-3">Change View Mode</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="flex flex-col mt-14 h-min">
                <h1 className="text-white font-bold text-4xl mb-5">
                  You are not logged in.
                </h1>
                <h4 className="text-gray-300 font-normal text-base text-justify mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </h4>
                <button
                  onClick={() => signIn()}
                  className="border-0 h-12 bg-[#414052] hover:bg-[#2c2b35] rounded-xl w-56 font-medium text-white text-base"
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </Layout>
      </HomeCointainer>
    </>
  );
};

export default Home;
