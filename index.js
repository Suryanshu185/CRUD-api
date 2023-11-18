const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());

// Simulated in-memory database
let customers = [
  { id: 1, firstName: "John", lastName: "Doe", address: "123 Main St", city: "Cityville", state: "CA", email: "john@example.com", phone: "555-1234" },
  { id: 2, firstName: "Jane", lastName: "Smith", address: "456 Oak St", city: "Townsville", state: "NY", email: "jane@example.com", phone: "555-5678" },
];

// Get all customers
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

// Get a single customer by ID
app.get('/api/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find(c => c.id === customerId);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Create a new customer
app.post('/api/customers', (req, res) => {
  const newCustomer = req.body;
  newCustomer.id = customers.length + 1;
  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

// Update an existing customer
app.put('/api/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const updatedCustomer = req.body;
  updatedCustomer.id = customerId;

  const index = customers.findIndex(c => c.id === customerId);

  if (index !== -1) {
    customers[index] = updatedCustomer;
    res.json(updatedCustomer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Delete a customer by ID
app.delete('/api/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  customers = customers.filter(c => c.id !== customerId);

  res.json({ message: 'Customer deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
