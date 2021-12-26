import styled from "styled-components";

export const SidebardContainer = styled.div`
  #sidebar {
    z-index: 11;
    position: fixed;
    /* margin-top: 90px; */
    float: left;
    background-color: #21212b;
    height: 100%;
    width: 110px;
    box-shadow: 8px 0px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease;
    will-change: contents;
  }
  #sidebar.active {
    width: 280px;
    overflow-y: auto !important;
  }
  #sidebar::-webkit-scrollbar {
    width: 0 !important;
  }
  #sidebar.active .links_name {
    /* display: inline; */
    opacity: 1;
  }
  #sidebar h4 {
    color: #c7c7ca;
    font-size: 17px;
    margin-left: 32px;
    margin-top: 0px;
    font-family: "Inter";
    font-weight: 500;
    opacity: 0;
    transition: all 0.2s ease;
    will-change: contents;
  }
  #sidebar.active h4 {
    opacity: 1;
    margin-top: 30px;
    transition: all 0.2s ease;
  }

  .item:hover .links_name {
    /* color: #21212b; */
    transition: all 0.2s ease;
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
    transition: all 0.2s ease;
    will-change: contents;
  }
  #sidebar.active .nav_list {
    margin-top: 20px;
    transition: all 0.2s ease;
  }
  .item + .item {
    margin-top: 5px;
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
  .menu-icon {
    font-size: 22px;
    color: white;
  }
  #sidebar ul li:hover .icon-holder {
    /* background-color: #883c54; */
    transition: all 0.2s ease;
  }
  .links_name {
    margin-left: 16px;
    font-family: "Inter";
    color: #ededed;
    font-weight: 500;
    font-size: 16px;
    opacity: 0;
    /* display: none; */
    /* text-align: center; */
    transition: all 0.06s ease;
  }
  .item .clickable {
    margin-left: 33px;
    white-space: nowrap;
  }

  .item {
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    position: relative;
    max-height: 40.75px;
  }
  .tooltip {
    position: absolute;
    left: 122px;
    top: 0;
    transform: translateY(-50%);
    border-radius: 6px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 122px;
    font-family: "Inter";
    font-weight: 550;
    background: #21212b;
    color: white;
    /* line-height: 35px; */
    text-align: center;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
    transition: 0s;
    opacity: 0;
    pointer-events: none;
  }
  #sidebar.active .tooltip {
    display: none;
  }
  li:hover .tooltip {
    transition: all 0.5s ease;
    opacity: 1;
    top: 50%;
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
  .clickable {
    display: flex;
    align-items: center;
  }
  .item:hover {
    background-color: #272732;
    border-radius: 10px;
    transition: all 0.2s ease;
  }
  @media only screen and (max-width: 750px) {
    #sidebar {
      z-index: 4 !important;
      width: 0px;
    }
    #sidebar.active {
      z-index: 11 !important;
    }
    .icon-holder {
      z-index: 1;
      /* transition: all 0s ease; */
    }
    .icon-holder .androidsidebaricon {
      font-size: 10px;
    }
    #sidebar.active .icon-holder .sidebaricon {
      font-size: 22px;
    }
    .nav_list {
      opacity: 0;
      transition: all 0.2s ease;
    }
    #sidebar.active .nav_list {
      opacity: 1;
      transition: all 0.2s ease;
    }
    .links_name {
      z-index: 4;
    }
    #sidebar.active .links_name {
      z-index: 11;
      width: auto;
      margin-left: 16px;
      font-size: 16px;
    }
    #sidebar.active .icon-holder {
      z-index: 11;
      min-width: 40.75px;
      min-height: 38px;
      /* transition: all 0 ease; */
    }
    .tooltip {
      display: none;
    }
  }
`;
