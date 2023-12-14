const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route CREATE /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Get individual contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contacts);
});

//@desc Update individual contact
//@route UPDATE /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contacts) {
    res.status(404);
    throw new Error('Contact not found');
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not Authorized');
  }
  const contacts = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(contacts);
});

//@desc Delete individual contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contacts) {
    res.status(404);
    throw new Error('Contact not found');
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not Authorized');
  }
  const contacts = await Contact.findByIdAndDelete(id);
  if (!contacts) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contacts);
});

module.exports = {
  getContact,
  createContact,
  getContacts,
  deleteContact,
  updateContact,
};
