<h1 align="center">
  A API Find A Pet é uma aplicação back-end desenvolvida como resolução de um desafio referente ao módulo API Node.js com SOLID da formação Node.js da <a href="https://app.rocketseat.com.br/home">Rocketseat</a>.
</h1>

<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge" alt="License"></a>
</p>

---

## 📁 Sobre o projeto

A aplicação desenvolvida consiste em uma API para adoção de animais e foi aplicada boas práticas de código limpo, padrão de arquitetura e de projeto bem como conceitos do SOLID e testes.
Foi de grande importância o desenvolvimento desta aplicação, pois pude colocar em prática todos os conceitos aprendidos no módulo estudado. Encontrei algumas dificuldades durante o desenvolvimento,
mas realizei consultas e desta forma chegando a resolução do problema. 

---

## 📝 Regras da aplicação

- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG
- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção

---

## 📝 Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

---

## Requisitos

- Node.js versão 20 ou superior;
- Docker.

---

## 💻 Tecnologias utilizadas

- Fastify
- Fastify JWT
- Prisma
- PostgreSQL
- Zod
- Docker
- Typescript
- Dotenv
- Dayjs
- Fakerjs
- Vitest

---

## 💡 Utilização
1. Clone o projeto:

```
$ git clone https://github.com/JaasielAntunes/find-a-pet-api-challenge.git
```

2. Acesse a pasta do projeto:

```
$ cd find-a-pet-api-challenge
```

3. Instale as dependências:

```
$ npm install
```

4. Execute:

```
$ docker compose up -d
```

```
$ npm run migrate:run
```

5. Inicie o servidor:

```
$ npm run dev
```

## 💻 Rotas HTTP

### POST `/orgs/pets`

Cadastrar um Pet

#### Corpo da requisição

```json
{
  "name": "Bino",
  "about": "Bino é um gatinho brincalhão e dorme muito também.",
  "age": "1",
  "type": "Gato",
  "breed": "Siamês",
  "org_id": "7c4d766e-f2a3-46b2-ae04-6bb34eaaf6d8"
}
```

### POST `/orgs`

Cadastrar uma ORG

#### Corpo da requisição

```json
{
  "name": "Pet Lover´s",
  "author_name": "Jhon",
  "email": "teste@gmail.com",
  "password": "1234567",
  "whatsapp": "+15555555555",
  "city": "Salvador",
  "state": "Bahia",
  "street": "rua teste",
  "cep": "10001",
  "latitude": -27.2092052,
  "longitude": -40.6401091
}
```

### GET `/orgs/find-all`

Retorna todas as ORGs cadastradas.

### POST `/orgs/authenticate`

Autenticação de uma ORG cadastrada.

### GET `/orgs/nearby`

Busca de uma ORG próxima informando latitude e longitude como parâmetros.

### GET `/orgs/pets`

Listagem de Pets disponíveis em uma cidade informando a cidade (city) como parâmetro.

### GET `/orgs/pets/:petId`

Busca de um Pet pelo ID.

---

## ✅ Sugestão
- Utilize o Postman ou Insomnia para testar as requisições.
---

<h4 align="center">
  Feito com ❤️ por Jaasiel Antunes - <a href="mailto:contato.jaasiel@gmail.com.com">Entre em contato!</a>
</h4>

<p align="center">
  <a href="https://www.linkedin.com/in/jaasiel-antunes-1517b41bb/">
    <img alt="Jaasiel Antunes" src="https://img.shields.io/badge/LinkedIn-Jaasiel-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
