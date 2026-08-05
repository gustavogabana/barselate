const button = document.getElementById("theme-toggle");
button.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const dark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
});