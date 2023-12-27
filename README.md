# App

GymPass style app.

---

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Bibliotecas

Bibliotecas para desenvolvimento

``npm i typescript @types/node tsx tsup -D``

Instalar o fastfy

``npm i fastify``

## Configuração

---

### Projeto

Criar o arquivo tsconfig.json
`npx tsc --ini`

Mudar o targei para uma versão mais recente do Ecmascript
`"target": "es2020",`

### ORM

Vamos utilizar o prisma ORM e iniciar com o segiunte comando:

`npx prisma init`

Depois vamos configurar o seguinte:

  1. Instalar a extensão do prisma no VsCode.

  2. Ajustar o arqivo settings.json do VSCode para quando salvar um arquivo do tipo prisma, ele tente formatar o arquivo.
  
    > "[prisma]": {
        "editor.formatOnSave": true
      }
  
  3. Iniciar o prisma.

  `npx prisma init`

  4. Gerar o prisma depois de criar as models

  `npx prisma generate`

### ESlint

Usando as configruações da rocketseat
