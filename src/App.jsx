import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import LinksPage from './views/Links'
import { useAuth } from './lib/AuthContext'
import './style.css'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden">
      <nav className="bg-purple-700 text-white p-4 flex justify-between items-center flex-shrink-0">
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/links" className="hover:underline">
            Links
          </Link>
        </div>
        {user && (
          <button
            onClick={logout}
            className="bg-red-400 hover:bg-red-500 px-4 py-1 rounded text-white"
          >
            Sair
          </button>
        )}
      </nav>
      <main className="flex-1 p-6 max-w-4xl mx-auto overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </main>
    </div>
  )
}
