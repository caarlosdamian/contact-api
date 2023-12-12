const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'gel all contacts' });
});

router.route('/').post((req, res) => {
  res.status(200).json({ message: 'create  contact' });
});

router.route('/:id').get((req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
});

router.route('/:id').put((req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

router.route('/:id').delete((req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = router;
