import { Link } from 'react-router-dom';
import '../style.css';
import redesSociaisImg from '../assets/images/redes_sociais.jpg';

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md text-center">
        <img src={redesSociaisImg} alt="Redes sociais flutuando" className="w-full h-auto rounded-lg shadow-lg mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
          Todos os seus links <br className="hidden sm:block" /> em um só lugar
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Gerencie e compartilhe seus links de todas as redes sociais de forma simples e elegante.
        </p>
        <div className="flex justify-center gap-4 text-3xl mb-8">
          <i className="fab fa-youtube text-red-600"></i>
          <i className="fab fa-twitter text-purple-600"></i>
          <i className="fab fa-instagram text-pink-500"></i>
          <i className="fab fa-facebook text-blue-600"></i>
          <i className="fab fa-tiktok text-black"></i>
        </div>
        <Link to="/links" className="inline-block w-full bg-purple-600 text-white text-lg font-semibold py-4 rounded-xl shadow hover:bg-purple-700 transition-all">
          Começar Agora
        </Link>
      </div>
    </section>
  );
}
