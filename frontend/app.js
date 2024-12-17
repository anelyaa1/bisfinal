const form = document.getElementById('addTransactionForm');
const transactionTableBody = document.getElementById('transactionTable').querySelector('tbody');
const messageDiv = document.getElementById('message');

// API Base URL
const BASE_URL = 'http://localhost:3002';

// Функция для получения всех транзакций и отображения их в таблице
async function fetchTransactions() {
    try {
        const response = await fetch(`${BASE_URL}/transactions`);
        const data = await response.json();

        // Очищаем таблицу перед добавлением новых данных
        transactionTableBody.innerHTML = '';

        data.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.date}</td>
            `;
            transactionTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Получаем данные формы
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    // Создаем объект транзакции
    const transaction = { description, amount, date };

    try {
        // Отправляем POST запрос на сервер
        const response = await fetch(`${BASE_URL}/add-transaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });

        if (response.ok) {
            const result = await response.json();
            messageDiv.innerText = 'Transaction added successfully!';
            messageDiv.style.color = 'green';

            // Обновляем таблицу транзакций
            fetchTransactions();
            form.reset(); // Очищаем форму
        } else {
            const errorData = await response.json();
            messageDiv.innerText = `Error: ${errorData.message}`;
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.innerText = `Error: ${error.message}`;
        messageDiv.style.color = 'red';
    }
});

// Загружаем транзакции при загрузке страницы
fetchTransactions();
