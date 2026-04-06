import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMensagem('')

    try {
      const resposta = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const dados = await resposta.json()
      setMensagem(dados.mensagem)
    } catch (err) {
      setMensagem('Erro ao conectar com o servidor.')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '320px' }}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label>Email</label><br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label>Senha</label><br />
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '10px' }}>
            Entrar
          </button>
        </form>

        {mensagem && (
          <p style={{ marginTop: '16px', color: 'green' }}>{mensagem}</p>
        )}
      </div>
    </div>
  )
}
