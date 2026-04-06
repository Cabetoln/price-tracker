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

// Rota de login — salva email e senha no arquivo
app.post('/login', (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' })
  }

  const usuarios = JSON.parse(fs.readFileSync(ARQUIVO))

  // Salva somente se ainda não existe
  const jaExiste = usuarios.find(u => u.email === email)
  if (!jaExiste) {
    usuarios.push({ email, senha, data: new Date().toISOString() })
    fs.writeFileSync(ARQUIVO, JSON.stringify(usuarios, null, 2))
  }

  res.json({ mensagem: 'Login realizado com sucesso!', email })
})

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001')
})
