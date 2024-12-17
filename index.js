let expenses = [];

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    document.getElementById('date').max = maxDate;
});

function addExpense() {
    const productName = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;
    const dateInput = document.getElementById('date').value;
    const date = new Date(dateInput);

    if (!productName) {
        alert('Please enter the product name.');
        return;
    }

    if (isNaN(price) || price < 0 || price > 200000) {
        alert('Price must be between 0 and 200,000.');
        return;
    }

    if (!dateInput) {
        alert('Please enter a valid date.');
        return;
    }

    const expense = { productName, price, category, date };
    expenses.push(expense);

    updateSummary();
    displayExpenses();
    clearInputs();
}

function updateSummary() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const todayTotal = expenses
        .filter(e => isSameDay(e.date, today))
        .reduce((sum, e) => sum + e.price, 0);

    const weekTotal = expenses
        .filter(e => e.date >= startOfWeek && e.date <= today)
        .reduce((sum, e) => sum + e.price, 0);

    const monthTotal = expenses
        .filter(e => e.date >= startOfMonth && e.date <= today)
        .reduce((sum, e) => sum + e.price, 0);

    const yearTotal = expenses
        .filter(e => e.date >= startOfYear && e.date <= today)
        .reduce((sum, e) => sum + e.price, 0);

    document.getElementById('today-total').textContent = todayTotal.toFixed(2);
    document.getElementById('week-total').textContent = weekTotal.toFixed(2);
    document.getElementById('month-total').textContent = monthTotal.toFixed(2);
    document.getElementById('year-total').textContent = yearTotal.toFixed(2);
}

function displayExpenses() {
    const expensesUl = document.getElementById('expenses-ul');
    expensesUl.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${expense.productName}</strong> - ${expense.category} - $${expense.price.toFixed(2)} 
            <span>${expense.date.toLocaleDateString()}</span>
        `;
        expensesUl.appendChild(li);
    });
}

function filterExpenses() {
    const selectedMonth = parseInt(document.getElementById('filter-month').value, 10);
    const selectedYear = parseInt(document.getElementById('filter-year').value, 10);

    const filteredTotal = expenses
        .filter(e => e.date.getMonth() === selectedMonth && e.date.getFullYear() === selectedYear)
        .reduce((sum, e) => sum + e.price, 0);

    document.getElementById('filtered-total').textContent = filteredTotal.toFixed(2);
}

function clearInputs() {
    document.getElementById('product-name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = 'Food';
    document.getElementById('date').value = '';
}

function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}
