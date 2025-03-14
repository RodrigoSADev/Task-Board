# TaskBoard

O TaskBoard é uma aplicação para gerenciar tarefas, permitindo adicionar, editar, remover e filtrar tarefas por categoria.

## Tecnologias

As principais tecnologias utilizadas neste projeto são:

- Angular 19
- Angular Material
- RxJS
- Jest
- TypeScript
- SCSS

## Funcionalidades

Este projeto possui as seguintes funcionalidades:

- Adicionar, editar e remover tarefas
- Filtrar tarefas por categoria
- Animações de entrada e saída para tarefas
- Validação de formulários
- Interface responsiva e amigável

## Docker

Este projeto inclui um `Dockerfile` e um `docker-compose.yml` para facilitar a criação e execução de contêineres Docker.

### Construindo a imagem Docker

Para construir a imagem Docker, execute o seguinte comando na raiz do projeto:

```sh
docker build -t task-board:v1 .
```

### Executando o contêiner Docker

Para executar o contêiner Docker, utilize o `docker-compose` com o seguinte comando:

```sh
docker-compose up
```

A aplicação estará disponível em `http://localhost:8080/`.

## CI/CD

Este projeto utiliza uma pipeline de CI/CD configurada no GitHub Actions. A pipeline é composta por dois jobs principais:

- **CI (Continuous Integration)**: Executa testes e build do projeto em cada push ou pull request na branch `main`.
- **CD (Continuous Deploy)**: Após a conclusão do job de CI, o projeto é implantado automaticamente no Vercel.

## Conventional Commits

Este projeto utiliza o padrão de conventional commits ([Conventional Commits](https://www.conventionalcommits.org/)) para manter um histórico de commits claro e consistente.

## Como rodar o projeto na sua máquina

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

    Node.js (versão 18 ou superior)
    Angular CLI (versão 18 ou superior)

### Configuração do projeto

Siga os passos abaixo para configurar o projeto em sua máquina:

Clone o repositório para o seu ambiente local: ```git clone https://github.com/RodrigoSADev/Task-Board```

Navegue até o diretório do projeto: ```cd nome-do-repositorio```

Instale as dependências do projeto: ```npm install```

### Executando o projeto

Após a configuração, você pode executar o projeto localmente. Utilize o seguinte comando: `ng serve`

A aplicação estará disponível em `http://localhost:4200/`. A página será recarregada automaticamente sempre que houver alterações no código.

## Executando Testes Unitários

Execute o comando `npm run test` para executar os testes unitários via [Jest](https://jestjs.io/pt-BR/).

![Captura de tela de 2025-03-14 09-47-40](https://github.com/user-attachments/assets/7c958d97-fe6a-4c24-ac6d-25fa9dd20507)

## Screenshots

![Captura de tela de 2025-03-14 10-15-36](https://github.com/user-attachments/assets/46022a14-f82c-4fe5-8a97-a2e8499a1f37)

![Captura de tela de 2025-03-14 10-32-53](https://github.com/user-attachments/assets/850d97c3-cb61-4325-9edd-c529979ebcfd)


