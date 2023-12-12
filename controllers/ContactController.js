//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: 'gel all contacts' });
};

//@desc Create new contact
//@route CREATE /api/contacts
//@access public

const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  res.status(201).json({ message: 'create  contact' });
};

//@desc Get individual contact
//@route GET /api/contacts/:id
//@access public

const getContact = (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
};

//@desc Update individual contact
//@route UPDATE /api/contacts/:id
//@access public

const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

//@desc Delete individual contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};

module.exports = {
  getContact,
  createContact,
  getContacts,
  deleteContact,
  updateContact,
};
