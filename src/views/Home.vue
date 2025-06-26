<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12"
  >
    <div class="w-full max-w-md text-center">
      <!-- Imagem principal -->
      <img
        src="../assets/images/redes_sociais.jpg"
        alt="Redes sociais flutuando"
        class="w-full h-auto rounded-lg shadow-lg mb-6"
      />

      <!-- Título principal -->
      <h1 class="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900">
        Todos os seus links <br class="hidden sm:block" />
        em um só lugar
      </h1>

      <!-- Subtítulo -->
      <p class="text-gray-600 text-base sm:text-lg mb-6">
        Gerencie e compartilhe seus links de todas as redes sociais de forma
        simples e elegante.
      </p>

      <!-- Ícones sociais -->
      <div class="flex justify-center gap-4 text-3xl mb-8">
        <i class="fab fa-youtube text-red-600"></i>
        <i class="fab fa-twitter text-purple-600"></i>
        <i class="fab fa-instagram text-pink-500"></i>
        <i class="fab fa-facebook text-blue-600"></i>
        <i class="fab fa-tiktok text-black"></i>
      </div>

      <!-- Botão CTA -->
      <router-link
        to="/links"
        class="inline-block w-full bg-purple-600 text-white text-lg font-semibold py-4 rounded-xl shadow hover:bg-purple-700 transition-all"
      >
        Começar Agora
      </router-link>
    </div>
  </section>
</template>

<script setup>
// Nenhum JS necessário por enquanto
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
