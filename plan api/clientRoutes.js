const express = require('express');
const fs = require('fs');
const router = express.Router();

// GET all clients
router.get('/', (req, res) => {
    fs.readFile('clientlist.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading client list data:', err);
            res.status(500).send('Error reading client list data');
            return;
        }
        res.status(200).json(JSON.parse(data));
    });
});

// DELETE a client
router.delete('/:userId', (req, res) => {
    // Implementation remains the same
    const userId = parseInt(req.params.userId);
  
    fs.readFile('clientlist.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading client list data:', err);
        res.status(500).send('Error reading client list data');
        return;
      }
  
      let clients = JSON.parse(data);
      const index = clients.findIndex(client => client.UserID === userId);
  
      if (index === -1) {
        res.status(404).send('Client not found');
        return;
      }
  
      // Remove the client from the array
      clients.splice(index, 1);
  
      // Write the updated clients back to the file
      fs.writeFile('clientlist.json', JSON.stringify(clients, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing updated client list data:', err);
          res.status(500).send('Error updating client list data');
          return;
        }
        res.status(204).send(); // No content to send back for a successful delete
      });
    });
});

// POST a new client
router.post('/', (req, res) => {
    // Implementation remains the same
    const newClient = req.body;
  
    // Optional: Validate newClient object here (ensure it has the required fields)
  
    fs.readFile('clientlist.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading client list data:', err);
        res.status(500).send('Error reading client list data');
        return;
      }
  
      const clients = JSON.parse(data);
      
      // Generate a new unique ID - simplistic approach for demonstration
      // In a real application, consider using a more robust method for generating unique IDs
      const newUserId = clients.length > 0 ? Math.max(...clients.map(client => client.UserID)) + 1 : 1;
      newClient.UserID = newUserId;
  
      clients.push(newClient);
  
      // Write the updated clients array back to the file
      fs.writeFile('clientlist.json', JSON.stringify(clients, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing new client data:', err);
          res.status(500).send('Error saving new client');
          return;
        }
        res.status(201).json(newClient); // Respond with the newly added client
      });
    });
});

module.exports = router;




// const express = require('express');
// const { getClientList, addClient, deleteClient } = require('../controllers/clientController');
// const router = express.Router();

// router.get('/', getClientList);
// router.post('/', addClient);
// router.delete('/:userId', deleteClient);

// module.exports = router;
