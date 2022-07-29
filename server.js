const express = require('express')
const { randomUUID } = require('crypto')
const app = express()

app.use(express.json())

const dados = [] // armazena dados

//  inserir
app.post('/pessoa', (req, res) => {
    const { nome, idade, dt_nascimento } = req.body;

    const pessoa = {
        nome,
        idade,
        dt_nascimento,
        id: randomUUID()
    }
    dados.push(pessoa)
    return res.json(pessoa)
})

//buscar todos 
app.get('/pessoa', (req, res) => {
    return res.json(dados)
})

//buscar um dado
app.get('/pessoa/:id', (req, res) => {
    const { id } = req.params
    const pessoas = dados.find(pessoa => pessoa.id === id)
    return res.json(pessoas)
})

//alterar dado
app.put('/pessoa/:id', (req, res) => {
    const { id } = req.params
    const { nome, idade, dt_nascimento } = req.body;

    const dadosIndex = dados.findIndex(pessoa => pessoa.id === id)
    dados[dadosIndex] = {
        ...dados[dadosIndex],
        nome,
        idade,
        dt_nascimento
    }
    return res.json({ mensagem: "Cadastro alterado com sucesso" })
})

//deletar dado 
app.delete('/pessoa/:id', (req, res) => {
    const { id } = req.params
    const dadosIndex = dados.findIndex(pessoa => pessoa.id === id)
    dados.splice(dadosIndex, 1)
    return res.json({ mensagem: "Cadastro removido" })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})