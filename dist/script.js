const itemInput = document.getElementById("item-input");
const itemQuantify = document.getElementById("item-quantify");
const itemForm = document.getElementById("item-form");
const itemSection = document.getElementById("items-section");

const clearBtn = document.getElementById("clear-btn");
const filterInput = document.getElementById("filter");
const formBtn = document.getElementById("formBtn");

let isEditMode = false;

// LocalStorage Begin
function getItemsFromStorage() {
  try {
    // To catch Syntax Error Unexpected t... 'o' in JSON || if double objects are in localStorage
    let itemsFromStorage;
    if (localStorage.getItem("items") == null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemsFromStorage;
  } catch (e) {
    itemsFromStorage.clear();
  }
}
function addItemsToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  console.log(item);

  // Add new item to the storage
  itemsFromStorage.push(item);

  // Convert JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// FIX
function checkIfItemwExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  for (i of itemsFromStorage) {
    if (shallowEqual(i, item)) {
      return true;
    }
  }
  return false;
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => !shallowEqual(i, item));
  // Re-set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function displayFromStorage() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    onAddItemDOM(item);
  });
  checkTable();
}
// LocalStorage END

function zipToObject(item) {
  const values = item.textContent.trim().split(" ");
  return { item: values[0], quantify: values[1] };
}

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

// Creation Block -- BEGIN
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
// Creation Block -- END

// Hide table
function checkTable() {
  const table = document.getElementById("items-table");

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

  const inputs = { item: itemInput.value, quantify: itemQuantify.value };

  if (inputs.item === "") {
    alert("Input is empty !");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemSection.querySelector(".edit-mode");
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();

    isEditMode = false;
  } else {
    if (checkIfItemwExists(inputs)) {
      alert("That Item Already Exists");
      return;
    }
  }
  console.log(checkIfItemwExists(inputs));
  onAddItemDOM(inputs);
  addItemsToStorage(inputs);

  itemInput.value = "";
  itemQuantify.value = 1;
  checkTable();
}

// Add Item to DOM
function onAddItemDOM(item) {
  const tr = document.createElement("tr");
  const td_item = createTd(document.createTextNode(item.item + " "));
  const td_quantify = createTd(document.createTextNode(item.quantify));
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
  if (confirm("Are you sure?")) item.remove();
  removeItemFromStorage(zipToObject(item));
  checkTable(); // ma usunac filter/table/clear
}

function clearAll() {
  document.querySelectorAll(".item").forEach((el) => el.remove());
  localStorage.clear();
  checkTable();
}
// Edit - FIX
function editItem(item) {
  isEditMode = true;
  itemSection
    .querySelectorAll("tr")
    .forEach((i) => i.classList.remove("edit-mode"));
  //
  item.classList.add("edit-mode");
  formBtn.innerHTML = 'Update Item <i class="fa-solid fa-pen"></i>';
  formBtn.classList.remove("add-item");
  //Get Input and Quantify
  const values = item.textContent.trim().split(" ");
  itemQuantify.value = values.pop();
  itemInput.value = values.pop();
}
// Add or Update
function onClickItem(e) {
  if (e.target.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement.parentElement);
  } else {
    editItem(e.target.parentElement.parentElement.parentElement);
  }
}
// Filtr
function filterItems(e) {
  const items = itemSection.querySelectorAll(".item-value");
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

function Init() {
  checkTable();
  itemForm.addEventListener("submit", addItem);
  itemSection.addEventListener("click", onClickItem);
  filterInput.addEventListener("input", filterItems);
  clearBtn.addEventListener("click", clearAll);
  document.addEventListener("DOMContentLoaded", displayFromStorage);
}

Init();
