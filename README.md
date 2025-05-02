# HRCe E-commerce

Este repositorio contem a base de codigo para o frontend do HRCe Store para os clientes finais.

## Tecnologias Utilizadas

- TypeScript
- NextJS
- ReactJS
- TailwindCSS (framework para estilos css)
- NPM
- Zod (para validação de dados)
- React Hook Form (para formularios)
- lucide-react (para icons)

## Instalação

1. Clone este repositório na sua maquina
2. Na raiz do projeto, no terminal digite: `npm install`
3. `npm run dev`
4. abra seu browser em [http://localhost:3000](http://localhost:3000) para ver o resultado

### Rodar em ambiente de desenvolvimento

`npm run dev`

### Rodar em ambiente de testes e produção

1. `npm run build`
2. `npm run start`

## Estrutura de pastas e boas praticas para o desenvolvimento

- **src/api** => url do api do backend e funcoes e metodos reutilizaveis ao acesso ao backend

- **src/app** => todas as paginas/rotas do site, as rotas sao definidas por pastas, e os pertencentes ao raiz de /app ou entre pasta com nome entre "()" e o index (a pagina em si, ou pelomenos o main da rota) de page.tsx
  por exemplo:

  - app/(auth)/cadastro é acedido por "localhost:3000/cadastro"
  - app/(home) é acedido por "localhost:3000/"

- **src/componentes**
  os componentes _react_ reutilizaveis por varias paginas são definidas nesta pasta.

- **src/styles** => os styles css ou estilos tailwind r como variaveis eutlizados por varias partes e componentes são definidos aqui

- **src/types** => para facilitar integracao e conexao de backend e frontend, os tipos dos objetos enviados e recebidos podem ser declaradas aqui. e tambem os outro tipos internos reutilizados.

## Continuação do Desenvolvimento

- Nunca copiar codigo de um componente e colar no outro sem necessida

- Nunca dar commit diretamente na main, para cada nova funcionalidade para desenvolver e integrar no sistema, a pratica é criar uma nova branch com o nome da funcionalidade, e depois de testar e tudo esteja em ordem para integrar a funcionalidade em produção, faz push request para a branch **staging** e marca um outro desenvolvedor como reviewer do codigo, e depois da outro desenvolvedor aprovar, a funcionalidade deve ser testada em ambiente de teste pelos stakeholdes e depois da aprovação geral da funcionalidade e garantia de nenhum bug e garatir boa integração com o resto do sistema, esta funcionalidade pode ser feita push request para main, e colocar a funcionalidade em produção.
