document.addEventListener('DOMContentLoaded', function () {
    const mode_toggle = document.getElementById("light-toggle");

    mode_toggle.addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-theme");

        const next = current === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });
});
