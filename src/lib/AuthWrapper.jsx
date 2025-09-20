import React, { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from '../views/Login'

const GOOGLE_CLIENT_ID =
  '37636929163-4l0tgcuaqnp4csarn2kqbalbl0diejpo.apps.googleusercontent.com' // Substitua pelo seu Client ID

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null)

  if (!user) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Login onSuccess={setUser} />
      </GoogleOAuthProvider>
    )
  }

  return children
}
