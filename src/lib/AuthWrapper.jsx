import React, { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from '../views/Login'

const GOOGLE_CLIENT_ID =
  '37636929163-4l0tgcuaqnp4csarn2kqbalbl0diejpo.apps.googleusercontent.com' 

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  if (!user) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Login onSuccess={setUser} />
      </GoogleOAuthProvider>
    )
  }

  return children
}
