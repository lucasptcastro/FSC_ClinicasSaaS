### Anotações

---

### React

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

### Stripe

### ChatGPT

### ShadCN
