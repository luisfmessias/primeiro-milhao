# Calculadora do Primeiro Milhão

Sistema fullstack.  
A aplicação simula investimentos até atingir **R$ 1.000.000,00** utilizando aportes mensais e juros compostos.

---
**NECESSÁRIO: Node.JS e GIT**


## Tecnologias Utilizadas
- **Frontend:** [Next.js 13+](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/)  
- **Backend/API:** Node.js + TypeScript (API Routes)  
- **Banco de Dados/ORM:** [PostgreSQL](https://www.postgresql.org/) (ou SQLite para testes) + [Prisma ORM](https://www.prisma.io/)  

---



##  Como rodar localmente

### 1. Clonar o repositório

Dentro do vs code abra o terminal e digite:

```
git clone https://github.com/luisfmessias/primeiro-milhao.git

cd primeiro-milhao
```


Abra a pasta criada

### 2. Instalar dependências

Detro da pasta criada, abra o terminal e digite:

```
npm install
```

### 3. Configurar variáveis de ambiente

**Antes de rodar qualquer comando do Prisma, crie o arquivo `.env` na raiz do projeto (mesmo nivel do package.json, etc...).**

Dentro do arquivo .env que você criou, coloque:


DATABASE_URL="file:./dev.db"

JWT_SECRET=segredo_super_forte


- Certifique-se de que o nome do arquivo seja exatamente `.env` (sem `.txt` ou outras extensões).
- Se quiser usar PostgreSQL, altere o `DATABASE_URL` conforme necessário.


### 4. Preparar o banco de dados

```
npx prisma migrate dev
npx prisma generate
```

Se aparecer erro de variável de ambiente, confira se o arquivo `.env` existe e está correto.

### 5. Rodar aplicação

```
npm run dev
```


Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

Digite:
```
npx prisma studio
```
Para abrir o banco de dados no navegadror.
