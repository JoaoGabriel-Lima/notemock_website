import React, { useEffect, useLayoutEffect } from "react";
/** This is a description of the foo function.
 * @param {string} - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function Sidebar() {
  const canUseDOM = typeof window !== "undefined";
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const sidebar: any = document.getElementById("sidebar");
      if (screen.width > 750) {
        if (localStorage.getItem("opened") == null) {
        } else {
          if (localStorage.getItem("opened") == "true") {
            sidebar.classList.add("active");
          } else {
            sidebar.classList.remove("active");
          }
        }
      }
    }
  }, []);
  return (
    <section id="sidebar">
      <h4>Collections</h4>
      <ul className="nav_list">
        <li className="item_1 item">
          <div className="clickable">
            <div className="icon-holder">
              <i className="bx bx-book-bookmark menu-icon sidebaricon"></i>
            </div>
            <span className="links_name">School</span>
          </div>
          <span className="tooltip">School</span>
        </li>
        <li className="item_2 item">
          <div className="clickable">
            <div className="icon-holder">
              <i className="bx bx-user menu-icon sidebaricon"></i>
            </div>
            <span className="links_name">Personal</span>
          </div>
          <span className="tooltip">Personal</span>
        </li>
        <li className="item_3 item">
          <div className="clickable">
            <div className="icon-holder">
              <i className="bx bx-columns menu-icon sidebaricon"></i>
            </div>
            <span className="links_name">Design</span>
          </div>
          <span className="tooltip">Design</span>
        </li>
        <li className="item_4 item">
          <div className="clickable">
            <div className="icon-holder">
              <i className="bx bx-group menu-icon sidebaricon"></i>
            </div>
            <span className="links_name">Groups</span>
          </div>
          <span className="tooltip">Groups</span>
        </li>
        <li className="item_5 item">
          <div className="clickable">
            <div className="icon-holder">
              <i className="bx bx-code-alt menu-icon sidebaricon"></i>
            </div>
            <span className="links_name">Code</span>
          </div>
          <span className="tooltip">Code</span>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
