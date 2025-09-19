import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import LinksPage from './views/Links';
import './style.css';

export default function App() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden">
      <nav className="bg-purple-700 text-white p-4 flex space-x-6 flex-shrink-0">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/links" className="hover:underline">Links</Link>
      </nav>
      <main className="flex-1 p-6 max-w-4xl mx-auto overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </main>
    </div>
  );
}
