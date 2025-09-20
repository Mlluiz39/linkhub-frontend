import React from 'react'
import api from '../lib/api'
import { GoogleLogin } from '@react-oauth/google'

const Login = ({ onSuccess }) => {
  const handleGoogleLogin = async credentialResponse => {
    try {
      const res = await api.post('/auth/google', {
        token: credentialResponse.credential,
      })

      // Salva JWT e dados do usuário
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      // Atualiza estado do AuthWrapper
      onSuccess(res.data.user)
    } catch (err) {
      alert('Erro ao autenticar no backend')
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Entrar com Google
        </h2>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert('Erro ao autenticar com Google')
          }}
        />
      </div>
    </div>
  )
}

export default Login
