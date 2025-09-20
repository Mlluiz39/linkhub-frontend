import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from '../views/Login'
import { AuthProvider, useAuth } from './AuthContext'

const GOOGLE_CLIENT_ID =
  '37636929163-4l0tgcuaqnp4csarn2kqbalbl0diejpo.apps.googleusercontent.com'

export default function AuthWrapper({ children }) {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthGate>{children}</AuthGate>
      </GoogleOAuthProvider>
    </AuthProvider>
  )
}

function AuthGate({ children }) {
  const { user } = useAuth()
  if (!user) return <LoginWrapper />
  return children
}

function LoginWrapper() {
  const { setUser } = useAuth()
  return <Login onSuccess={setUser} />
}
