<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-purple-700 text-white p-4 flex space-x-6">
      <router-link to="/" class="hover:underline">Home</router-link>
      <router-link to="/links" class="hover:underline">Links</router-link>
    </nav>
    <main class="p-6 max-w-4xl mx-auto">
      <router-view />
    </main>
  </div>
</template>
