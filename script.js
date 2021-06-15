document.querySelector("#expenseForm").addEventListener("submit", addExpense);

function addExpense(e) {
    e.preventDefault();

    const inputFieldGroup = [document.querySelector("#whereInput"), document.querySelector("#dateInput"),
    document.querySelector("#amountInput"), document.querySelector("#typeInput")];

    if (validateInputs(inputFieldGroup)) return;

    const dataEntry = makeTableRow(inputFieldGroup);

   const tableNode = document.querySelector("#tableBody");

    tableNode.insertAdjacentElement("beforeend", dataEntry);

    clearInputFields(inputFieldGroup);
}

function makeTableRow(inputFieldGroup) {
    const newTR = document.createElement('tr');
    
    const tdType = document.createElement('td');
    tdType.textContent = inputFieldGroup[3].value;
    tdType.classList.add("tableType");
    newTR.insertAdjacentElement("beforeend", tdType);

    const tdWhere = document.createElement('td');
    tdWhere.textContent = inputFieldGroup[0].value;
    tdWhere.classList.add("tableWhere");
    newTR.insertAdjacentElement("beforeend", tdWhere);

    const tdDate = document.createElement('td');
    tdDate.textContent = inputFieldGroup[1].value;
    tdDate.classList.add("tableDate");
    newTR.insertAdjacentElement("beforeend", tdDate);

    const tdAmount = document.createElement('td');
    tdAmount.textContent = `$${inputFieldGroup[2].value}`;
    tdAmount.classList.add("tableAmount");
    newTR.insertAdjacentElement("beforeend", tdAmount);

    const tdDeleteButton = document.createElement('td');
    tdDeleteButton.insertAdjacentElement("beforeend", createButton());
    
    newTR.insertAdjacentElement("beforeend", tdDeleteButton);
    
    return newTR;
}

function createButton(newTR) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("DeleteButton");
    deleteButton.addEventListener("click", (newTR) => {
        const index = newTR.rowIndex;
        document.querySelector('tbody').deleteRow(index);
    })
    

    return deleteButton;
}

function validateInputs(inputFieldGroup){
    let validate = 0;

    inputFieldGroup.forEach(function(input){
        if (input.value === ""){
            input.classList.toggle("invalidInput");
            setTimeout(() =>{
                input.classList.toggle("invalidInput");
            }, 1000);
            console.log("I am invalid");
            validate = 1;
        }
    })

    return validate;
}

function clearInputFields(arguments){
    arguments.forEach( function (input) { input.value = "" });
    arguments[0].focus();
}
