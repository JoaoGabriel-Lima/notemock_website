import React from "react";
import CollectionItem from "./Sidebar/SidebarItem";
import { useSession } from "next-auth/react";
/** This is a description of the foo function.
 * @param {string} - This is a description of the foo parameter.
 * @return {string} This is a description of what the function returns.
 */
function Sidebar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <section
        id="sidebar"
        className={` overflow-y-auto md:overflow-y-visible`}
      >
        <h4>Collections</h4>
        <ul className="nav_list mb-24">
          <CollectionItem
            groupname="School"
            icon="book"
            groupcolor="#e743a3"
            groupid="7164"
          />
          <CollectionItem
            groupname="Games"
            icon="dizzy"
            groupcolor="#e7bb43"
            groupid="7165"
          />
          <CollectionItem
            groupname="Code"
            icon="code-alt"
            groupcolor="#e64f4f"
            groupid="7166"
          />
          <CollectionItem
            groupname="Encomendas"
            icon="package"
            groupcolor="#4f8cd1"
            groupid="7167"
          />
          <CollectionItem
            groupname="Travels"
            icon="world"
            groupcolor="#44a15c"
            groupid="7168"
          />
          <CollectionItem
            groupname="Payments"
            icon="qr"
            groupcolor="#dca735"
            groupid="7169"
          />
        </ul>
      </section>
    );
  } else {
    return (
      <section
        id="sidebar"
        className={` overflow-y-auto md:overflow-y-visible`}
      >
        <h4>Collections</h4>
        <ul className="nav_list mb-24"></ul>
      </section>
    );
  }
}

export default Sidebar;
