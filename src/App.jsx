import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import LinksPage from './views/Links';
import './style.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-purple-700 text-white p-4 flex space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/links" className="hover:underline">Links</Link>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </main>
    </div>
  );
}
