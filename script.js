const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];
document.querySelector('#expenseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const itemInput = document.querySelector('#whatInput');
  const locationInput = document.querySelector('#whereInput');
  const dateInput = document.querySelector('#dateInput');
  const amountInput = document.querySelector('#amountInput');
  const paymentTypeInput = document.querySelector('#typeInput');

  if (
    !itemInput.value ||
    !amountInput.value ||
    !dateInput.value ||
    !locationInput.value ||
    !paymentTypeInput.value
  ) {
    alert('Please fill out all input fields before submitting. ');
    return;
  }

  const newExpense = {
    id: Date.now(),
    item: itemInput.value,
    location: locationInput.value,
    date: formatDate(dateInput.value),
    amount: '$' + formatAmount(amountInput.value),
    paymentType: paymentTypeInput.value
  };

  addExpense(newExpense);
  document.getElementById('expenseForm').reset();
});

function addExpense(expense) {
  createExpenseRow(expense);
  expenseArray.push(expense);
  pushToLocalStorage(expenseArray);
}

function pushToLocalStorage(array) {
  localStorage.setItem('expenseArray', JSON.stringify(array));
}

function createExpenseRow(expense) {
  const newTableRow = document.createElement('tr');
  document.querySelector('#tableBody').appendChild(newTableRow);

  const itemCell = createCell(expense.item);
  newTableRow.appendChild(itemCell);

  const locationCell = createCell(expense.location);
  newTableRow.appendChild(locationCell);

  const dateCell = createCell(expense.date);
  newTableRow.appendChild(dateCell);

  const amountCell = createCell(expense.amount);
  newTableRow.appendChild(amountCell);

  const paymentTypeCell = createCell(expense.paymentType);
  newTableRow.appendChild(paymentTypeCell);

  const deleteCell = document.createElement('td');
  const deleteButton = createDeleteButton(expense);
  newTableRow.appendChild(deleteCell);
  deleteCell.appendChild(deleteButton);
}

function createCell(expense) {
  const dataCell = document.createElement('td');
  dataCell.textContent = expense;
  return dataCell;
}

function createDeleteButton(expense) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  deleteButton.classList.add('DeleteButton');
  deleteButton.addEventListener('click', () => {
    deleteExpense(deleteButton, expense.id);
  });
  return deleteButton;
}

const deleteExpense = (deleteButton, id) => {
  deleteButton.parentElement.parentElement.remove();
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === id) {
      expenseArray.splice(i, 1);
      pushToLocalStorage(expenseArray);
      calculateTotalExpense();
    }
  }
};

function formatDate(dateInput) {
  let date = new Date(dateInput);
  const options = {
    dateStyle: 'medium',
    timeZone: 'UTC'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatAmount(amount) {
  return (amount = parseFloat(amount).toFixed(2));
}

window.addEventListener('load', (e) => {
  e.preventDefault();
  expenseArray.forEach((expense) => {
    createExpenseRow(expense);
  });
});
