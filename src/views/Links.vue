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

    <!-- Filtros -->
    <div class="flex flex-wrap gap-2 mb-6 sm:overflow-x-auto no-scrollbar">
      <button
        class="bg-purple-600 text-white px-4 py-2 rounded-full whitespace-nowrap"
      >
        Todos
      </button>
      <button
        class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full whitespace-nowrap"
      >
        YouTube
      </button>
      <button
        class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full whitespace-nowrap"
      >
        Instagram
      </button>
      <button
        class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full whitespace-nowrap"
      >
        Facebook
      </button>
      <button
        class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full whitespace-nowrap"
      >
        TikTok
      </button>
    </div>

    <!-- Lista de Links -->
    <h2 class="font-bold text-xl lg:text-2xl text-blue-700 mb-4">
      Links Recentes
    </h2>
    <ul class="space-y-4">
      <li
        v-for="link in filteredLinks"
        :key="link.id"
        class="bg-gray-100 p-4 rounded-lg"
      >
        <div class="flex gap-4 items-start">
          <img
            v-if="link.url.includes('youtube')"
            src="/icons/youtube.svg"
            alt="YouTube"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <img
            v-else-if="link.url.includes('facebook')"
            src="/icons/facebook.svg"
            alt="Facebook"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <img
            v-else-if="link.url.includes('tiktok')"
            src="/icons/tiktok.svg"
            alt="TikTok"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <img
            v-else-if="link.url.includes('instagram')"
            src="/icons/instagram.svg"
            alt="Instagram"
            class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-base lg:text-lg">{{ link.title }}</h3>
            <p class="text-sm text-gray-600 break-all">{{ link.url }}</p>
          </div>
          <a
            :href="link.url"
            target="_blank"
            class="text-gray-500 hover:text-gray-700 ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 3h7m0 0v7m0-7L10 14"
              />
            </svg>
          </a>
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
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const title = ref('')
const url = ref('')
const search = ref('')
const links = ref([])
const showAddForm = ref(false)

async function loadLinks() {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) {
    links.value = data
  } else {
    if (error.status === 404) {
      links.value = []
    }
    console.error('Erro ao carregar links:', error)
  }
}

async function addLink() {
  const { data, error } = await supabase
    .from('links')
    .insert([{ title: title.value, url: url.value }])
    .select()

  if ((error, data)) {
    links.value.unshift(data[0]) // Adiciona o novo link no início da lista
    title.value = ''
    url.value = ''
    showAddForm.value = false
  } else {
    console.error('Erro ao adicionar link:', error)
  }
}

const filteredLinks = computed(() => {
  return links.value.filter(
    link =>
      link.title.toLowerCase().includes(search.value.toLowerCase()) ||
      link.url.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(() => {
  loadLinks()
})
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
