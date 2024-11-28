const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

let pessoas = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' },
  { id: 3, nome: 'José' }
];

app.get('/pessoa', (req, res) => {
  res.json(pessoas);
});

app.get('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find(p => p.id === id);
  
  if (pessoa) {
    res.json(pessoa);
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' });
  }
});

app.post('/pessoa', (req, res) => {
  const novaPessoa = {
    id: pessoas.length ? pessoas[pessoas.length - 1].id + 1 : 1, 
    nome: req.body.nome
  };
  
  pessoas.push(novaPessoa);
  res.status(201).json(novaPessoa);
});

app.put('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pessoa = pessoas.find(p => p.id === id);

  if (pessoa) {
    pessoa.nome = req.body.nome;
    res.json(pessoa);
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' });
  }
});


app.delete('/pessoa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pessoas.findIndex(p => p.id === id);

  if (index !== -1) {
    const pessoaRemovida = pessoas.splice(index, 1); 
    res.json(pessoaRemovida);
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});