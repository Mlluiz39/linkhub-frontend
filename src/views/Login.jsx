import React, { useState } from 'react'
import api from '../lib/api'
import { GoogleLogin } from '@react-oauth/google'

const Auth = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true) // Toggle entre login e cadastro
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async credentialResponse => {
    setLoading(true)
    try {
      const res = await api.post('/auth/google', {
        token: credentialResponse.credential,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      onSuccess(res.data.user)
    } catch (err) {
      alert('Erro ao autenticar com Google')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    alert('Erro ao autenticar com Google')
  }

  const handleEmailAuth = async e => {
    e.preventDefault()
    if (!email || !password || (!isLogin && !name)) {
      return alert('Preencha todos os campos')
    }
    setLoading(true)
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const payload = isLogin ? { email, password } : { name, email, password }
      const res = await api.post(endpoint, payload)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      onSuccess(res.data.user)
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao autenticar')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
        <img
          src="https://source.unsplash.com/600x800/?technology,abstract"
          alt="Login Illustration"
          className="w-3/4 h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Right side - Auth Card */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-10 space-y-6">
          {/* Header with toggle */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800">
              {isLogin ? 'Bem-vindo' : 'Crie sua conta'}
            </h1>
            <p className="text-gray-500 text-sm">
              {isLogin
                ? 'Faça login com sua conta Google ou email e senha'
                : 'Cadastre-se com email e senha ou Google'}
            </p>

            <div className="mt-3 flex justify-center gap-4 text-sm">
              <button
                className={`font-medium ${
                  isLogin ? 'text-blue-600' : 'text-gray-400'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`font-medium ${
                  !isLogin ? 'text-blue-600' : 'text-gray-400'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Cadastro
              </button>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading
                ? isLogin
                  ? 'Entrando...'
                  : 'Cadastrando...'
                : isLogin
                ? 'Entrar'
                : 'Cadastrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-3 text-gray-400">
            <span className="border-t w-1/3"></span>
            <span>OU</span>
            <span className="border-t w-1/3"></span>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleError}
              theme="filled_blue"
              size="large"
              width="100%"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-4">
            Ao continuar, você concorda com nossos{' '}
            <button className="underline hover:text-blue-600">
              Termos de Serviço
            </button>{' '}
            e{' '}
            <button className="underline hover:text-blue-600">
              Política de Privacidade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
