const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route CREATE /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc Get individual contact
//@route GET /api/contacts/:id
//@access public

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
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contacts = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(contacts);
});

//@desc Delete individual contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
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
