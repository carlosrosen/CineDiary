# 🎞️ CineDiary

O CineDiary é uma aplicação web desenvolvida para as pessoas que gostam de cinema e séries, permitindo que usuários organizem e registrem suas avaliações de forma organizada. O sistema conta com funcionalidades completas de CRUD (Create, Read, Update, Delete) para as avaliações. Este projeto foi desenvolvido com foco na aplicação prática de desenvolvimento web, utilizando React no frontend e Node.js com Express no backend.

## Funcionalidades

- Cadastro de avaliações de filmes e séries
- Listagem das avaliações cadastradas
- Edição de avaliações existentes
- Exclusão de avaliações
- Armazenamento de dados persistente através de uma API REST (JSON)

## Tecnologias utilizadas:

**Frontend:**
- React.js (com Vite)
- React Router DOM
- CSS3
- JavaScript

**Backend:**
- Node.js
- Express
- UUID 
- File System 

## Estrutura do projeto

```text
CineDiary/
├── CineDiary/                 # Frontend (React + Vite)
│   ├── public/                # Arquivos estáticos
│   ├── src/                   # Código fonte do React
│   │   ├── components/        # Pastas isoladas para cada componente
│   │   │   ├── CardAvaliacao/ # Ex: Componente.jsx + Componente.css
│   │   │   └── ...            
│   │   ├── context/           # ContextAPI 
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── styles/            # Estilos globais e das páginas
│   │   └── App.jsx            # Componente raiz
│   ├── index.html             # HTML principal
│   ├── package.json           # Dependências do frontend
│   └── vite.config.js         # Configuração do Vite
├── CineDiary-API/             # Backend (Node.js + Express)
│   ├── db.js                  # Lógica de manipulação do banco de dados em JSON
│   ├── routes.js              # Definição das rotas da API REST
│   ├── server.js              # Inicialização do servidor Express
│   └── package.json           # Dependências do backend
└── README.md                  
```

## Pré-requisitos:

Antes de executar o projeto, é necessário ter instalado:
- Node.js
- npm

## Instalação e execução:

### 1. Clone o repositório:

```bash
git clone https://github.com/carlosrosen/CineDiary.git
```

### 2. Executando o backend (API):

Acesse a pasta do backend a partir da raiz do projeto:

```bash
cd CineDiary-API
```

Instale as dependências:

```bash
npm install
```

Inicie a API:

```bash
npm run dev
```

### 3. Executando o frontend:

Abra uma **nova aba de terminal** na raiz do projeto e acesse a pasta do frontend:

```bash
cd CineDiary
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

## Colaboradores

- Carlos Eduardo (https://github.com/carlosrosen)
- Davi Roberto (https://github.com/Davi-Robert)
