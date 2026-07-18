const button = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark") {
    document.documentElement.classList.add("dark");
    button.textContent = "light";
}

button.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    button.textContent = isDark ? "light" : "dark";
    localStorage.setItem("theme", isDark ? "dark" : "light");

});