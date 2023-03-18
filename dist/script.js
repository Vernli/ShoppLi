// nie podoba
const table = document.getElementById("items-table");
const clearBtn = document.getElementById("clear-btn");
const filterBtn = document.getElementById("filter");

// podoba
const itemInput = document.getElementById("item-input");
const itemAmount = document.getElementById("item-amount");
const itemForm = document.getElementById("item-form");
const itemSection = document.getElementById("items-section");

function checkItems() {
  return document.querySelectorAll(".item").length;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function createButton(classes_btn, classes_icon) {
  const button = document.createElement("button");
  button.className = classes_btn;
  button.appendChild(createIcon(classes_icon));
  return button;
}

function createTd(item) {
  const td = document.createElement("td");
  td.appendChild(item);
  return td;
}

function checkTable() {
  if (checkItems() == 0) {
    table.classList.add("hidden");
    clearBtn.classList.add("hidden");
    filterBtn.classList.add("hidden");
  } else {
    table.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
    filterBtn.classList.remove("hidden");
  }
}

function addItem(e) {
  e.preventDefault();
  const tr = document.createElement("tr");
  tr.className = "item";

  const td_buttons = document.createElement("td");

  const btnEdit = createButton(
    "",
    "edit-item fa-solid fa-wrench fa-xs text-indigo-600"
  );
  const btnRemove = createButton(
    "",
    "remove-item ml-3 fa-solid fa-trash fa-xs text-indigo-600"
  );

  td_buttons.appendChild(btnEdit);
  td_buttons.appendChild(btnRemove);
  tr.appendChild(createTd(document.createTextNode(itemInput.value)));
  tr.appendChild(createTd(document.createTextNode(itemAmount.value)));
  tr.appendChild(td_buttons);

  itemSection.appendChild(tr);
  itemInput.value = "";
  itemAmount.value = 1;

  checkTable(); // ma sprawdzic i pokazac elementy filter/table/clearBtn
}

function removeItem(item) {
  if (confirm("Are you sure?")) item.remove();
  checkTable(); // ma usunac filter/table/clear
}

function editItem(item) {
  console.log(item);
}

function onClickItem(e) {
  if (e.target.classList.contains("remove-item"))
    removeItem(e.target.parentElement.parentElement.parentElement);
  else {
    editItem(e.target.parentElement.parentElement.parentElement);
  }
}

checkTable();
itemForm.addEventListener("submit", addItem);
itemSection.addEventListener("click", onClickItem);
