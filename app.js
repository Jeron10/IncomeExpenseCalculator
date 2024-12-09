// Fetch elements
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const entriesList = document.getElementById("entries-list");
const resetBtn = document.getElementById("reset-btn");
const totalIncomeSpan = document.getElementById("total-income");
const totalExpensesSpan = document.getElementById("total-expenses");
const netBalanceSpan = document.getElementById("net-balance");
const filterAll = document.getElementById("all");
const filterIncome = document.getElementById("income");
const filterExpense = document.getElementById("expense");

// Initialize an empty entries array
let entries = [];

// Function to update the financial data (total income, total expenses, net balance)
function updateFinancialData() {
  const totalIncome = entries
    .filter((entry) => entry.type === "income")
    .reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpenses = entries
    .filter((entry) => entry.type === "expense")
    .reduce((acc, entry) => acc + entry.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  totalIncomeSpan.textContent = totalIncome;
  totalExpensesSpan.textContent = totalExpenses;
  netBalanceSpan.textContent = netBalance;
}

// Function to display entries
function displayEntries() {
  entriesList.innerHTML = "";
  const filter = document.querySelector('input[name="filter"]:checked').id;

  const filteredEntries = entries.filter((entry) => {
    if (filter === "all") return true;
    return entry.type === filter;
  });

  filteredEntries.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.className = "flex justify-between mb-2";
    listItem.innerHTML = `
            <span>${entry.description} - $${entry.amount} (${entry.type})</span>
            <button onclick="editEntry(${index})" class="btn edit">Edit</button>
            <button onclick="deleteEntry(${index})" class="btn delete">Delete</button>
        `;
    entriesList.appendChild(listItem);
  });
}

// Function to add a new entry
function addEntry() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    const type = amount >= 0 ? "income" : "expense";
    entries.push({ description, amount, type });
    descriptionInput.value = "";
    amountInput.value = "";
    updateFinancialData();
    displayEntries();
  } else {
    alert("Please enter valid description and amount.");
  }
}

// Function to edit an existing entry
function editEntry(index) {
  const entry = entries[index];
  descriptionInput.value = entry.description;
  amountInput.value = entry.amount;
  deleteEntry(index); // Remove the entry and let the user add it again
}

// Function to delete an entry
function deleteEntry(index) {
  entries.splice(index, 1);
  updateFinancialData();
  displayEntries();
}

// Function to reset all inputs and entries
function resetForm() {
  descriptionInput.value = "";
  amountInput.value = "";
  entries = []; // Clear entries array
  updateFinancialData();
  displayEntries();
}

// Event listener for adding a new entry
addBtn.addEventListener("click", addEntry);

// Event listener for resetting the form
resetBtn.addEventListener("click", resetForm);

// Event listeners for filtering
filterAll.addEventListener("change", displayEntries);
filterIncome.addEventListener("change", displayEntries);
filterExpense.addEventListener("change", displayEntries);

// Initial load of entries and financial data
updateFinancialData();
displayEntries();
