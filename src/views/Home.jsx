import { Link } from 'react-router-dom'
import '../style.css'
import redesSociaisImg from '../assets/images/redes_sociais.webp'

export default function Home() {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 w-72 mx-auto">
          <img
            src={redesSociaisImg}
            alt="Redes sociais flutuando"
            className="w-96 h-auto rounded-lg mb-3 "
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
          Todos os seus links <br className="hidden sm:block" /> em um só lugar
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Gerencie e compartilhe seus links de todas as redes sociais de forma
          simples e elegante.
        </p>
        <div className="flex justify-center gap-4 text-3xl mb-8">
          <i className="fab fa-youtube text-red-600"></i>
          <i className="fab fa-twitter text-purple-600"></i>
          <i className="fab fa-instagram text-pink-500"></i>
          <i className="fab fa-facebook text-blue-600"></i>
          <i className="fab fa-tiktok text-black"></i>
        </div>
        <div>
          <p className="text-purple-600 font-semibold sm:text-lg">
            Clique em Links para começar !!!
          </p>
        </div>
      </div>
    </section>
  )
}
