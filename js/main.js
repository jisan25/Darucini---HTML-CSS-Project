import { menu } from "./data.js";

// selection menuwrapper & btnwrapper
const menuWrapper = document.querySelector(".category-items");
const categoryWrapper = document.querySelector(".category");

// after the window is loaded
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menu);
  displayMenuButtons();

  // when the window is loaded add active class to the category link all
  const menuBtnAll = document.getElementById("all");
  menuBtnAll.classList.add("active");
});
// display category items
function displayMenuItems(menuItems) {
  const displayMenu = menuItems
    .map((item) => {
      return `<div class="img-content-container">
      <img
        class="card"
        src=${item.img}
      />
      <div class="content">
        <h1>${item.title}</h1>
        <p>
          ${item.desc}
        </p>
      </div>
    </div>`;
    })
    .join("");
  menuWrapper.innerHTML = displayMenu;
}
// display category buttons
function displayMenuButtons() {
  // get unique categories
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  // add all categories into dom
  const displayCategory = categories
    .map((category) => {
      return `<a class="btn btn-light filter-btn" id=${category} data-id=${category}>${
        category.charAt(0).toUpperCase() + category.slice(1)
      }</a>`;
    })
    .join("");
  categoryWrapper.innerHTML = displayCategory;

  // filter menu items
  const links = categoryWrapper.querySelectorAll(".filter-btn");
  links.forEach((link) => {
    // after clicking a button
    link.addEventListener("click", (e) => {
      // user selected category
      const selectedCategory = e.currentTarget.dataset.id;

      // get category button with user selection
      const categoryBtn = document.getElementById(selectedCategory);

      // Remove Link active class from all other buttons
      links.forEach((link) => {
        if (link.classList.contains("active")) {
          link.classList.remove("active");
        }
        // Add Active class to the selected link
        categoryBtn.classList.add("active");
      });

      // filter menu with user selected category
      const filteredCategory = menu.filter((item) => {
        if (item.category === selectedCategory) {
          return item;
        }
      });
      // load menu items via selection
      if (selectedCategory === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(filteredCategory);
      }
    });
  });
}

// const questions = document.querySelectorAll(".question");

// questions.forEach((question) => {
//   const btn = question.querySelector(".question-btn");
//   btn.addEventListener("click", () => {
//     questions.forEach((item) => {
//       if (item !== question) {
//         item.classList.remove("show-text");
//       }
//     });
//     question.classList.toggle("show-text");
//   });
// });
