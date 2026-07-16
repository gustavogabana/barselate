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

const quote = document.getElementById("quote");

const phrases = [
    "Os limites da minha linguagem significam os limites do meu mundo.",
    "The limits of my language mean the limits of my world."
];

let current = 0;

async function morph(from, to) {
    const max = Math.max(from.length, to.length);
    for (let i = 0;i <= max; i++) {
        quote.textContent = to.slice(0,i) + from.slice(i);
        await new Promise(r => setTimeout(r, 28));
    }

}

async function rotate() {
    while (true) {
        await new Promise(r => setTimeout(r, 3000));
        const next = (current + 1) % phrases.length;
        await morph(phrases[current], phrases[next]);
        current = next;
    }
}

rotate();