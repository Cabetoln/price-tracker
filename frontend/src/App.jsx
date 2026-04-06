import { useState } from 'react'

export default function App() {
  const [tela, setTela] = useState('login') // 'login' ou 'cadastro'

  return (
    <div>
      {tela === 'login' && <Login irParaCadastro={() => setTela('cadastro')} />}
      {tela === 'cadastro' && <Cadastro irParaLogin={() => setTela('login')} />}
    </div>
  )
}

function Login({ irParaCadastro }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMensagem('')
    setErro('')

    try {
      const resposta = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const dados = await resposta.json()

      if (resposta.ok) {
        setMensagem(dados.mensagem)
      } else {
        setErro(dados.mensagem)
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.')
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

        {mensagem && <p style={{ marginTop: '16px', color: 'green' }}>{mensagem}</p>}
        {erro && <p style={{ marginTop: '16px', color: 'red' }}>{erro}</p>}

        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Não tem conta?{' '}
          <button onClick={irParaCadastro} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
            Cadastrar
          </button>
        </p>
      </div>
    </div>
  )
}

function Cadastro({ irParaLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMensagem('')
    setErro('')

    try {
      const resposta = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const dados = await resposta.json()

      if (resposta.ok) {
        setMensagem(dados.mensagem)
      } else {
        setErro(dados.mensagem)
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '320px' }}>
        <h2>Cadastro</h2>

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
            Cadastrar
          </button>
        </form>

        {mensagem && <p style={{ marginTop: '16px', color: 'green' }}>{mensagem}</p>}
        {erro && <p style={{ marginTop: '16px', color: 'red' }}>{erro}</p>}

        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Já tem conta?{' '}
          <button onClick={irParaLogin} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
            Entrar
          </button>
        </p>
      </div>
    </div>
  )
}
