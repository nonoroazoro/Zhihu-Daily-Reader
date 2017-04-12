import "./index.less";

const elem = document.getElementById("auth-submit");
elem.removeAttribute("disabled");
document.querySelector("#login > form").addEventListener("submit", () =>
{
    elem.setAttribute("disabled", true);
}, true);
