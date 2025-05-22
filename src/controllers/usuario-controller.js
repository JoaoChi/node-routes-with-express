import express from 'express';
const router = express.Router();

let users = [];

const createUser = (req, res) => {
  const { name, email, phone, senha } = req.body;
  if (!name || !email || !senha) {
    return res.status(400).json({ message: 'Nome email e senha sao obrigatórios' });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    senha,
    phone: phone || ''
  };

  users.push(user);
  res.status(201).json(user);
};

const getUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'user não encontrado' });
  res.json(user);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'user não encontrado' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.senha = req.body.senha || user.senha;

  res.json(user);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'user não encontrado' });

  const removedUser = users.splice(index, 1);
  res.json(removedUser[0]);
};

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
