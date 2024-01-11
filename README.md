# GymPass style App

Utilizaremos o Prisma ORM para gerenciar a base de dados que nesse caso escolhemos o postgresql.
A base de dados vai ficar no docker.

Foi implementando seguindo os princípios do SOLID e teste unitário e alguns padrões de projeto.

Para os testes eslhi o framework vitest. [Link para o NPM](tps://www.npmjs.com/package/vitest)

Significado de cada letra do S.O.L.I.D:
> **S** -
  **O** -
  **L** -
  **I** -
  **D** - Depency inversion (Inversão de dependência)

Segue os padrões implementados:

* Repository Pattern
  - O padrão de projeto Factory Method [1] é um dos vinte e três padrões de projeto bem conhecidos que descrevem como resolver problemas recorrentes de projeto para projetar software orientado a objetos flexível e reutilizável, ou seja, objetos que são mais fáceis de implementar, alterar, testar e reutilizar.

* Factory Pattern
  - Faz a mediação entre o domínio e as camadas de mapeamento de dados usando uma interface semelhante a uma coleção para acessar objetos de domínio. É um padrão que utilizamos nos testes para para a repeticção de código ao chamar as instências dos repositórios e etc.

---

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Bibliotecas

TypeScript e a tipagem

```sh
  npm i typescript @types/node tsx tsup -D
```

Instalar o fastfy (servidor web)

```sh
  npm i fastify
```

Teste

```sh
  npm i vitest vite-tsconfig-paths -D
```
_Para mais informações de configuração ir para a sessão [Testes](###Testes)_

## Configuração

---

### Projeto

Criar o arquivo tsconfig.json
```sh
  npx tsc --ini
```

Mudar o targei para uma versão mais recente do Ecmascript `"target": "es2020",`

String de conexão com a base de dados:

- PostgreSQL

```
postgresql://docker:docker@127.0.0.1:5432/gym-anywhere?schema=public
```

### ORM

Vamos utilizar o prisma ORM e iniciar com o segiunte comando:

```sh
  npx prisma init
```

Depois vamos configurar o seguinte:

  1. Instalar a extensão do prisma no VsCode.

  2. Ajustar o arqivo settings.json do VSCode para quando salvar um arquivo do tipo prisma, ele tente formatar o arquivo.

  ```json
  "[prisma]": {
      "editor.formatOnSave": true
    }
  ```
  
  3. Iniciar o prisma.

  ```sh
    npx prisma init
  ```

  4. Gerar o prisma depois de criar as models

  ```sh
    npx prisma generate
  ```

### ESlint

Usando as configruações da rocketseat

### Docker

Comando para criar o container.

```sh
  docker run --name gym-anywhere -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=gym-anywhere -p 5432:5432 bitnami/postgresql
```

### Testes

Vamos utilizar a biblioteca `vite-tsconfig-paths` para configurar o `vitest` aceitar as configurações do `tsconfig`.
Existe uma parte visual apra visualizar e rodar o teste utlizando a biblioteca di vitest.
O nome da biblioteca é `vitest ui`
