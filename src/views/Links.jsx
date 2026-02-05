import { useState, useEffect, useMemo } from 'react'
import api from '../lib/api'
import '../style.css'

const PLATFORMS = {
  all: { name: 'Todos', icon: 'fas fa-globe', color: 'text-purple-400' },
  youtube: { name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-500' },
  facebook: { name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
  tiktok: { name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-white' },
  instagram: { name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
  twitter: { name: 'Twitter/X', icon: 'fab fa-twitter', color: 'text-sky-400' },
  linkedin: { name: 'LinkedIn', icon: 'fab fa-linkedin', color: 'text-blue-500' },
  github: { name: 'GitHub', icon: 'fab fa-github', color: 'text-gray-300' },
  spotify: { name: 'Spotify', icon: 'fab fa-spotify', color: 'text-green-500' },
  twitch: { name: 'Twitch', icon: 'fab fa-twitch', color: 'text-purple-400' },
  discord: { name: 'Discord', icon: 'fab fa-discord', color: 'text-indigo-400' },
  whatsapp: { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: 'text-green-400' },
  telegram: { name: 'Telegram', icon: 'fab fa-telegram', color: 'text-sky-400' },
  other: { name: 'Outros', icon: 'fas fa-link', color: 'text-purple-400' },
}

function getPlatform(url) {
  const lowerUrl = url.toLowerCase()
  if (lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be')) return 'youtube'
  if (lowerUrl.includes('facebook') || lowerUrl.includes('fb.com')) return 'facebook'
  if (lowerUrl.includes('tiktok')) return 'tiktok'
  if (lowerUrl.includes('instagram')) return 'instagram'
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return 'twitter'
  if (lowerUrl.includes('linkedin')) return 'linkedin'
  if (lowerUrl.includes('github')) return 'github'
  if (lowerUrl.includes('spotify')) return 'spotify'
  if (lowerUrl.includes('twitch')) return 'twitch'
  if (lowerUrl.includes('discord')) return 'discord'
  if (lowerUrl.includes('whatsapp') || lowerUrl.includes('wa.me')) return 'whatsapp'
  if (lowerUrl.includes('telegram') || lowerUrl.includes('t.me')) return 'telegram'
  return 'other'
}

export default function LinksPage() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [search, setSearch] = useState('')
  const [links, setLinks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedUrl, setEditedUrl] = useState('')
  const [importing, setImporting] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  useEffect(() => {
    loadLinks()
  }, [])

  async function loadLinks() {
    try {
      const { data } = await api.get('/links')
      setLinks(Array.isArray(data.links) ? data.links : [])
    } catch (err) {
      console.error('Erro ao carregar links:', err)
      setLinks([])
    }
  }

  async function addLink(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/links', { title, url })
      const created = data?.link ?? data
      if (created) setLinks([created, ...links])
      setTitle('')
      setUrl('')
      setShowAddForm(false)
    } catch (err) {
      console.error('Erro ao adicionar link:', err)
    }
  }

  function startEdit(link) {
    setEditingLink(link)
    setEditedTitle(link.title)
    setEditedUrl(link.url)
  }

  async function saveEdit() {
    if (!editingLink) return
    try {
      const { data } = await api.put(`/links/${editingLink.id}`, {
        title: editedTitle,
        url: editedUrl,
      })
      const updated = data?.link ?? data
      setLinks(links.map(l => (l.id === editingLink.id ? updated : l)))
      setEditingLink(null)
    } catch (err) {
      console.error('Erro ao salvar edição:', err)
    }
  }

  async function deleteLink(id) {
    try {
      await api.delete(`/links/${id}`)
      setLinks(links.filter(link => link.id !== id))
    } catch (err) {
      console.error('Erro ao excluir link:', err)
    }
  }

  async function handleExportBackup() {
    try {
      const { data } = await api.get('/links/backup')
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `backup-links-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error('Erro ao exportar backup:', err)
      alert('Erro ao exportar backup.')
    }
  }

  async function handleImportBackup(e) {
    const file = e.target.files[0]
    if (!file) return

    setImporting(true)
    const reader = new FileReader()
    reader.onload = async event => {
      try {
        const json = JSON.parse(event.target.result)
        if (!json.links || !Array.isArray(json.links)) {
          throw new Error('Formato de arquivo inválido.')
        }

        await api.post('/links/restore', { links: json.links })
        alert('Backup importado com sucesso!')
        loadLinks()
      } catch (err) {
        console.error('Erro ao importar backup:', err)
        alert('Erro ao importar backup. Verifique o arquivo.')
      } finally {
        setImporting(false)
        e.target.value = null
      }
    }
    reader.readAsText(file)
  }

  function handleCardClick(e, link) {
    if (
      e.target.closest('button') ||
      ['INPUT', 'TEXTAREA'].includes(e.target.tagName) ||
      (editingLink && editingLink.id === link.id)
    )
      return
    window.open(link.url, '_blank')
  }

  // Get available platforms (only those with links)
  const availablePlatforms = useMemo(() => {
    const platformCounts = { all: links.length }
    links.forEach(link => {
      const platform = getPlatform(link.url)
      platformCounts[platform] = (platformCounts[platform] || 0) + 1
    })
    return Object.entries(PLATFORMS)
      .filter(([key]) => key === 'all' || platformCounts[key] > 0)
      .map(([key, value]) => ({ key, ...value, count: platformCounts[key] || 0 }))
  }, [links])

  // Filter links by search and selected platform
  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const matchesSearch = 
        (link.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (link.url || '').toLowerCase().includes(search.toLowerCase())
      
      const matchesPlatform = 
        selectedPlatform === 'all' || getPlatform(link.url) === selectedPlatform
      
      return matchesSearch && matchesPlatform
    })
  }, [links, search, selectedPlatform])

  return (
    <div className="min-h-full flex flex-col px-4 py-6 md:px-8">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="glass-dark rounded-2xl p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient">
                Meus Links
              </h1>
              <p className="text-purple-200/60 text-sm mt-1">
                {links.length} link{links.length !== 1 ? 's' : ''} salvos
              </p>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/50"></i>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  type="text"
                  placeholder="Pesquisar links..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-purple-500/20 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all btn-shimmer"
            >
              <i className="fas fa-plus"></i>
              Novo Link
            </button>
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-2 px-4 py-2.5 glass text-purple-200 rounded-xl hover:bg-white/20 transition-all"
            >
              <i className="fas fa-download"></i>
              Exportar
            </button>
            <label className="flex items-center gap-2 px-4 py-2.5 glass text-purple-200 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
              <i className="fas fa-upload"></i>
              {importing ? 'Importando...' : 'Importar'}
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportBackup}
                disabled={importing}
              />
            </label>
          </div>
        </header>

        {/* Platform Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-slide-up">
          {availablePlatforms.map(({ key, name, icon, color, count }) => (
            <button
              key={key}
              onClick={() => setSelectedPlatform(key)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all flex-shrink-0 ${
                selectedPlatform === key
                  ? 'glass-dark bg-purple-600/30 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20'
                  : 'glass text-purple-200/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className={`${icon} text-lg ${selectedPlatform === key ? color : ''}`}></i>
              <span className="hidden sm:inline">{name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedPlatform === key ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {filteredLinks.map((link, index) => {
            const platform = getPlatform(link.url)
            const platformInfo = PLATFORMS[platform]
            
            return (
              <div
                key={link.id}
                className="glass-dark rounded-xl p-4 cursor-pointer card-hover group"
                onClick={e => handleCardClick(e, link)}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                {editingLink && editingLink.id === link.id ? (
                  <div className="space-y-3">
                    <input
                      value={editedTitle}
                      onChange={e => setEditedTitle(e.target.value)}
                      type="text"
                      className="w-full p-2.5 rounded-lg bg-white/10 border border-purple-500/30 text-white text-sm placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="Título"
                    />
                    <input
                      value={editedUrl}
                      onChange={e => setEditedUrl(e.target.value)}
                      type="url"
                      className="w-full p-2.5 rounded-lg bg-white/10 border border-purple-500/30 text-white text-sm placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="URL"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        <i className="fas fa-check mr-1"></i> Salvar
                      </button>
                      <button
                        onClick={() => setEditingLink(null)}
                        className="px-3 py-2 glass text-purple-200 rounded-lg hover:bg-white/20 transition-colors text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    {/* Platform Icon */}
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className={`${platformInfo.icon} text-xl ${platformInfo.color}`}></i>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-xs text-purple-200/40 truncate mt-0.5">
                        {link.url}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          startEdit(link)
                        }}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all"
                        title="Editar"
                      >
                        <i className="fas fa-pen text-xs"></i>
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          deleteLink(link.id)
                        }}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                        title="Excluir"
                      >
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredLinks.length === 0 && (
          <div className="glass-dark rounded-2xl p-12 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full glass mx-auto flex items-center justify-center mb-4">
              <i className={`${selectedPlatform !== 'all' ? PLATFORMS[selectedPlatform].icon : 'fas fa-link-slash'} text-3xl text-purple-300/50`}></i>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {search ? 'Nenhum resultado' : `Nenhum link ${selectedPlatform !== 'all' ? `de ${PLATFORMS[selectedPlatform].name}` : 'salvo'}`}
            </h3>
            <p className="text-purple-200/50">
              {search 
                ? 'Tente buscar com outros termos'
                : 'Clique em "Novo Link" para adicionar'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal Add Link */}
      {showAddForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowAddForm(false)}
        >
          <form
            onSubmit={addLink}
            onClick={e => e.stopPropagation()}
            className="glass-dark rounded-2xl p-6 w-full max-w-md space-y-5 animate-fade-in-scale"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Novo Link</h3>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-purple-300 hover:text-white hover:bg-white/20 transition-all"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-purple-200/70 mb-2">Título</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type="text"
                  placeholder="Ex: Meu Canal do YouTube"
                  className="w-full p-3.5 rounded-xl bg-white/10 border border-purple-500/30 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-purple-200/70 mb-2">URL</label>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  type="url"
                  placeholder="https://..."
                  className="w-full p-3.5 rounded-xl bg-white/10 border border-purple-500/30 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all btn-shimmer"
              >
                <i className="fas fa-plus mr-2"></i>
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 glass text-purple-200 rounded-xl hover:bg-white/20 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
