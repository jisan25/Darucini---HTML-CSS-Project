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

// Close Full Screen Overlay Navigation on Click

const inputActive = document.getElementById("active");

// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

// ************** Go To Top *****************

const navbar = document.querySelector(".navbar");
const topLink = document.querySelector(".top-link");
const navbarMenuBtnContact = document.querySelector(
  ".navbar__menu_btn_contact"
);

window.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  //   Add Fixed Navbar after scrollbar pass the navbar

  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  // setup back to top link

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
    // remove extra padding when fixed navbar added to menubar contact button
    navbarMenuBtnContact.classList.remove("navbar__menu_btn_contact");
  } else {
    topLink.classList.remove("show-link");
    navbarMenuBtnContact.classList.add("navbar__menu_btn_contact");
  }
});

// ********** smooth scroll ************
// select links
const linksContainer = document.querySelector(".wrapper__logo_menu");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight - 60;
    } else {
      position = position - containerHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    inputActive.checked = false;
  });
});
