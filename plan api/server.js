const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Import the fs module
const app = express();
const PORT = 3000;
const clientRoutes = require('./clientRoutes');
app.use(cors());
app.use(express.json());
const planRoutes = require('./planRoutes');

app.use('/clients', clientRoutes);
app.use('/plans', planRoutes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});






//   // ending functionalities
//   app.put('/plans/:planId', (req, res) => {
//     const { planId } = req.params;
//     const updatedPlan = req.body;
  
//     fs.readFile('planlist.json', (err, data) => {
//       if (err) {
//         res.status(500).send('Error reading plans data');
//         return;
//       }
//       let plans = JSON.parse(data);
//       const planIndex = plans.findIndex(plan => plan.planId === planId);
//       if (planIndex === -1) {
//         res.status(404).send('Plan not found');
//         return;
//       }
//       plans[planIndex] = { ...plans[planIndex], ...updatedPlan };
//       fs.writeFile('planlist.json', JSON.stringify(plans, null, 2), (err) => {
//         if (err) {
//           res.status(500).send('Error updating plan');
//           return;
//         }
//         res.status(200).json(plans[planIndex]);
//       });
//     });
//   });
  
//   // DELETE route to delete a plan
//   app.delete('/plans/:planId', (req, res) => {
//     const { planId } = req.params;
  
//     fs.readFile('planlist.json', (err, data) => {
//       if (err) {
//         res.status(500).send('Error reading plans data');
//         return;
//       }
//       let plans = JSON.parse(data);
//       const newPlans = plans.filter(plan => plan.planId !== planId);
//       if (plans.length === newPlans.length) {
//         res.status(404).send('Plan not found');
//         return;
//       }
//       fs.writeFile('planlist.json', JSON.stringify(newPlans, null, 2), (err) => {
//         if (err) {
//           res.status(500).send('Error deleting plan');
//           return;
//         }
//         res.status(204).send(); // No Content
//       });
//     });
//   });



// const express = require('express');
// const cors = require('cors');
// const clientRoutes = require('./clientRoutes');
// const planRoutes = require('./planRoutes');
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());
// app.use('/clients', clientRoutes);
// app.use('/plans', planRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
