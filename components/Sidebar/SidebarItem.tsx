/* eslint-disable require-jsdoc */
import React from "react";
import { useRouter } from "next/router";

/** This is a description of the foo function.
 * @param {string} props - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function CollectionItem(props: any) {
  const router = useRouter();
  const { collection } = router.query;
  function checkifisSelected() {
    if (collection != undefined) {
      if (collection[0] == props.groupid) {
        return "#272732";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  let groupname;
  if (props.groupname.length > 14) {
    groupname = props.groupname.substring(0, 14) + "...";
  } else {
    groupname = props.groupname;
  }
  function goToCollection(id: string) {
    router.push(`/collections/${id}`);
  }
  return (
    <li
      className="item"
      style={{ backgroundColor: checkifisSelected(), borderRadius: "10px" }}
      onClick={() => goToCollection(props.groupid)}
    >
      <div className="clickable">
        <div
          className="icon-holder"
          style={{ backgroundColor: props.groupcolor }}
        >
          <i className={`bx bx-${props.icon} menu-icon sidebaricon`}></i>
        </div>
        <span className="links_name">{groupname}</span>
      </div>
      <span className="tooltip">{groupname}</span>
    </li>
  );
}

export default CollectionItem;
