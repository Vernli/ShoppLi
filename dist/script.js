// nie podoba
const table = document.getElementById("items-table");
const clearBtn = document.getElementById("clear-btn");
const filterBtn = document.getElementById("filter");

// podoba
const itemInput = document.getElementById("item-input");
const itemAmount = document.getElementById("item-amount");
const itemForm = document.getElementById("item-form");
const itemSection = document.getElementById("items-section");

let isEditMode = false;
// ???
const items = document.querySelectorAll(".item");

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

function checkItems() {
  return document.querySelectorAll(".item").length;
}

function addItemDOM(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  const amountOfItem = itemAmount.value;

  if (newItem === "") {
    alert("Input is empty !");
    return;
  }

  const tr = document.createElement("tr");
  tr.className = "item";
  const td_buttons = document.createElement("td");
  const btnEdit = createButton(
    "btn-edit",
    "edit-item fa-solid fa-wrench fa-xs text-indigo-600"
  );
  const btnRemove = createButton(
    "btn-remove",
    "remove-item ml-3 fa-solid fa-trash fa-xs text-indigo-600"
  );

  td_buttons.appendChild(btnEdit);
  td_buttons.appendChild(btnRemove);
  tr.appendChild(createTd(document.createTextNode(itemInput.value)));
  tr.appendChild(createTd(document.createTextNode(itemAmount.value)));
  tr.appendChild(td_buttons);

  itemSection.appendChild(tr);

  // ADD TO LOCAL STORAGE
  itemInput.value = "";
  itemAmount.value = 1;

  checkTable(); // ma sprawdzic i pokazac elementy filter/table/clearBtn
}

function removeItem(item) {
  if (confirm("Are you sure?")) item.remove(); // + removeLocalStorage
  checkTable(); // ma usunac filter/table/clear
}

// Popraw
function clearAll() {
  document.querySelectorAll(".item").forEach((el) => el.remove());
  checkTable();
}
// Koniec

// Zrob
function editItem(e) {
  console.log(e.textContent.trim().split(""));
}
// Koniec

function onClickItem(e) {
  if (e.target.classList.contains("remove-item"))
    removeItem(e.target.parentElement.parentElement.parentElement);
  else {
    editItem(e.target.parentElement.parentElement.parentElement);
  }
}

checkTable();
itemForm.addEventListener("submit", addItemDOM);
itemSection.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearAll);
