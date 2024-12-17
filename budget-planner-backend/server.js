const express = require('express');
const app = express();
const port = 3002;
const transactions = [];
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/transactions', (req, res) => {
    res.json(transactions);
});

// Маршрут для добавления новой транзакции
app.post('/add-transaction', (req, res) => {
    const { description, amount, date } = req.body;

    if (!description || !amount || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }
     // Добавляем транзакцию в массив
     const newTransaction = { description, amount, date };
     transactions.push(newTransaction);
 
     console.log('Transaction added:', newTransaction);
     res.status(201).json({ message: 'Transaction added successfully!', transaction: newTransaction });
 });
 




// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
