import styled from "styled-components";

export const HomeCointainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

  * {
    box-sizing: content-box;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    /* outline: none; */
  }
  *:focus {
    background-color: 0;
    /* border: 0; */
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  main {
    /* overflow-y: hidden; */
    /* overflow-y: scroll !important; */
    /* overflow-x: hidden; */
    /* width: 100vw; */
    height: 100vh;
    background-color: #181820;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  button,
  p {
    font-family: "Inter", sans-serif;
  }
  #main-content {
    margin-top: 90px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .bg-color {
    background-color: #21212b;
  }

  .nav-menu-btn {
    color: white;
    background-color: white;
  }
  .menuicon {
    font-size: 37px;
    margin-left: 35px;
  }
  details summary {
    cursor: pointer;
  }

  .menu-icon {
    font-size: 22px;
    color: white;
  }

  #btn {
    cursor: pointer;
  }
  .item_1 .icon-holder {
    background-color: #fc76a1;
  }
  .item_2 .icon-holder {
    background-color: #70c4bf;
  }
  .item_3 .icon-holder {
    background-color: #a86ad9;
  }
  .item_4 .icon-holder {
    background-color: #eebe61;
  }
  .item_5 .icon-holder {
    background-color: #ee8b61;
  }
  .codeicon {
    background-color: #ee8b61;
  }
  .todo-bg {
    background-color: #21212b;
  }
  .todo-bg-header {
    background-color: #272732;
  }

  #notes_section {
    background-color: #181820;
    overflow-y: auto;
    position: relative;
    margin-left: auto;
    right: 0;
    width: calc(100% - 110px);
    /* height: calc(100vh - 80px); */
    transition: all 0.5s ease;
  }
  #dashboard-page-content {
    /* height: 1050px; */
    /* overflow-y: hidden; */
  }
  #notes_section.active {
    width: calc(100% - 280px);
    transition: all 0.5s ease;
  }
  .checkbox {
    min-width: 1.5rem;
    min-height: 1.5rem;
  }
  details summary::marker {
    display: none;
  }
  summary {
    list-style: none;
  }
  input {
    border-radius: 30px;
    background-color: #21212b;
    /* display: none; */
  }
  input.checkbox {
    z-index: 5;
    width: 1.3em;
    height: 1.3em;
    background-color: 0;
    border-radius: 4px;
    vertical-align: middle;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    border-color: #ee8b61;
    border-width: 4px;
    border-radius: 0.75rem;
  }

  input.checkbox:checked {
    background-color: #ee8b61;
  }

  input.c_color_orange {
    border-color: #ee8b61;
  }
  input.c_color_orange:checked {
    background-color: #ee8b61;
  }
  input.c_color_pink {
    border-color: #fc76a1;
  }
  input.c_color_pink:checked {
    background-color: #fc76a1;
  }
  details[open] summary ~ * {
    animation: sweep 0.5s ease-in-out;
  }
  details[close] summary ~ * {
    animation: sweepclose 0.5s ease-in-out;
  }
  @keyframes sweepclose {
    100% {
      opacity: 0;
      transform: translateX(-10px);
    }
    0% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes sweep {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  details[open] .bx-chevron-down {
    display: none;
  }
  details[open] .bx-chevron-up {
    display: block;
  }
  details:not([open]) .bx-chevron-down {
    display: block;
  }
  details:not([open]) .bx-chevron-up {
    display: none;
  }

  .android {
    display: none;
  }

  .todonotation + .todonotation {
    margin-top: 25px;
  }
  .icon-holder {
    min-width: 40.75px;
    height: 38px;
    width: 40.75px;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .textmenucolor {
    color: #e64f4f;
  }
  .bgmenucolor {
    background-color: #444458;
  }
  @media only screen and (max-width: 750px) {
    .body {
      /* overflow-y: auto; */
    }
    .android {
      display: block;
    }
    #closesidebar {
      transition: all 0.5s ease;
      /* width: calc(100vw - 280px); */
      width: 100vw;
      height: calc(100vh - 90px);
      position: fixed;
      right: 0;
      bottom: 0;
      display: none;
      z-index: 4;
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 0;
    }
    #closesidebar.active {
      transition: all 0.5s ease;
      display: block;
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 1;
    }

    .icon-holder .androidsidebaricon {
      font-size: 10px;
    }
    #notes_section.active {
      width: 100%;
    }
    #notes_section {
      width: 100%;
    }
  }
  @media only screen and (max-width: 313px) {
    .dash-margins {
      margin: 0;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  @media only screen and (max-width: 364px) {
    .topmarginneed {
      margin-top: 1rem;
    }
  }
`;
