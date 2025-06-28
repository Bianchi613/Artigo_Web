# Artigo Web

Projeto fullstack para sistema acadêmico, com backend em NestJS e frontend em React.

## Estrutura do Projeto

```
artigo_web/
├── backend/        # API NestJS (Node.js, Sequelize, PostgreSQL)
├── frontend/       # React (JSX, Tailwind, Axios)
└── README.md       # Este arquivo
```

## Funcionalidades
- Backend em NestJS, com autenticação JWT, Sequelize e PostgreSQL
- Frontend em React, com Axios para consumo da API
- Estilização moderna com Tailwind CSS
- Estrutura de componentes organizada
- Tela Home e Login funcionais
- Login salva token e perfil do usuário (cliente ou administrador) no localStorage
- Navegação com React Router DOM
- Código limpo, sem arquivos de teste desnecessários

## Como rodar o projeto

### Backend
1. Entre na pasta `backend`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados PostgreSQL no `.env`
4. Rode a API:
   ```bash
   npm run start:dev
   ```
   A API ficará disponível em `http://localhost:3000`

### Frontend
1. Entre na pasta `frontend`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o React em uma porta diferente do backend (exemplo: 3001):
   - No Windows PowerShell:
     ```powershell
     $env:PORT=3001; npm start
     ```
   - Ou no cmd:
     ```cmd
     set PORT=3001 && npm start
     ```
   O frontend ficará disponível em `http://localhost:3001`

## Principais Telas
- **Home:** Apresentação do sistema, botão para login
- **Login:** Autenticação, integração com backend, salva token e perfil
- **Dashboard:** Exemplo de rota protegida após login

## Observações
- O frontend consome as APIs do backend em `/auth/login` e `/usuarios/me`
- O projeto está pronto para expansão: cadastro, dashboard, CRUD, etc.
- Estrutura de componentes e CSS organizada

---

Desenvolvido para fins acadêmicos. Para dúvidas ou sugestões, entre em contato.
