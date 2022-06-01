const tabs = document.querySelectorAll(".tab");
tabs[0].classList.add("tab-show"); //default
const tabButtons = document.querySelectorAll(".tabs >div>ul>li>button");

const showTab = function () {
  tabs.forEach((tab) => tab.classList.remove("tab-show"));
  tabButtons.forEach((button) => button.classList.remove("active--tab-link"));
  const tabContentID = document.querySelector(`#${this.id}-content`);
  tabContentID.classList.add("tab-show");
  const tabButtonID = document.querySelector(`#${this.id}`);
  tabButtonID.classList.add("active--tab-link");
};

tabButtons.forEach((button) => button.addEventListener("click", showTab));

$("#related-carousel").owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
});
