const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 30;
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);
    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

const sortGrid = document.querySelector("#grid-sort");
const sortList = document.querySelector("#list-sort");
const products = document.querySelectorAll("#mycol");

const card1 = document.querySelector("#cards--1");
const card2 = document.querySelector("#cards--2");

const listView = function () {
  products.forEach((product) => {
    product.classList.remove("col-md-6", "col-lg-4");
    product.classList.add("col-lg-12");
    product.classList.add("move-to-left", "products__cards__card__list-view");
    sortGrid.style.backgroundColor = "#9e9e9e";
    this.style.backgroundColor = "#e3a51e";
    card1.classList.add("hidden");
    card2.classList.add("list-view__container");
  });
};

const gridView = function () {
  products.forEach((product) => {
    if (product.classList.contains("col-lg-12")) {
      product.classList.remove("scale-animation");
      product.classList.remove("move-to-left");
      product.classList.remove("col-lg-12");
      product.classList.add("col-md-6", "col-lg-4");
      product.classList.add("scale-animation");
      product.classList.add("products__cards__card__list-view");

      sortList.style.backgroundColor = "#9e9e9e";
      this.style.backgroundColor = "#e3a51e";
      card2.classList.remove("list-view__container");
      card1.classList.remove("hidden");
      product.classList.add("grid-view__container");
    }
  });
};

sortList.addEventListener("click", listView);

sortGrid.addEventListener("click", gridView);
