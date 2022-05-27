/* eslint-disable require-jsdoc */
import React from "react";
import { useRouter } from "next/router";

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
  const isloading = props.loadingbool;
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
          <i
            className={`bx bx-${props.icon} menu-icon sidebaricon`}
            style={{
              color: pickTextColorBasedOnBgColorSimple(
                props.groupcolor,
                "white",
                "black"
              ),
            }}
          ></i>
        </div>
        <span className="links_name">{groupname}</span>
      </div>
      {isloading ? "" : <span className="tooltip">{groupname}</span>}
    </li>
  );
}

export default CollectionItem;
