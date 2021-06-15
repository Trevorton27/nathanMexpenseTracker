document.querySelector("#expenseForm").addEventListener("submit", addExpense);

function addExpense(e) {
  e.preventDefault();

  const inputFieldGroup = [
    document.querySelector("#whereInput"),
    document.querySelector("#dateInput"),
    document.querySelector("#amountInput"),
    document.querySelector("#typeInput"),
  ];

  if (isInputFieldsEmpty(inputFieldGroup)) return;

  const dataEntry = createDataEntry(inputFieldGroup);

  document
    .querySelector("#tableBody")
    .insertAdjacentElement("beforeend", dataEntry);

  clearInputFields(inputFieldGroup);
}

function createDataEntry(inputFieldGroup) {
  const newTableRow = document.createElement("tr");

  const tableDataType = document.createElement("td");
  tableDataType.textContent = inputFieldGroup[3].value;
  tableDataType.classList.add("tableType");
  newTableRow.insertAdjacentElement("beforeend", tableDataType);

  const tableDataWhere = document.createElement("td");
  tableDataWhere.textContent = inputFieldGroup[0].value;
  tableDataWhere.classList.add("tableWhere");
  newTableRow.insertAdjacentElement("beforeend", tableDataWhere);

  const tableDataDate = document.createElement("td");
  tableDataDate.textContent = inputFieldGroup[1].value;
  tableDataDate.classList.add("tableDate");
  newTableRow.insertAdjacentElement("beforeend", tableDataDate);

  const tableDataAmount = document.createElement("td");
  tableDataAmount.textContent = `$${inputFieldGroup[2].value}`;
  tableDataAmount.classList.add("tableAmount");
  newTableRow.insertAdjacentElement("beforeend", tableDataAmount);

  const tableDataContainingButton = document.createElement("td");
  tableDataContainingButton.insertAdjacentElement(
    "beforeend",
    createButton(newTableRow)
  );
  newTableRow.insertAdjacentElement("beforeend", tableDataContainingButton);

  return newTableRow;
}

function createButton(newTableRow) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "x";
  deleteButton.classList.add("DeleteButton");
  deleteButton.addEventListener("click", () => {
    document.querySelector("tbody").deleteRow(`${newTableRow.rowIndex - 1}`);
  });
  return deleteButton;
}

function isInputFieldsEmpty(inputFieldGroup) {
  let validate = 0;

  inputFieldGroup.forEach(function (input) {
    if (input.value === "") {
      input.classList.toggle("invalidInput");
      setTimeout(() => {
        input.classList.toggle("invalidInput");
      }, 1000);
      console.log("I am invalid");
      validate = true;
    }
  });

  return validate;
}

function clearInputFields(inputFieldGroup) {
  inputFieldGroup.forEach(function (input) {
    input.value = "";
  });
  inputFieldGroup[0].focus();
}
