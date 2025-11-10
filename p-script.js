const body = document.body;
const themeToggleBtn = document.getElementById(
  "sideBtn__mid"
);
const THEMES = ["light", "dark"];

function applyTheme(mode) {
  THEMES.forEach((t) =>
    body.classList.remove(`theme-${t}`)
  );
  body.classList.add(`theme-${mode}`);

  localStorage.setItem("theme", mode);

  const n1 = document.getElementById("n1");
  const n2 = document.getElementById("n2");
  const n3 = document.getElementById("n3");

  if (n1)
    n1.src = `./asset/${
      mode === "dark" ? "d" : "l"
    }-plane-needle.png`;
  if (n2)
    n2.src = `./asset/${
      mode === "dark" ? "d" : "l"
    }-solid-needle.png`;
  if (n3)
    n3.src = `./asset/${
      mode === "dark" ? "d" : "l"
    }-plane-needle.png`;

  const cmps = document.querySelectorAll(
    ".s1__cmps__cmp"
  );
  cmps.forEach((cmp, index) => {
    const bg = cmp.querySelector(".bg");
    if (!bg) return;
    bg.src = `./asset/${
      mode === "dark" ? "d" : "l"
    }-${index === 1 ? "solid" : "plane"}.png`;
  });
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const initialTheme =
  savedTheme && THEMES.includes(savedTheme)
    ? savedTheme
    : prefersDark
    ? "dark"
    : "light";

applyTheme(initialTheme);

themeToggleBtn?.addEventListener("click", () => {
  const currentTheme = body.classList.contains(
    "theme-dark"
  )
    ? "dark"
    : "light";
  const nextTheme =
    currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

//sidebtn
function toggleNav() {
  const btn = document.getElementById(
    "sideBtn__top"
  );
  const isOpen =
    document.body.classList.toggle("side-open");
  btn.setAttribute("aria-expanded", isOpen);
}

const btn = document.getElementById(
  "sideBtn__top"
);
btn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleNav();
  }
});

document
  .querySelectorAll(".copy")
  .forEach((copyEl) => {
    copyEl.addEventListener("click", () => {
      const text = copyEl.textContent.trim();

      navigator.clipboard
        .writeText(text)
        .then(() => {
          const existingToast =
            document.querySelector(".c__toast");
          if (existingToast)
            existingToast.remove();

          const toast =
            document.createElement("span");
          toast.classList.add("c__toast");
          toast.textContent = "copied";

          document.body.appendChild(toast);

          const rect =
            copyEl.getBoundingClientRect();
          const toastHeight = toast.offsetHeight;

          const top =
            rect.top +
            window.scrollY +
            rect.height / 2 -
            toastHeight / 2;
          const left =
            rect.right + window.scrollX + 10;

          toast.style.top = `${top}px`;
          toast.style.left = `${left}px`;
          toast.style.zIndex = "5";
          toast.style.position = "absolute";

          setTimeout(() => {
            toast.remove();
          }, 2000);
        })
        .catch((err) => {
          console.error("Copy failed:", err);
        });
    });
  });
