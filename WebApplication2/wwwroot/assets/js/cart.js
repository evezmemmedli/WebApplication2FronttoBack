// Selecting elements starts
const tbodyElement = document.querySelector(".cart__table__body");
const subCostElement = document.querySelector("#sub-total-cost");
const shippingCostElement = document.querySelector("#shipping-cost");
const totalCostElement = document.querySelector("#total-cost");

// let items = localStorage.getItem("items")
//   ? JSON.parse(localStorage.getItem("items"))
//   : [];

// Selecting elements ends

const updateCartTotals = function () {
  let items = itemParser();
  if (items.length > 0) {
    const subCost = items
      .map((item) => parseInt(item.price.slice(1)) * item.count)
      .reduce((acc, cur) => acc + cur);

    const shippingCost = subCost * 0.25;
    const totalCost = shippingCost + subCost;
    subCostElement.textContent = `$${subCost.toFixed(2)}`;
    shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
  } else {
    setToZero();
    subCostElement.textContent = `$0`;
    shippingCostElement.textContent = `$0`;
    totalCostElement.textContent = `$0`;
  }
};

// Functions end
function addToBasket() {
  let items = itemParser();
  if (items.length > 0) {
    tbodyElement.innerHTML = "";

    items.forEach((item) => {
      const html = `<tr>
                <td class="cart__table__img-container">
                <img src="${item.src}" alt="shoe">
                
            </td>
            <td class="cart__table__title">
                <span>${item.title}</span>
            </td>
            <td class="cart__table__price">
                ${item.price}
            </td>
            <td class="cart__table__count ">
                <div id="${item.id}" class="cart__table__count__btns">
                <button class="cart__table__count__btns--minus">-</button>
                <span class="cart__table__count__btns--result">${
                  item.count
                }</span>
                <button class="cart__table__count__btns--plus">+</button>
                </div>
            </td>
            <td class="cart__table__total">
                $${item.price.slice(1) * 0.2 + Number(item.price.slice(1))}
            </td>
            <td class="cart__table__remove"><i class="fa-regular fa-trash-can"></i></td>
            </tr>`;

      tbodyElement.insertAdjacentHTML("afterbegin", html);
      updateCartTotals();
      basketCount.innerHTML = items.length;
    });
  } else {
    tbodyElement.innerHTML = "";
    setToZero();
    subCostElement.textContent = `$0`;
    shippingCostElement.textContent = `$0`;
    totalCostElement.textContent = `$0`;
  }
}

// window.addEventListener("load", addToBasket);
addToBasket();
// Selecting elements starts
const btnsMinusElements = document.querySelectorAll(
  ".cart__table__count__btns--minus"
);
const btnsPlusElements = document.querySelectorAll(
  ".cart__table__count__btns--plus"
);

const popUp = document.querySelector(".pop-up"); //for pop up message//

// I used addEventListener() for plus,minus btns container to prevent bubbling.
const countContainers = document.querySelectorAll("tr td.cart__table__count");

const removeBtns = document.querySelectorAll("tr td.cart__table__remove i");

// Selecting elements ends

// Functions start
const findBasketItem = function (e, items) {
  return items.find((item) => item.id == e.target.parentElement.id);
};

const decreaseBasketItem = function (e, btn) {
  let items = itemParser();

  const targetElement = findBasketItem(e, items);

  // this is for removing the class from plus button if you reach count 10.
  if (targetElement.count >= 10) {
    const btnPlus = btn
      .closest(".cart__table__count__btns")
      .querySelector(".cart__table__count__btns--plus");

    btnPlus.classList.remove("btn--disabled");
    popUp.classList.add("pop-up--hidden");
  }

  const btnResultElement = btn.nextElementSibling;
  targetElement.count--;
  btnResultElement.innerHTML--;

  const tr = e.target.closest("tr");

  if (items.some((item) => item.count == 0)) {
    // I used setTimeout() for the user to see the item getting deleted. Without it, you don't even see it dropping to 0
    tbodyElement.removeChild(tr);

    setTimeout(() => {
      // removing the item dynamically from the website
      // showing the pop-up message
      popUp.innerHTML = "You successfully deleted the item";
      popUp.classList.remove("pop-up--hidden");
      basketCount.textContent = items.length;
    }, 400);
    // removing the pop-up message
    setTimeout(() => popUp.classList.add("pop-up--hidden"), 2500);

    items = items.filter((item) => item.count != 0);
  }
  localStorage.setItem("items", JSON.stringify(items));

  updateCartTotals();
  addToMiniBasket();
};

const increaseBasketItem = function (e, btn) {
  let items = itemParser();
  const targetElement = findBasketItem(e, items);
  if (targetElement.count >= 10) {
    btn.classList.add("btn--disabled");
    popUp.innerHTML = "You can't have more than 10 per item";
    popUp.classList.remove("pop-up--hidden");
    return;
  }
  const btnResultElement = btn.previousElementSibling;

  targetElement.count++;
  btnResultElement.innerHTML++;
  localStorage.setItem("items", JSON.stringify(items));

  updateCartTotals();
  addToMiniBasket();
};
// Functions end

function containerFunction(event) {
  // if event.target isn't (.cart__table__count__btns) container then return
  const clicked = event.target.closest("td .cart__table__count__btns");
  if (!clicked) return;

  const btnMinus = event.target.closest(".cart__table__count__btns--minus");

  const btnPlus = event.target.closest(".cart__table__count__btns--plus");

  // if event.target isn't minus or plus btn then return
  if (!btnMinus && !btnPlus) return;

  if (event.target.classList.contains("cart__table__count__btns--minus")) {
    decreaseBasketItem(event, btnMinus);
  } else if (
    event.target.classList.contains("cart__table__count__btns--plus")
  ) {
    increaseBasketItem(event, btnPlus);
  }
}
// sehifede extra yuk olmasin deye bu metodla yazdim(btn lara event listener qoshsaydim onda butun parentleride bubble olacaqdi, hemde maraqli olsun deye bele yazdim :D)
countContainers.forEach((countContainer) =>
  countContainer.addEventListener("click", containerFunction)
);

removeBtns.forEach((removeBtn) =>
  removeBtn.addEventListener("click", function (e) {
    let items = itemParser();
    const targetElement = items.find(
      (item) =>
        item.id ==
        e.target.closest("tr").querySelector(".cart__table__count__btns").id
    );

    // birinci confirm le yazmishdim, qiraqdan popup message getirirdim(indide gelir) amma bunu da elave eledim
    // const check = confirm("Do you really want to remove this item?");
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will lose this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const tr = e.target.closest("tr");
        tbodyElement.removeChild(tr);

        setTimeout(() => {
          // removing the item dynamically from the website
          // showing the pop-up message
          popUp.innerHTML = "You successfully deleted the item";
          popUp.classList.remove("pop-up--hidden");
        }, 400);
        // removing the pop-up message
        setTimeout(() => popUp.classList.add("pop-up--hidden"), 2500);
        items = items.filter((item) => item.id !== targetElement.id);
        localStorage.setItem("items", JSON.stringify(items));
        basketCount.textContent = items.length;
        updateCartTotals();
        addToMiniBasket();
        updateMiniCartTotals();
        // addToBasket();
        countContainers.forEach((count) =>
          count.addEventListener("click", containerFunction)
        );

        swal("You successfully deleted the item!", {
          icon: "success",
        });
      } else {
        swal({
          title: "You kept the item!",
          text: "noice",
        });
      }
    });
    // if (!check) return;
  })
);

// Checkout button
document
  .querySelector("#proceed-checkout")
  .addEventListener("click", function () {
    let items = itemParser();
    if (items.length > 0) {
      swal({
        title: "Purchase successful",
        text: "Checkout more of our products",
        icon: "success",
        button: "Continue",
      });
      subCostElement.textContent = "$0";
      shippingCostElement.textContent = "$0";
      totalCostElement.textContent = "$0";
      localStorage.clear();
      tbodyElement.innerHTML = "";
    } else {
      swal({
        title: "Your bag is empty",
        text: "Add some products to your basket",
        icon: "warning",
        button: "Okay",
      });
    }
  });

// Storage
window.addEventListener("storage", addToBasket);
