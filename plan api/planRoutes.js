// planRoutes.js

const express = require('express');
const fs = require('fs');
const router = express.Router();

// Utility functions to read and write data
const readData = () => {
  return JSON.parse(fs.readFileSync('planlist.json', { encoding: 'utf8', flag: 'r' }));
};

const writeData = (data) => {
  fs.writeFileSync('planlist.json', JSON.stringify(data, null, 2), { encoding: 'utf8' });
};

// Get all plans
router.get('/', (req, res) => {
  try {
    const plans = readData();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).send('Error reading plans data');
  }
});

// Add a new plan
router.post('/', (req, res) => {
  try {
    const newPlan = req.body;
    const plans = readData();
    // Optionally generate a unique planId for newPlan here if not already provided
    plans.push(newPlan);
    writeData(plans);
    res.status(201).send(newPlan);
  } catch (err) {
    res.status(500).send('Error saving the new plan');
  }
});

// Update an existing plan
router.put('/plans/:planId', (req, res) => {
  const { planId } = req.params;
  try {
    let plans = readData();
    const index = plans.findIndex(plan => plan.planId === planId);
    if (index === -1) return res.status(404).send('Plan not found');

    plans[index] = { ...plans[index], ...req.body };
    writeData(plans);
    res.status(200).json(plans[index]);
  } catch (err) {
    res.status(500).send('Error updating plan');
  }
});

// Delete a plan
router.delete('/plans/:planId', (req, res) => {
  const { planId } = req.params;
  try {
    let plans = readData();
    const filteredPlans = plans.filter(plan => plan.planId !== planId);
    if (plans.length === filteredPlans.length) {
      return res.status(404).send('Plan not found');
    }

    writeData(filteredPlans);
    res.status(204).send(); // Successfully processed and no content to return
  } catch (err) {
    res.status(500).send('Error deleting plan');
  }
});

module.exports = router;
