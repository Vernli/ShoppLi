const items = document.querySelectorAll(".item");

function tableBeautifier() {
  for (let i = 0; i < items.length; i++) {
    if (i % 2) {
      items[i].classList.add("bg-gray-300");
    } else {
      items[i].classList.add("bg-gray-200");
    }
  }
}
tableBeautifier();
