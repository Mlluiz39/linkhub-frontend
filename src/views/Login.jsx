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

  const handleGoogleError = () => {
    console.error('Google Login Error')
    alert('Erro ao autenticar com Google')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Login Card */}
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-5">
            <h1 className="text-3xl font-normal text-gray-800">Bem-vindo</h1>
            <p className="text-gray-500 text-base">
              Entre com sua conta Google para continuar
            </p>
          </div>

          {/* Google Login Button */}
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

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
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

export default Login
