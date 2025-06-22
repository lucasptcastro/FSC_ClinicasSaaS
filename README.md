### Anotações

---

### Conceitos

- URL State: refere-se à prática de armazenar informações do estado atual da aplicação diretamente na URL do navegador, geralmente por meio de query strings, path parameters ou hash fragments. Isso é muito comum em aplicações web modernas com SPA (Single Page Application), como as feitas com React, Vue ou Angular.

- Compound Components: é um padrão avançado em React onde um componente "pai" expõe seus "filhos" como partes reutilizáveis e específicas, mantendo uma interface declarativa e organizada. É a forma de fragmentar um componente em várias partes.

- Conventional Commits: é um padrão para escrever mensagens de commit de forma estruturada e semântica. Ele define uma convenção simples e legível por humanos e por máquinas para que cada commit indique claramente a intenção da mudança no código.

- Cache Aside: é uma estratégia de cache em que o aplicativo verifica primeiro o cache antes de acessar o banco de dados (este conceito está sendo utilizado no projeto)

### Next

- É importante tratar as server actions como rotas de api, sendo assim é necessário protegê-las para que não sejam acessadas por usuários não autenticados (já que geralmente as rotas de api estão conectadas ao banco de dados)

- A pasta (protected) em "src/app/(protected)" serve para agrupar rotas, sem criar uma rota para isso. Ou seja, para acessar a página dashboard que está dentro desta pasta, basta acessar localhost/dashboard e não localhost/protected/dashboard. É uma ótima alternativa para agrupar rotas e adicionar um arquivo layout.tsx exclusivo para esse grupo de rotas. Para funcionar, basta criar uma pasta com o nome do grupo entre parentêses e adicionar as rotas dentro dela

- A pasta \_constants em "src/app/(protected)/doctors/\_constants" serve para guardar dados estáticos que não vão mudar

### Better Auth

Better Auth é uma biblioteca de autenticação e autorização abrangente para TypeScript que se destaca por ser Framework-agnóstica, ou seja, compatível com vários frameworks como React, Vue, Svelte, Astro, Solid, Next.js, Nuxt e outros. E também pode ser integrada em qualquer projeto TypeScript

### Next Safe Action

É uma ferramenta voltada para aplicações Next.js que ajuda a executar ações do lado do servidor (server actions) de forma segura e tipada, com foco em:

- Segurança:

  - Evita execução não autorizada de ações do servidor que poderiam ser chamadas por qualquer pessoa com acesso ao endpoint.

  - Ele faz isso validando que a requisição foi feita corretamente a partir do cliente da aplicação (não diretamente via cURL, por exemplo).

- Tipagem de ponta a ponta (end-to-end):

  - Usa o TypeScript para garantir que tanto o cliente quanto o servidor concordem com os tipos de entrada e saída das ações.

  - Isso reduz erros comuns, como enviar dados incorretos ou lidar mal com respostas.

- Validação de dados (com zod):

  - Suporta integração com bibliotecas como zod para validar os parâmetros da ação antes da execução no servidor.

### Drizzle

É um Object-Relational Mapper (ORM) moderno para TypeScript/JavaScript focado em performance, segurança de tipos e simplicidade. Ele permite que você interaja com bancos de dados SQL (como PostgreSQL, MySQL, SQLite) usando uma API totalmente tipada e baseada em código — ou seja, sem mágica, sem strings de SQL soltas e com autocompletar inteligente direto no editor.

### Stripe

### ChatGPT

### ShadCN

- No arquivo "./src/app/(protected)/dashboard/\_components/appointments-chart" tem um modelo de chart

### Nuqs

É usada para sincronizar o estado da sua aplicação React com a URL (query string) de forma simples e declarativa.

Ela é especialmente útil quando você quer que o estado da aplicação (como filtros, paginação, abas, etc.) fique refletido na URL — assim o usuário pode:

- Compartilhar links com o estado atual da aplicação (ex: filtros aplicados);
- Voltar e avançar no histórico do navegador mantendo o estado correto;
- Recarregar a página sem perder o que estava selecionado.

### Cursor rules

Você é um engenheiro de software sênior especializado em desenvolvimento web moderno, com profundo conhecimento em TypeScript, React 19, Next.js 15 (App Router), Postgresql, Drizzle, shadcn/ui e Tailwind CSS. Você é atencioso, preciso e focado em entregar soIuções de alta qualidade e fáceis de manter.

Tecnologias e ferramentas utilizadas:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form para formulários
- Zod para validaçóes
- BetterAuth para autenticação PostgreSQL como banco de dados
- drizzle como ORM

Princípios Principais:

- Escreva um código conciso e fácil de manter, seguindo princípios do SOLID e Clean Code
- Use nomes de variáveis descritivos (exemplos: isLoading, hasError)
- use kebab-case para nomes de pastas e arquivos
- Sempre use TypeScript para escrever código
- DRY (Don't Repeat Yourself). Evite duplicidade de código. Quando necessário, crie funções/componentes reutilizáveis

React/Next.js

- Sempre use Tailwind para estilização.
- Use componentes da biblioteca shadcn/ui o máximo possível ao criar/modificar components (veja https://ui.shadcn.com/ para a lista de componentes disponíveis).
- Sempre use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários. Use o componente [form.tsx](mdc:src/components/ui/form.tsx) para criar esses formulários. Exemplo: [upsert-doctor-form.tsx](<mdc:src/app/(protected)/doctors/_components/upsert-doctor-form.tsx>).
- Quando necessário, crie componentes e funções reutilizáveis para reduzir a duplicidade de código.
- Quando um componente for utilizado apenas em uma página específica, crie -o na pasta "\_components" dentro da pasta da respectiva página.
- Sempre use a biblioteca "next-safe-action" ao criar com Server Actions. Use a Server Exemplo: [index.ts](mdc:src/actions/upsert-doctor/index.ts).
- Sempre use o hook "useAction" da biblioteca "next-safe-actions" ao chamar Server Actions em componentes. Exemplo: [upsert-doctor-form.tsx](<mdc:src/app/(protected)/doctors/_components/upsert-doctor-form.tsx>).
- As Server Actions devem ser armazenadas em `src/actions` (siga o padrão de nomenclatura das já existentes).
- Sempre que for necessário interagir com o banco de dados, use o [index.ts](mdc:src/db/index.ts).
- Usamos a biblioteca "dayjs" para manipular e formatar datas.
- Ao criar páginas, use os componentes dentro de [page-container.tsx](mdc:src/components/ui/page-container.tsx) para manter os padrões de margin, padding e spacing nas páginas. Exemplo: [page.tsx](<mdc:src/app/(protected)/doctors/page.tsx>).
- Sempre use a biblioteca "react-number-format" ao criar máscaras para inputs.
