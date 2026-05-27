// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = () => {
  let current = document.documentElement.getAttribute('data-theme');

  let newTheme = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};


let setTheme = (theme) =>  {
  transTheme();
  setHighlight(theme);

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
  else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
  
  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== 'undefined') {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for trasparency.
    })
  }
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


let initTheme = (theme) => {
  // only set default if nothing stored
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    theme = savedTheme;
  } else {
    theme = 'light'; // default only once
    localStorage.setItem('theme', theme);
  }

  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};
  
  setTheme(theme);
}


initTheme(localStorage.getItem("theme"));
