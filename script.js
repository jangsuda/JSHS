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

// needle
document.addEventListener("mousemove", (e) => {
  const arrows = [
    { id: "n1", offsetX: 0.5, offsetY: 0.5 },
    { id: "n2", offsetX: 0.5, offsetY: 0.3 },
    { id: "n3", offsetX: 0.5, offsetY: 0.5 },
  ];

  arrows.forEach(({ id, offsetX, offsetY }) => {
    const el = document.getElementById(id);
    if (!el) return;

    const parent = el.parentElement;
    const rect = parent.getBoundingClientRect();

    const centerX =
      rect.left + rect.width * offsetX;
    const centerY =
      rect.top + rect.height * offsetY;

    const angle =
      Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) *
      (180 / Math.PI);

    el.style.transformOrigin = `${
      offsetX * 100
    }% ${offsetY * 100}%`;

    el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  });
});

// filter
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const buttons = document.querySelectorAll(
      "#BtnContainer .btn"
    );
    const allLinks =
      document.querySelectorAll("a");

    filterSelection("all");

    function activateTab(newTab) {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute(
          "aria-selected",
          "false"
        );
        btn.setAttribute("tabindex", "-1");
      });

      newTab.classList.add("active");
      newTab.setAttribute(
        "aria-selected",
        "true"
      );
      newTab.setAttribute("tabindex", "0");
      newTab.focus();

      const category = newTab.getAttribute(
        "data-filter"
      );
      filterSelection(category);
    }

    buttons.forEach((button) => {
      button.addEventListener(
        "click",
        function () {
          activateTab(this);
        }
      );

      button.addEventListener("keydown", (e) => {
        const index =
          Array.from(buttons).indexOf(button);
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex =
            (index + 1) % buttons.length;
          activateTab(buttons[nextIndex]);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex =
            (index - 1 + buttons.length) %
            buttons.length;
          activateTab(buttons[prevIndex]);
        }
      });
    });

    function filterSelection(category) {
      allLinks.forEach((aTag) => {
        const filterDiv =
          aTag.querySelector(".filterDiv");
        if (!filterDiv) return;
        const matches =
          category === "all" ||
          filterDiv.classList.contains(category);
        aTag.style.display = matches
          ? "block"
          : "none";
      });
    }
  }
);

///img-pre
const lists = document.querySelectorAll(
  ".projects__list"
);

lists.forEach((article) => {
  const imgDiv = article.querySelector(
    ".projects__list__pre"
  );
  const img = imgDiv.querySelector("img");

  article.addEventListener("mousemove", (e) => {
    imgDiv.style.visibility = "visible";
    imgDiv.style.left = `${e.clientX}px`;
    imgDiv.style.top = `${e.clientY}px`;
    img.style.transform =
      "translate(-50%, -50%) scale(2)";
  });

  article.addEventListener("mouseleave", () => {
    imgDiv.style.visibility = "hidden";
    img.style.transform =
      "translate(-50%, -50%) scale(1)";
  });
});

// arrow
const arrows =
  document.querySelectorAll(".arrow");

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  arrows.forEach((arrow) => {
    const arrowX =
      arrow.offsetLeft + arrow.offsetWidth / 2;
    const arrowY =
      arrow.offsetTop + arrow.offsetHeight / 2;

    const dx = mouseX - arrowX;
    const dy = mouseY - arrowY;

    const angle =
      Math.atan2(dy, dx) * (180 / Math.PI);

    arrow.style.transform = `rotate(${angle}deg)`;
  });
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
