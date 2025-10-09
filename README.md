# LinkHub

Um gerenciador de links moderno e responsivo construído com React, permitindo que você organize e acesse seus links favoritos de forma eficiente.

## 🚀 Funcionalidades

- ✅ Autenticação de usuários com Google OAuth
- 📝 Criar, editar e excluir links
- 🔍 Pesquisa em tempo real de links por título ou URL
- 🎨 Interface moderna e responsiva com TailwindCSS
- 📱 Progressive Web App (PWA) - instalável em dispositivos móveis
- 🔒 Autenticação JWT com interceptors Axios
- 🎯 Ícones personalizados para plataformas populares (YouTube, Facebook, Instagram, TikTok)

## 🛠️ Tecnologias

- **React 19** - Biblioteca JavaScript para interfaces de usuário
- **React Router DOM** - Navegação entre páginas
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para requisições à API
- **Google OAuth** - Autenticação via Google
- **Vite PWA** - Plugin para Progressive Web App

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend da aplicação rodando (API REST)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Mlluiz39/linkhub-frontend.git
cd linkhub-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente conforme necessário (se aplicável).

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza o build de produção localmente
```

## 🌐 API Backend

A aplicação consome uma API REST hospedada em:
```
https://api.mlluizdevtech.com.br
```

### Endpoints principais:
- `GET /links` - Lista todos os links do usuário
- `POST /links` - Cria um novo link
- `PUT /links/:id` - Atualiza um link existente
- `DELETE /links/:id` - Remove um link

## 📱 Progressive Web App

O LinkHub é uma PWA completa, permitindo:
- Instalação no dispositivo
- Funcionamento offline (service worker)
- Experiência similar a app nativo
- Atualizações automáticas

## 🎨 Estrutura do Projeto

```
linkhub-frontend/
├── public/               # Arquivos estáticos
│   └── icons/           # Ícones de plataformas
├── src/
│   ├── assets/          # Recursos e imagens
│   ├── lib/             # Utilitários e configurações
│   │   ├── api.js       # Cliente Axios configurado
│   │   ├── AuthContext.jsx
│   │   └── AuthWrapper.jsx
│   ├── views/           # Componentes de página
│   │   ├── Home.jsx
│   │   ├── Links.jsx
│   │   └── Login.jsx
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Ponto de entrada
│   └── style.css        # Estilos globais
├── index.html           # HTML principal
├── vite.config.js       # Configuração do Vite
├── tailwind.config.js   # Configuração do Tailwind
└── package.json         # Dependências e scripts
```

## 🔐 Autenticação

A aplicação utiliza:
- **Google OAuth** para login
- **JWT (JSON Web Token)** para manter sessões
- Tokens armazenados em `localStorage`
- Interceptor Axios para adicionar token automaticamente nas requisições

## 🚀 Deploy

O projeto está configurado para deploy no Netlify:
- Configuração em `netlify.toml`
- Redirecionamento SPA configurado
- Build automático via Vite

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👤 Autor

**Marcos Luiz**
- GitHub: [@Mlluiz39](https://github.com/Mlluiz39)

---

Desenvolvido com ❤️ usando React e Vite
