const headerBottom = document.querySelector(".header__bottom");

const backToTop = document.querySelector(".btn-fixed");

window.addEventListener("scroll", function () {
  const mediaQuery = window.matchMedia("(max-width: 993px)");
  if (mediaQuery.matches) {
    if (this.window.scrollY > 400) {
      headerBottom.classList.add("sticky");
    } else {
      headerBottom.classList.remove("sticky");
    }
  } else {
    if (this.window.scrollY > 400) {
      headerBottom.classList.add("sticky");
      headerBottom.style.height = "7.6rem";
      backToTop.style.opacity = "1";
    } else {
      headerBottom.classList.remove("sticky");
      headerBottom.style.height = "12rem";
      backToTop.style.opacity = "0";
    }
  }
});

// adding to basket
const basketCount = document.querySelector("#basket-count");
const basketIcons = document.querySelectorAll(".fa-basket-shopping");
const basketCard = document.querySelector("#basket-card");

let items = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

basketIcons.forEach((basketIcon, index) => {
  basketIcon.addEventListener("click", (e) => {
    if (e.target == basketCard) return;

    basketIcon.id = `${index}`;

    // can't use closest() because the class names of the parent classes are different in basket icons
    const prices =
      basketIcon.parentElement.parentElement.parentElement.querySelector(
        "span"
      );
    const img =
      basketIcon.parentElement.parentElement.parentElement.parentElement.querySelector(
        "img"
      );
    const title =
      basketIcon.parentElement.parentElement.parentElement.parentElement.querySelector(
        "h5"
      );

    if (items.length > 0) {
      if (items.some((item) => item.id === e.target.id)) {
        items = items.filter((item) => item.id !== e.target.id);
      } else {
        items.push({
          id: `${basketIcon.id}`,
          count: 1,
          price: `${prices.textContent}`,
          src: `${img.src}`, //getAttribute() ile de yazmaq olar
          title: `${title.textContent}`,
        });
      }
    } else {
      items.push({
        id: `${basketIcon.id}`,
        count: 1,
        price: `${prices.textContent}`,
        src: `${img.src}`,
        title: `${title.textContent}`,
      });
    }
    localStorage.setItem("items", JSON.stringify(items));
    basketCount.innerHTML = items.length;
    addToMiniBasket();
  });
});
basketCount.innerHTML = items.length;

// Selecting elements starts
const hamburger = document.querySelector("#hamburger");
const canvas = document.querySelector(".canvas__content");
const canvasOverlay = document.querySelector(".canvas__overlay");
const btnCanvasClose = document.querySelector(".canvas__content__closeBtn");

const basketCardIcon = document.querySelector("#basket-card");

const canvasBasket = document.querySelector(".canvas__basket");
const canvasBasketOverlay = document.querySelector(".canvas__basket__overlay");
const canvasBasketContent = document.querySelector(".canvas__basket__content");

const btnCanvasBasketClose = document.querySelector(
  ".canvas__basket__content__closeBtn"
);

const popUpGlobal = document.querySelector(".pop-up--global");

// Selecting elements ends

// Functions start

const showCanvas = function () {
  canvas.classList.add("return");
  canvasOverlay.classList.add("return");
};
const hideCanvas = function () {
  canvas.classList.remove("return");
  canvasOverlay.classList.remove("return");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && canvas.classList.contains("return")) {
    hideCanvas();
  }
});

const hideBasketCanvas = function () {
  canvasBasketContent.classList.remove("return");
  canvasBasketOverlay.classList.remove("return");
};

// Functions end

// Events start
hamburger.addEventListener("click", showCanvas);

canvasOverlay.addEventListener("click", hideCanvas);
btnCanvasClose.addEventListener("click", hideCanvas);

canvasBasketOverlay.addEventListener("click", hideBasketCanvas);
btnCanvasBasketClose.addEventListener("click", hideBasketCanvas);
// Events end

// Selecting elements
const accordions = document.querySelectorAll(
  ".canvas__content__accordions >li"
);

const allDropdowns = document.querySelectorAll(
  ".canvas__content__accordions__dropdown"
);
const dropdownIcons = document.querySelectorAll(" .toggle");

accordions.forEach((accordion) =>
  accordion.addEventListener("click", function (e) {
    // for Contact Us
    if (e.target.id == "canvas__contact-us") {
      return;
    }

    const targetDropdown = this.querySelector(
      " .canvas__content__accordions__dropdown"
    );
    const dropdownIcon = this.querySelector(".toggle");

    if (targetDropdown.style.maxHeight !== "0px") {
      targetDropdown.style.maxHeight = "0px";
      dropdownIcon?.classList.remove("open");
    } else {
      allDropdowns.forEach((ul) => (ul.style.maxHeight = "0px"));
      dropdownIcons.forEach((icon) => icon.classList.remove("open"));

      targetDropdown.style.maxHeight = `${targetDropdown.scrollHeight}px`;
      dropdownIcon?.classList.add("open");
    }
  })
);

// Search button event starts
const searchBtn = document.querySelector("#search-btn");
const searchOverlay = document.querySelector(".search__overlay");
const searchContent = document.querySelector(".search__overlay__content");
const searchBtnClose = document.querySelector(".search__overlay__closeBtn");

searchBtn.addEventListener("click", function () {
  searchOverlay.classList.add("search__overlay--show");
  searchContent.style.transform = "translateY(0)";
});

const hideSearch = function (e) {
  searchOverlay.classList.remove("search__overlay--show");
  searchContent.style.transform = "translateY(50px)";
};

searchBtnClose.addEventListener("click", hideSearch);

document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    searchOverlay.classList.contains("search__overlay--show")
  ) {
    hideSearch();
  }
});

// Search button event ends

// Selecting elements starts
const miniCart = document.querySelector(".canvas__basket__content__mini-cart");

const pricingBox = document.querySelector(
  ".canvas__basket__content__pricing-box"
);

const basketSubtotalElement = document.querySelector("#global__cart-subtotal");
const basketTaxElement = document.querySelector("#global__cart-tax");
const basketVATElement = document.querySelector("#global__cart-vat");
const basketTotalElement = document.querySelector("#global__cart-total");

// Selecting elements ends

// Functions
const itemParser = () =>
  localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

function setToZero() {
  basketSubtotalElement.textContent = `$0`;
  basketTaxElement.textContent = `$0`;
  basketVATElement.textContent = `$0`;
  basketTotalElement.textContent = `$0`;
}

const updateMiniCartTotals = function () {
  let items = itemParser();
  if (items.length > 0) {
    const subCost = items
      .map((item) => parseInt(item.price.slice(1)) * item.count)
      .reduce((acc, cur) => acc + cur);

    // I could've done this calculations inside the template literals but I choose to do it like this
    const taxCost = Number((subCost / 3.33).toFixed(2));

    const VATcost = subCost * 0.2;

    const totalCost = subCost + taxCost + VATcost;

    basketSubtotalElement.textContent = `$${subCost.toFixed(2)}`;
    basketTaxElement.textContent = `$${taxCost.toFixed(2)}`;
    basketVATElement.textContent = `$${VATcost.toFixed(2)}`;
    basketTotalElement.textContent = `$${totalCost.toFixed(2)}`;
  } else {
    emptyBag();
    setToZero();
  }
};

const emptyBag = function () {
  miniCart.innerHTML = `
    <h3 style="text-transform:uppercase;font-weight:500;font-size:2.4rem">Your Bag is Empty</h3><br>
    <p style="font-size:1.5rem">Once you add something to your bag, it will appear here. Ready to get started?</p>
    <br>
    <button  class="canvas__basket__content__buttons__btn"><a style="font-size:1.6rem;display:flex;justify-content:center;align-items:center;" href="shop.html">Go to shop<i style="margin-left:0.8rem" class="fa-solid fa-angles-right"></i></a></button>
    `;
};

const addToMiniBasket = function () {
  let items = itemParser();
  if (items.length > 0) {
    miniCart.innerHTML = "";

    items.forEach((item) => {
      const html = `<li class="canvas__basket__content__mini-cart__item">
         <div class="canvas__basket__content__mini-cart__item__img-container">
           <img src="${item.src}" alt="shoe">
         </div>
         <div class="canvas__basket__content__mini-cart__item__body">
           <h5 class="canvas__basket__content__mini-cart__item__body__title">
             <a href="product-details.html">${item.title}</a>
           </h5>
           <p class="canvas__basket__content__mini-cart__item__body__quantity-price"><span class="item-quantity">${item.count} <strong>×</strong></span> <span class="item-price">${item.price}</span></p>
         </div>
         <button id="${item.id}" class="canvas__basket__content__mini-cart__item__button">
           <i class="fa-solid fa-xmark"></i>
         </button>
       </li>`;
      miniCart.insertAdjacentHTML("afterbegin", html);

      updateMiniCartTotals();
      basketCount.innerHTML = items.length;
    });
  } else {
    emptyBag();
    setToZero();
    basketCount.innerHTML = "0";
  }
};

addToMiniBasket();

const miniCartRemoveItem = function () {
  let items = itemParser();

  const basketRemoveBtn = document.querySelectorAll(
    ".canvas__basket__content__mini-cart__item__button"
  );
  basketRemoveBtn.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      const targetElement = items.find(
        (item) =>
          item.id ==
          e.target.closest(".canvas__basket__content__mini-cart__item__button")
            .id
      );
      const li = e.target.closest(".canvas__basket__content__mini-cart__item");

      // removing the item dynamically from the website
      miniCart.removeChild(li);
      setTimeout(() => {
        // showing the pop-up message
        popUpGlobal.innerHTML = "You successfully deleted the item";
        popUpGlobal.classList.remove("pop-up--global--hidden");
      }, 400);
      // removing the pop-up message
      setTimeout(
        () => popUpGlobal.classList.add("pop-up--global--hidden"),
        2500
      );
      items = items.filter((item) => item.id !== targetElement.id);
      localStorage.setItem("items", JSON.stringify(items));
      updateMiniCartTotals();

      //if there's no cart in the page then don't add(for cart.html page)
      // document.querySelector("tbody tr td") && addToBasket();
      if (document.querySelector("tbody tr td")) {
        // birdefelik addToBasket() metodunu yazmamagimin sebebi bu metod cagirilanda gerek sehifeni refresh edim, yoxsa interaksiya etmek olmur sehife ile. Metodu cagirmadan yazanda amma ishleyir ona gore bele yazdim
        const targetBtns = document.querySelectorAll(
          "tbody tr td .cart__table__count__btns"
        );
        const targetBtn = [...targetBtns].find(
          (target) => target.id == targetElement.id
        );

        const tableBody = document.querySelector("tbody");
        tableBody.removeChild(targetBtn.closest("tr"));
        updateCartTotals();
      }

      basketCount.innerHTML = items.length;
    })
  );
};
const showBasketCanvas = function () {
  canvasBasketContent.classList.add("return");
  canvasBasketOverlay.classList.add("return");
  miniCartRemoveItem();
};
basketCardIcon.addEventListener("click", showBasketCanvas);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !canvasBasketContent.classList.contains("remove")) {
    hideBasketCanvas();
  }
});

window.addEventListener("storage", addToMiniBasket);
