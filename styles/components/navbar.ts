import styled from "styled-components";

export const Navbarlayout = styled.nav`
  position: fixed;
  width: 100%;
  min-height: 80px;
  height: 90px;
  background-color: #21212b;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.3);
  z-index: 14;

  .nav-menu-btn {
    color: white;
    background-color: white;
  }
  .search-box {
    width: fit-content;
    height: fit-content;
    position: relative;
    min-width: 34px;
  }
  .input-search {
    height: 24px;
    width: auto;
    max-width: 0px;
    border-style: none;
    /* padding: 10px; */
    padding-top: 10px;
    padding-bottom: 10px;
    /* padding-right: 35px; */
    /* padding-bottom: 7px; */
    font-size: 14px;
    font-weight: 400;
    /* letter-spacing: 2px; */
    outline: none;
    border-radius: 25px;
    transition: all 0.5s ease-in-out;
    /* background-color: #22a6b3; */
    /* padding-right: 10px; */
    padding-left: 15px;
    font-family: "Inter";
    color: rgba(255, 255, 255, 0.9);
  }
  .input-search::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    font-family: "Inter";
    /* letter-spacing: 2px; */
    font-weight: 400;
  }
  .btn-search {
    /* width: 50px;
    height: 50px; */
    border-style: none;
    font-size: 15px;
    font-weight: bold;
    padding-right: 10px;

    outline: none;
    cursor: pointer;
    /* border-radius: 50%; */
    position: absolute;
    right: 0px;
    color: #ffffff;
    background-color: transparent;
    pointer-events: painted;
  }
  #add_todo_btn {
    border-width: 0px;
    min-width: 2.25rem;
    min-height: 2.25rem;
    margin-right: calc(1.75rem + 0px);
  }
  .bx-bell {
    margin-left: calc(1.75rem - 10px);
  }
  .btn-search:focus {
    background-color: #181820;
  }
  .btn-search ~ .input-search:focus {
    background-color: #181820;
  }
  .btn-search:focus ~ .input-search,
  .input-search:focus {
    /* width: auto; */
    max-width: 200px;
    border-radius: 10px;
    background-color: #181820;
    /* border-bottom: 0.5px solid rgba(255, 255, 255, 0.2); */
    transition: all 0.3s ease-in;
  }
  #nav-content {
    z-index: 14;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .nav_list {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    /* margin-left: 33px; */
    margin-top: 10px;
    text-decoration: none;
    list-style: none;
    opacity: 1;
    transition: all 0.3s ease;
  }
  #sidebar.active .nav_list {
    margin-top: 20px;
    transition: all 0.3s ease;
  }

  #sidebar.active .nav_list {
    opacity: 1;
    transition: all 0.2s ease;
  }

  .menuicon {
    font-size: 37px;
    margin-left: 35px;
  }

  .textmenucolor {
    color: #e75876;
  }
  .bgmenucolor {
    background-color: #e75876;
  }
  #btn {
    cursor: pointer;
  }
  @media only screen and (max-width: 875px) {
    .btn-search:focus ~ .input-search,
    .input-search:focus {
      max-width: 150px;
    }
  }
  @media only screen and (max-width: 750px) {
    .nav_list {
      opacity: 0;
      transition: all 0.2s ease;
    }
    #dashboard-button,
    #collections-button {
      display: none;
    }
    .menuicon {
      margin-left: 20px;
    }
    #btn {
      margin-right: 20px;
    }
    #add_todo_btn {
      position: fixed;
      border-width: 2px;
      z-index: 9;
      right: 0;
      bottom: 30px;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 1rem;
      box-shadow: 0px 4px 20px rgba(225, 65, 118, 0.3);
    }
    #add_todo_btn i {
      font-size: 2rem;
    }
  }
  @media only screen and (max-width: 370px) {
    .bx-bell,
    .bellmenu {
      display: none;
    }
    .search-box {
      margin-right: 1.1rem;
    }
  }
  @media only screen and (max-width: 313px) {
    .dash-margins {
      margin: 0;
      padding-left: 10px;
      padding-right: 10px;
    }
    .search-box {
      display: none;
    }
  }
`;
