// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme");

  const newTheme = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};



let setHighlight = (theme) => {
  if (theme == "dark") {
    document.getElementById("highlight_theme_light").media = "none";
    document.getElementById("highlight_theme_dark").media = "";
  } else {
    document.getElementById("highlight_theme_dark").media = "none";
    document.getElementById("highlight_theme_light").media = "";
  }
}


let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500)
}
  
let initTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  const theme = (savedTheme === "dark" || savedTheme === "light")
    ? savedTheme
    : "dark";   // 👈 default is now DARK

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

initTheme();
