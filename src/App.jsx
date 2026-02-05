import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import LinksPage from './views/Links'
import { useAuth } from './lib/AuthContext'
import './style.css'

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="h-screen w-screen gradient-bg flex flex-col overflow-hidden">
      <nav className="glass border-b border-purple-500/20 text-white px-6 py-4 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity">
            LinkHub
          </Link>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-purple-200/80 hover:text-white transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/links" 
              className="text-purple-200/80 hover:text-white transition-colors duration-300 font-medium"
            >
              Links
            </Link>
          </div>
        </div>
        {user && (
          <button
            onClick={logout}
            className="glass hover:bg-red-500/30 px-5 py-2 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg"
          >
            Sair
          </button>
        )}
      </nav>
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </main>
    </div>
  )
}
