import { Link } from 'react-router-dom'
import '../style.css'
import redesSociaisImg from '../assets/images/redes_sociais.webp'

export default function Home() {
  const socialIcons = [
    { icon: 'fab fa-youtube', color: 'hover:text-red-500', name: 'YouTube' },
    { icon: 'fab fa-twitter', color: 'hover:text-sky-400', name: 'Twitter' },
    { icon: 'fab fa-instagram', color: 'hover:text-pink-500', name: 'Instagram' },
    { icon: 'fab fa-facebook', color: 'hover:text-blue-500', name: 'Facebook' },
    { icon: 'fab fa-tiktok', color: 'hover:text-white', name: 'TikTok' },
    { icon: 'fab fa-linkedin', color: 'hover:text-blue-400', name: 'LinkedIn' },
  ]

  return (
    <section className="min-h-full flex flex-col items-center justify-center px-6 py-12 md:py-16 gradient-bg relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/15 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-4xl text-center space-y-10 relative z-10">
        
        {/* Hero Image Section */}
        <div className="relative mx-auto w-full max-w-md animate-fade-in-scale">
          <div className="glass-dark rounded-3xl p-4 card-hover">
            <img
              src={redesSociaisImg}
              alt="Redes sociais conectadas"
              loading="lazy"
              decoding="async"
              className="relative w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="space-y-6 animate-slide-up animation-delay-200">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">Todos os seus links</span>
            <br />
            <span className="text-gradient">em um só lugar</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed font-light">
            Gerencie e compartilhe suas conexões de forma simples e elegante. 
            O hub central para toda a sua presença digital.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-5 md:gap-8 animate-fade-in animation-delay-400">
          {socialIcons.map((social, index) => (
            <i 
              key={social.name}
              className={`${social.icon} text-3xl md:text-4xl text-purple-300/60 ${social.color} social-icon`}
              title={social.name}
              style={{ animationDelay: `${index * 0.1}s` }}
            ></i>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-6 animate-slide-up animation-delay-500">
          <Link 
            to="/links" 
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-full shadow-xl hover:shadow-purple-500/40 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500/50 btn-shimmer animate-pulse-glow"
          >
            Começar Grátis
            <svg className="w-6 h-6 ml-3 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center gap-8 md:gap-16 pt-8 animate-fade-in animation-delay-500">
          <div className="text-center glass rounded-2xl px-6 py-4">
            <p className="text-3xl md:text-4xl font-bold text-white">10K+</p>
            <p className="text-sm text-purple-200/60">Usuários Ativos</p>
          </div>
          <div className="text-center glass rounded-2xl px-6 py-4">
            <p className="text-3xl md:text-4xl font-bold text-white">50K+</p>
            <p className="text-sm text-purple-200/60">Links Criados</p>
          </div>
          <div className="text-center glass rounded-2xl px-6 py-4">
            <p className="text-3xl md:text-4xl font-bold text-white">99%</p>
            <p className="text-sm text-purple-200/60">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  )
}
