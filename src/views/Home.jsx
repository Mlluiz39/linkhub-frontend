import { Link } from 'react-router-dom'
import '../style.css'
import redesSociaisImg from '../assets/images/redes_sociais.webp'

export default function Home() {
  return (
    <section className="min-h-full flex flex-col items-center justify-center px-6 py-12 md:py-20 animate-fade-in">
      <div className="w-full max-w-3xl text-center space-y-8">
        
        {/* Hero Image Section */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          
          <img
            src={redesSociaisImg}
            alt="Redes sociais flutuando"
            className="relative w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Todos os seus links <br className="hidden sm:block" />
            <span className="text-purple-600">em um só lugar</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Gerencie e compartilhe suas conexões de forma simples e elegante. 
            O hub central para toda a sua presença digital.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-2xl text-gray-400">
          <i className="fab fa-youtube hover:text-red-600 transition-colors duration-300 cursor-default"></i>
          <i className="fab fa-twitter hover:text-blue-400 transition-colors duration-300 cursor-default"></i>
          <i className="fab fa-instagram hover:text-pink-600 transition-colors duration-300 cursor-default"></i>
          <i className="fab fa-facebook hover:text-blue-700 transition-colors duration-300 cursor-default"></i>
          <i className="fab fa-tiktok hover:text-black transition-colors duration-300 cursor-default"></i>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link 
            to="/links" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Começar Grátis
            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
