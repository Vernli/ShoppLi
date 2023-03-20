// nie podoba
const table = document.getElementById("items-table");
const clearBtn = document.getElementById("clear-btn");
const filterInput = document.getElementById("filter");
const formBtn = document.getElementById("formBtn");

// podoba
const itemInput = document.getElementById("item-input");
const itemQuantify = document.getElementById("item-quantify");
const itemForm = document.getElementById("item-form");
const itemSection = document.getElementById("items-section");

let isEditMode = false;

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

// Hide table
function checkTable() {
  if (checkItems() == 0) {
    table.classList.add("hidden");
    clearBtn.classList.add("hidden");
    filterInput.classList.add("hidden");
  } else {
    table.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
    filterInput.classList.remove("hidden");
  }

  formBtn.innerHTML = 'Add Item <i class="fa-solid fa-plus"></i>';
  formBtn.classList.add("add-item");

  isEditMode = false;
}

// Check items quantify
function checkItems() {
  return document.querySelectorAll(".item").length;
}

// Add Item
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  const quantifyOfItem = itemQuantify.value;

  if (newItem === "") {
    alert("Input is empty !");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemSection.querySelector(".edit-mode");
    console.log(itemToEdit);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();

    isEditMode = false;
  }

  onAddItemDOM(newItem, quantifyOfItem);

  // ADD TO LOCAL STORAGE
  //
  itemInput.value = "";
  itemQuantify.value = 1;
  checkTable();
}

// Add Item to DOM
function onAddItemDOM(item, quantify) {
  const tr = document.createElement("tr");
  const td_item = createTd(document.createTextNode(item + " "));
  const td_quantify = createTd(document.createTextNode(quantify));
  tr.className = "item";
  td_item.className = "item-value";

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

  tr.appendChild(td_item);
  tr.appendChild(td_quantify);
  tr.appendChild(td_buttons);
  itemSection.appendChild(tr);
}

// Remove item
function removeItem(item) {
  if (confirm("Are you sure?")) item.remove(); // + removeLocalStorage
  checkTable(); // ma usunac filter/table/clear
}

function clearAll() {
  document.querySelectorAll(".item").forEach((el) => el.remove());
  checkTable();
}
// fix
function editItem(item) {
  isEditMode = true;
  itemSection
    .querySelectorAll("tr")
    .forEach((i) => i.classList.remove("edit-mode"));
  //
  item.classList.add("edit-mode");
  console.log(item);
  formBtn.innerHTML = 'Update Item <i class="fa-solid fa-pen"></i>';
  formBtn.classList.remove("add-item");
  //Get Input and Quantify
  const values = item.textContent.trim().split(" ");
  itemQuantify.value = values.pop();
  itemInput.value = values.pop();
}
// Koniec
function onClickItem(e) {
  console.log(e.target.parentElement.parentElement.parentElement);

  if (e.target.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement.parentElement);
  } else {
    editItem(e.target.parentElement.parentElement.parentElement);
  }
}
// Filtr
function filterItems(e) {
  const items = itemSection.querySelectorAll(".item-value");
  console.log(items);
  const text = e.target.value;
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.parentElement.style.display = "table-row";
    } else {
      item.parentElement.style.display = "none";
    }
  });
}

//
checkTable();
itemForm.addEventListener("submit", addItem);
itemSection.addEventListener("click", onClickItem);
filterInput.addEventListener("input", filterItems);
clearBtn.addEventListener("click", clearAll);
