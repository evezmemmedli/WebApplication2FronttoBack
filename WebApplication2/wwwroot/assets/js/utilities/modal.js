// Modal start

const modal = document.querySelector(".product-details__modal");
const modalOverlay = document.querySelector(".product-details__modal__overlay");
const btnCloseModal = document.querySelector(
  ".product-details__modal__btn--close-modal"
);
const btnsOpenModal = document.querySelectorAll(".quick-look");

const openModal = function () {
  modal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

btnsOpenModal.forEach((btnOpenModal) =>
  btnOpenModal.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  })
);

btnCloseModal.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Modal end
