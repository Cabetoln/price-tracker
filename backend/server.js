const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const ARQUIVO = path.join(__dirname, 'usuarios.json')

app.use(cors())
app.use(express.json())

// Garante que o arquivo de usuários existe
if (!fs.existsSync(ARQUIVO)) {
  fs.writeFileSync(ARQUIVO, '[]')
}

// Rota de cadastro — cria um novo usuário
app.post('/cadastro', (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' })
  }

  const usuarios = JSON.parse(fs.readFileSync(ARQUIVO))

  const jaExiste = usuarios.find(u => u.email === email)
  if (jaExiste) {
    return res.status(400).json({ mensagem: 'Email já cadastrado.' })
  }

  usuarios.push({ email, senha, data: new Date().toISOString() })
  fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2))

  res.json({ mensagem: 'Cadastro realizado com sucesso!' })
})

// Rota de login — verifica se email e senha batem
app.post('/login', (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' })
  }

  const usuarios = JSON.parse(fs.readFileSync(ARQUIVO))

  const usuario = usuarios.find(u => u.email === email && u.senha === senha)
  if (!usuario) {
    return res.status(401).json({ mensagem: 'Email ou senha incorretos.' })
  }

  res.json({ mensagem: 'Login realizado com sucesso!', email })
})

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001')
})
