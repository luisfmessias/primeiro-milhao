# 💰 Calculadora do Primeiro Milhão

Sistema fullstack desenvolvido como desafio técnico para vaga de **Dev Full Stack Jr**.  
A aplicação simula investimentos até atingir **R$ 1.000.000,00** utilizando aportes mensais e juros compostos.

---

## 🚀 Tecnologias Utilizadas
- **Frontend:** [Next.js 13+](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)  
- **Backend/API:** Node.js + TypeScript (API Routes do Next.js ou Express/Nest)  
- **Banco de Dados/ORM:** [PostgreSQL](https://www.postgresql.org/) (ou SQLite para testes) + [Prisma ORM](https://www.prisma.io/)  

---

##  Como rodar localmente

### 1. Clonar o repositório

git clone https://github.com/luisfmessias/primeiro-milhao.git

cd primeiro-milhao

## 2. Instalar dependências

npm install

## 3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DATABASE_URL="file:./dev.db"

JWT_SECRET=segredo_super_forte

## 4. Preparar o banco de dados

npx prisma migrate dev

## 5. Rodar aplicação

npm run dev
