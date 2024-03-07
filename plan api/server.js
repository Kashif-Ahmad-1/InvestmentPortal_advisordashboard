const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Import the fs module
const app = express();
const PORT = 3000;
const clientRoutes = require('./routes/clientRoutes');
app.use(cors());
app.use(express.json());


app.use('/clients', clientRoutes);

app.get('/plans', (req, res) => {
  // Read the plans.json file and parse it into JSON
  fs.readFile('planlist.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading plans data');
      return;
    }
    const plans = JSON.parse(data);
    res.status(200).json(plans);
  });
});




  // ending functionalities


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




// app.get('/clients', (req, res) => {
//     fs.readFile('clientlist.json', 'utf8', (err, data) => {
//       if (err) {
//         res.status(500).send('Error reading client list data');
//         console.error('Error reading client list data:', err);
//         return;
//       }
//       res.status(200).json(JSON.parse(data));
//     });
//   });


//   app.delete('/clients/:userId', (req, res) => {
//     const userId = parseInt(req.params.userId);
  
//     fs.readFile('clientlist.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading client list data:', err);
//         res.status(500).send('Error reading client list data');
//         return;
//       }
  
//       let clients = JSON.parse(data);
//       const index = clients.findIndex(client => client.UserID === userId);
  
//       if (index === -1) {
//         res.status(404).send('Client not found');
//         return;
//       }
  
//       // Remove the client from the array
//       clients.splice(index, 1);
  
//       // Write the updated clients back to the file
//       fs.writeFile('clientlist.json', JSON.stringify(clients, null, 2), 'utf8', (err) => {
//         if (err) {
//           console.error('Error writing updated client list data:', err);
//           res.status(500).send('Error updating client list data');
//           return;
//         }
//         res.status(204).send(); // No content to send back for a successful delete
//       });
//     });
//   });


//   // adding functinalities also

//   app.post('/clients', (req, res) => {
//     const newClient = req.body;
  
//     // Optional: Validate newClient object here (ensure it has the required fields)
  
//     fs.readFile('clientlist.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading client list data:', err);
//         res.status(500).send('Error reading client list data');
//         return;
//       }
  
//       const clients = JSON.parse(data);
      
//       // Generate a new unique ID - simplistic approach for demonstration
//       // In a real application, consider using a more robust method for generating unique IDs
//       const newUserId = clients.length > 0 ? Math.max(...clients.map(client => client.UserID)) + 1 : 1;
//       newClient.UserID = newUserId;
  
//       clients.push(newClient);
  
//       // Write the updated clients array back to the file
//       fs.writeFile('clientlist.json', JSON.stringify(clients, null, 2), 'utf8', (err) => {
//         if (err) {
//           console.error('Error writing new client data:', err);
//           res.status(500).send('Error saving new client');
//           return;
//         }
//         res.status(201).json(newClient); // Respond with the newly added client
//       });
//     });
//   });