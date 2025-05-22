import express from 'express';
const router = express.Router();

let titles = [];

const createTitle = (req, res) => {
  const { clienteId, descricao, valor } = req.body;
  if (!clienteId || !descricao || valor === undefined) {
    return res.status(400).json({ message: 'clienteId, descricao e valor são obrigatórios' });
  }

  const title = {
    id: titles.length + 1,
    clienteId,
    descricao,
    valor
  };

  titles.push(title);
  res.status(201).json(title);
};

const getTitles = (req, res) => {
  const { clienteId } = req.query;
  if (clienteId) {
    const filtered = titles.filter(t => t.clienteId == clienteId);
    return res.json(filtered);
  }
  res.json(titles);
};

const getTitleById = (req, res) => {
  const id = parseInt(req.params.id);
  const title = titles.find(t => t.id === id);
  if (!title) return res.status(404).json({ message: 'Título não encontrado' });
  res.json(title);
};

const updateTitle = (req, res) => {
  const id = parseInt(req.params.id);
  const title = titles.find(t => t.id === id);
  if (!title) return res.status(404).json({ message: 'Título não encontrado' });

  const { descricao, valor } = req.body;
  title.descricao = descricao || title.descricao;
  title.valor = valor !== undefined ? valor : title.valor;

  res.json(title);
};

const deleteTitle = (req, res) => {
  const id = parseInt(req.params.id);
  const index = titles.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Título não encontrado' });

  const removed = titles.splice(index, 1);
  res.json(removed[0]);
};

router.post('/', createTitle);
router.get('/', getTitles);
router.get('/:id', getTitleById);
router.put('/:id', updateTitle);
router.delete('/:id', deleteTitle);

export default router;
