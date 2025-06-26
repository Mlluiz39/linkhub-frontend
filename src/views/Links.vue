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
        class="bg-gray-100 p-4 rounded-lg"
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
                @click="startEdit(link)"
                class="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                @click="deleteLink(link.id)"
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

          <a
            :href="link.url"
            target="_blank"
            class="text-gray-500 hover:text-gray-700 ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 72 72"
              class="w-6 h-6"
              fill="#4401df"
              stroke="#4401df"
            >
              <g>
                <path
                  d="M24.014,70.462c-2.617,0-5.073-1.016-6.917-2.859L2.175,53.877c-1.908-1.906-2.926-4.364-2.926-6.979 
      s1.018-5.072,2.866-6.92c1.849-1.849,4.307-2.866,6.921-2.866c2.591,0,5.029,1,6.872,2.818l8.102,7.109L55.861,4.618 
      c0.057-0.075,0.119-0.146,0.186-0.213c1.849-1.85,4.307-2.867,6.921-2.867s5.072,1.018,6.921,2.867 
      c3.784,3.784,3.815,9.923,0.093,13.747L31.697,67.416c-0.051,0.065-0.106,0.128-0.165,0.188c-1.914,1.912-4.498,2.926-7.214,2.854 
      C24.216,70.46,24.116,70.462,24.014,70.462z M9.037,41.112c-1.546,0-2.999,0.602-4.093,1.695C3.851,43.9,3.25,45.353,3.25,46.898 
      s0.602,3,1.694,4.093l14.922,13.726c1.148,1.146,2.6,1.914,4.148,1.914l0.227,0.164c0.05,0,0.1,0,0.151,0l0.221-0.164 
      c1.51,0,2.929-0.654,4.008-1.69l38.275-49.294c0.051-0.065,0.105-0.148,0.165-0.207c2.256-2.258,2.256-5.939,0-8.195 
      c-1.094-1.094-2.547-1.701-4.093-1.701c-1.502,0-2.917,0.566-3.999,1.602L25.914,51.169c-0.335,0.445-0.84,0.73-1.394,0.787 
      c-0.551,0.057-1.106-0.118-1.525-0.486l-9.771-8.573c-0.032-0.028-0.064-0.058-0.095-0.089 
      C12.036,41.714,10.583,41.112,9.037,41.112z"
                ></path>
              </g>
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
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const title = ref('')
const url = ref('')
const search = ref('')
const links = ref([])
const showAddForm = ref(false)

const editingLink = ref(null)
const editedTitle = ref('')
const editedUrl = ref('')

async function loadLinks() {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false })
  if (!error) {
    links.value = data
  } else {
    console.error('Erro ao carregar links:', error)
  }
}

async function addLink() {
  const { data, error } = await supabase
    .from('links')
    .insert([{ title: title.value, url: url.value }])
    .select()
  if (!error && data.length) {
    links.value.unshift(data[0])
    title.value = ''
    url.value = ''
    showAddForm.value = false
  } else {
    console.error('Erro ao adicionar link:', error)
  }
}

function startEdit(link) {
  editingLink.value = link
  editedTitle.value = link.title
  editedUrl.value = link.url
}

async function saveEdit() {
  const { data, error } = await supabase
    .from('links')
    .update({ title: editedTitle.value, url: editedUrl.value })
    .eq('id', editingLink.value.id)
    .select()

  if (!error && data.length) {
    const index = links.value.findIndex(l => l.id === editingLink.value.id)
    links.value[index] = data[0]
    editingLink.value = null
  } else {
    console.error('Erro ao atualizar link:', error)
  }
}

async function deleteLink(id) {
  const { error } = await supabase.from('links').delete().eq('id', id)
  if (!error) {
    links.value = links.value.filter(link => link.id !== id)
  } else {
    console.error('Erro ao excluir link:', error)
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
