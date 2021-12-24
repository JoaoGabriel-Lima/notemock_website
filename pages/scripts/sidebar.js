/* eslint-disable require-jsdoc */
function sidebarScript() {
  if (typeof window !== "undefined") {
    const btn = document.getElementById("btn");
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("notes_section");
    const close = document.getElementById("closesidebar");
    const main = document.querySelector("main");

    if (screen.width > 750) {
      if (localStorage.getItem("opened") == null) {
      } else {
        if (localStorage.getItem("opened") == "true") {
          content.classList.add("active");
          close.classList.add("active");
          main.classList.add("active");
        } else {
          content.classList.remove("active");
          close.classList.remove("active");
          main.classList.remove("active");
        }
      }
    }

    btn.onclick = function () {
      sidebar.classList.toggle("active");
      content.classList.toggle("active");
      close.classList.toggle("active");
      main.classList.toggle("active");
      main.classList.toggle("body");

      if (sidebar.classList.contains("active")) {
        localStorage.setItem("opened", "true");
      } else {
        localStorage.setItem("opened", null);
      }
    };

    close.onclick = function () {
      sidebar.classList.toggle("active");
      content.classList.toggle("active");
      close.classList.toggle("active");
      main.classList.toggle("active");
      main.classList.toggle("body");

      if (sidebar.classList.contains("active")) {
        localStorage.setItem("opened", "true");
      } else {
        localStorage.setItem("opened", null);
      }
    };
  }
}
export default sidebarScript;
