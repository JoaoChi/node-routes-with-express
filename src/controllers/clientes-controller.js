import express from 'express';
const router = express.Router();

let clientes = [];

router.get('/', (req, res) => {
    res.json(clientes);
});

router.get('/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
});

router.post('/', (req, res) => {
    const cliente = {
        id: clientes.length + 1,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    };
    clientes.push(cliente);
    res.status(201).json(cliente);
});

router.put('/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

    cliente.nome = req.body.nome || cliente.nome;
    cliente.email = req.body.email || cliente.email;
    cliente.telefone = req.body.telefone || cliente.telefone;

    res.json(cliente);
});

router.delete('/:id', (req, res) => {
    const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (clienteIndex === -1) return res.status(404).json({ message: 'Cliente não encontrado' });

    const clienteRemovido = clientes.splice(clienteIndex, 1);
    res.json(clienteRemovido[0]);
});

export default router;
