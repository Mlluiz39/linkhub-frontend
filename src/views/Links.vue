<template>
  <div
    class="pb-20 px-4 w-full max-w-screen-md md:max-w-3xl lg:max-w-4xl mx-auto"
  >
    <!-- Header -->
    <header class="flex justify-between items-center py-6">
      <div>
        <h1 class="text-3xl lg:text-4xl text-blue-700 font-bold">LinkHub</h1>
        <p class="text-gray-500 text-sm lg:text-base -mt-1">
          Gerencie seus links
        </p>
      </div>
    </header>

    <!-- Search & Add -->
    <div
      class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-6"
    >
      <input
        v-model="search"
        type="text"
        placeholder="Pesquisar links..."
        class="flex-grow p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        @click="showAddForm = !showAddForm"
        class="w-full sm:w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 text-xl"
      >
        +
      </button>
    </div>

    <!-- Add Form -->
    <form v-if="showAddForm" @submit.prevent="addLink" class="mb-6 space-y-2">
      <input
        v-model="title"
        type="text"
        placeholder="Título do link"
        class="w-full p-3 border rounded-lg"
        required
      />
      <input
        v-model="url"
        type="url"
        placeholder="URL do link"
        class="w-full p-3 border rounded-lg"
        required
      />
      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
      >
        Salvar link
      </button>
    </form>

    <!-- Lista de Links -->
    <h2 class="font-bold text-xl lg:text-2xl text-blue-700 mb-4">
      Links Recentes
    </h2>
    <ul class="space-y-4">
      <li
        v-for="link in filteredLinks"
        :key="link.id"
        class="bg-gray-100 p-4 rounded-lg cursor-pointer"
        @click="handleCardClick($event, link)"
      >
        <div class="flex gap-4 items-start">
          <img
            v-if="link.url.includes('youtube')"
            src="/icons/youtube.svg"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <img
            v-else-if="link.url.includes('facebook')"
            src="/icons/facebook.svg"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <img
            v-else-if="link.url.includes('tiktok')"
            src="/icons/tiktok.svg"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <img
            v-else-if="link.url.includes('instagram')"
            src="/icons/instagram.svg"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-base lg:text-lg">{{ link.title }}</h3>
            <p class="text-sm text-gray-600 break-all">{{ link.url }}</p>

            <!-- Edit Buttons -->
            <div class="flex justify-end gap-2 mt-2">
              <button
                @click.stop="startEdit(link)"
                class="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                @click.stop="deleteLink(link.id)"
                class="text-sm text-red-600 hover:underline"
              >
                Excluir
              </button>
            </div>

            <!-- Edit Form -->
            <div v-if="editingLink?.id === link.id" class="mt-4 space-y-2">
              <input
                v-model="editedTitle"
                type="text"
                class="w-full p-2 border rounded"
              />
              <input
                v-model="editedUrl"
                type="url"
                class="w-full p-2 border rounded"
              />
              <div class="flex gap-2">
                <button
                  @click="saveEdit"
                  class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Salvar
                </button>
                <button
                  @click="editingLink = null"
                  class="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- Vazio -->
    <p
      v-if="filteredLinks.length === 0"
      class="text-center text-gray-500 mt-12"
    >
      Nenhum link encontrado.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../lib/api'

const title = ref('')
const url = ref('')
const search = ref('')
const links = ref([])

const showAddForm = ref(false)
const editingLink = ref(null)
const editedTitle = ref('')
const editedUrl = ref('')

async function loadLinks() {
  try {
    const { data } = await api.get('/links')
    // Garante que sempre seja um array
    links.value = Array.isArray(data.links) ? data.links : []
  } catch (err) {
    console.error('Erro ao carregar links:', err)
    links.value = []
  }
}

async function addLink() {
  try {
    const { data } = await api.post('/links', {
      title: title.value,
      url: url.value,
    })
    const created = data?.link ?? data
    if (created) links.value = [created, ...links.value]
    title.value = ''
    url.value = ''
    showAddForm.value = false
  } catch (err) {
    console.error('Erro ao adicionar link:', err)
  }
}

function startEdit(link) {
  editingLink.value = link
  editedTitle.value = link.title
  editedUrl.value = link.url
}

async function saveEdit() {
  if (!editingLink.value) return
  try {
    const { data } = await api.put(`/links/${editingLink.value.id}`, {
      title: editedTitle.value,
      url: editedUrl.value,
    })
    const updated = data?.link ?? data
    const idx = links.value.findIndex(l => l.id === editingLink.value.id)
    if (idx !== -1 && updated) links.value.splice(idx, 1, updated)
    editingLink.value = null
  } catch (err) {
    console.error('Erro ao salvar edição:', err)
  }
}

async function deleteLink(id) {
  try {
    await api.delete(`/links/${id}`)
    links.value = links.value.filter(link => link.id !== id)
  } catch (err) {
    console.error('Erro ao excluir link:', err)
  }
}

function handleCardClick(e, link) {
  if (
    e.target.closest('button') ||
    e.target.tagName === 'INPUT' ||
    e.target.tagName === 'TEXTAREA' ||
    editingLink.value?.id === link.id
  )
    return
  window.open(link.url, '_blank')
}

const filteredLinks = computed(() => {
  const q = (search.value || '').toLowerCase()
  return (links.value || []).filter(
    l =>
      (l.title || '').toLowerCase().includes(q) ||
      (l.url || '').toLowerCase().includes(q)
  )
})

onMounted(loadLinks)
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
