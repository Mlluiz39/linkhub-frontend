import { useState, useEffect } from 'react';
import api from '../lib/api';
import '../style.css';

export default function LinksPage() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [search, setSearch] = useState('');
  const [links, setLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    try {
      const { data } = await api.get('/links');
      setLinks(Array.isArray(data.links) ? data.links : []);
    } catch (err) {
      console.error('Erro ao carregar links:', err);
      setLinks([]);
    }
  }

  async function addLink(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/links', { title, url });
      const created = data?.link ?? data;
      if (created) setLinks([created, ...links]);
      setTitle('');
      setUrl('');
      setShowAddForm(false);
    } catch (err) {
      console.error('Erro ao adicionar link:', err);
    }
  }

  function startEdit(link) {
    setEditingLink(link);
    setEditedTitle(link.title);
    setEditedUrl(link.url);
  }

  async function saveEdit() {
    if (!editingLink) return;
    try {
      const { data } = await api.put(`/links/${editingLink.id}`, {
        title: editedTitle,
        url: editedUrl,
      });
      const updated = data?.link ?? data;
      setLinks(links.map(l => (l.id === editingLink.id ? updated : l)));
      setEditingLink(null);
    } catch (err) {
      console.error('Erro ao salvar edição:', err);
    }
  }

  async function deleteLink(id) {
    try {
      await api.delete(`/links/${id}`);
      setLinks(links.filter(link => link.id !== id));
    } catch (err) {
      console.error('Erro ao excluir link:', err);
    }
  }

  function handleCardClick(e, link) {
    if (
      e.target.closest('button') ||
      ['INPUT', 'TEXTAREA'].includes(e.target.tagName) ||
      (editingLink && editingLink.id === link.id)
    ) return;
    window.open(link.url, '_blank');
  }

  const filteredLinks = links.filter(l =>
    (l.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.url || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-20 px-4 w-full max-w-screen-md md:max-w-3xl lg:max-w-4xl mx-auto">
      <header className="flex justify-between items-center py-6">
        <div>
          <h1 className="text-3xl lg:text-4xl text-blue-700 font-bold">LinkHub</h1>
          <p className="text-gray-500 text-sm lg:text-base -mt-1">Gerencie seus links</p>
        </div>
      </header>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquisar links..."
          className="flex-grow p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full sm:w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 text-xl"
        >
          +
        </button>
      </div>
      {showAddForm && (
        <form onSubmit={addLink} className="mb-6 space-y-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Título do link"
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            type="url"
            placeholder="URL do link"
            className="w-full p-3 border rounded-lg"
            required
          />
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Salvar link
          </button>
        </form>
      )}
      <h2 className="font-bold text-xl lg:text-2xl text-blue-700 mb-4">Links Recentes</h2>
      <ul className="space-y-4">
        {filteredLinks.map(link => (
          <li
            key={link.id}
            className="bg-gray-100 p-4 rounded-lg cursor-pointer"
            onClick={e => handleCardClick(e, link)}
          >
            <div className="flex gap-4 items-start">
              {link.url.includes('youtube') && <img src="/icons/youtube.svg" className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />}
              {link.url.includes('facebook') && <img src="/icons/facebook.svg" className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />}
              {link.url.includes('tiktok') && <img src="/icons/tiktok.svg" className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />}
              {link.url.includes('instagram') && <img src="/icons/instagram.svg" className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />}
              <div className="flex-1">
                <h3 className="font-semibold text-base lg:text-lg">{link.title}</h3>
                <p className="text-sm text-gray-600 break-all">{link.url}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={e => { e.stopPropagation(); startEdit(link); }}
                    className="text-sm text-blue-600 hover:underline"
                  >Editar</button>
                  <button
                    onClick={e => { e.stopPropagation(); deleteLink(link.id); }}
                    className="text-sm text-red-600 hover:underline"
                  >Excluir</button>
                </div>
                {editingLink && editingLink.id === link.id && (
                  <div className="mt-4 space-y-2">
                    <input
                      value={editedTitle}
                      onChange={e => setEditedTitle(e.target.value)}
                      type="text"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editedUrl}
                      onChange={e => setEditedUrl(e.target.value)}
                      type="url"
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      >Salvar</button>
                      <button
                        onClick={() => setEditingLink(null)}
                        className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
                      >Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {filteredLinks.length === 0 && (
        <p className="text-center text-gray-500 mt-12">Nenhum link encontrado.</p>
      )}
    </div>
  );
}
