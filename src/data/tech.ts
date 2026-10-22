export const techIntro = {
  group: 'ENGENHARIA DE SOFTWARE',
  title: 'Além do código.',
  text: 'Plataformas SaaS, integrações entre sistemas e automações que conectam processos de negócio à tecnologia.',
  tags: ['Arquitetura', 'Integrações', 'Produção'],
};

export const techGroups: { title: string; items: [name: string, use: string][] }[] = [
  {
    title: 'BACK-END E ARQUITETURA',
    items: [
      ['Laravel', 'APIs REST de matrículas, assinaturas, transações e comissões, com arquitetura multi-tenant.'],
      ['PHP', 'Linguagem principal dos sistemas em produção, do site institucional à plataforma SaaS.'],
      ['APIs REST', 'Regras de negócio expostas para web e integrações, com autenticação e versionamento.'],
      ['Multi-tenancy', 'Uma plataforma, 250+ clientes, com dados e configurações isolados por cliente.'],
      ['Filas · Horizon', 'Processamento em segundo plano, monitorado pelo Horizon e mantido pelo Supervisor.'],
      ['Eventos e listeners', 'Ações disparadas por eventos do sistema, desacopladas da requisição.'],
      ['Swoole', 'Servidor WebSocket em PHP que leva os eventos do discador à tela do operador.'],
      ['Laravel Reverb', 'WebSockets nativos do Laravel para telas que atualizam em tempo real.'],
      ['CodeIgniter', 'Evolução de plataformas educacionais legadas, junto com Laravel e Vue.js.'],
    ],
  },
  {
    title: 'DADOS',
    items: [
      ['MySQL · Aurora', 'Banco de dados dos sistemas: Aurora MySQL na AWS e MySQL nos sites e painéis.'],
      ['PostgreSQL', 'Banco dos aplicativos mais recentes, com segurança por linha (RLS).'],
      ['Redis', 'Cache e filas para respostas rápidas e processamento em segundo plano.'],
      ['Otimização de queries', 'Índices e consultas ajustados para telas e relatórios com muitos dados.'],
      ['Excel e PDF', 'Importação e exportação de planilhas e geração de contratos e relatórios.'],
    ],
  },
  {
    title: 'FRONT-END',
    items: [
      ['Vue.js', 'Interfaces das plataformas educacionais e painéis com muita interação (Vue 3, e Vue 2 no legado).'],
      ['Nuxt', 'Aplicações Vue com renderização no servidor.'],
      ['TypeScript', 'Tipagem no front-end para mudar o código com segurança.'],
      ['Pinia', 'Estado compartilhado das aplicações Vue.'],
      ['Vite', 'Ambiente de desenvolvimento e build rápidos.'],
      ['Tailwind CSS', 'Interfaces consistentes e rápidas de construir.'],
      ['Astro', 'Sites estáticos e rápidos, como este portfólio.'],
      ['PWA · Web Push', 'Aplicativos web que instalam no celular e enviam avisos.'],
    ],
  },
  {
    title: 'CLOUD E DEVOPS',
    items: [
      ['AWS ECS', 'Deploy contínuo dos serviços em containers.'],
      ['EC2 · RDS', 'Servidores e bancos de dados gerenciados na AWS.'],
      ['S3 · CloudFront', 'Arquivos e vídeos armazenados e entregues por CDN.'],
      ['SQS · SES · Lambda', 'Filas, e-mails transacionais e funções sob demanda na AWS.'],
      ['MediaConvert', 'Conversão dos vídeos enviados para streaming em HLS.'],
      ['CloudWatch', 'Logs e métricas dos serviços em produção.'],
      ['Docker', 'Mesmo ambiente do desenvolvimento à produção.'],
      ['GitHub Actions', 'Pipelines de CI/CD com build e deploy automáticos.'],
      ['Nginx · Linux', 'Configuração e administração dos servidores.'],
      ['Cloudflare', 'Hospedagem e entrega rápida de sites e PWAs.'],
    ],
  },
  {
    title: 'PAGAMENTOS E FISCAL',
    items: [
      ['Pagar.me', 'Checkout customizado, assinaturas recorrentes, split, estornos e reconciliação.'],
      ['Stripe', 'Pagamentos internacionais.'],
      ['Split de pagamento', 'Cada venda dividida entre vários recebedores, com comissões de afiliados.'],
      ['Speedy', 'Integração fiscal, conectando as vendas ao processamento fiscal.'],
      ['Webhooks', 'Pagamentos confirmados, estornos e reconciliação automática.'],
    ],
  },
  {
    title: 'INTEGRAÇÕES E TEMPO REAL',
    items: [
      ['Serasa', 'Consultas de crédito e cadastro em lote, integradas ao CRM.'],
      ['Função Sistemas', 'Integrações de API com um dos sistemas mais usados do mercado financeiro.'],
      ['SOAP · XML', 'Integração com sistemas legados do mercado financeiro.'],
      ['WebSockets', 'Telas que atualizam sozinhas quando algo acontece no sistema.'],
      ['Ably', 'Mensageria em tempo real entre sistemas e telas.'],
      ['Zenvia · Twilio', 'SMS e mensagens automáticas para clientes.'],
      ['WhatsApp Cloud API', 'Bot de atendimento e avisos pelo WhatsApp.'],
      ['Node.js', 'Serviços e scripts de apoio às integrações.'],
      ['HLS', 'Streaming de vídeo adaptativo nas aulas.'],
      ['Supabase', 'Banco de dados, login e funções para aplicativos menores.'],
    ],
  },
  {
    title: 'SEGURANÇA E QUALIDADE',
    items: [
      ['Sanctum · Passport', 'Autenticação de APIs, de SPAs a integrações entre sistemas.'],
      ['JWT · OAuth2', 'Tokens e autorização entre serviços e parceiros.'],
      ['Idempotência', 'Webhooks e integrações que podem repetir sem duplicar cobranças ou registros.'],
      ['Rate limiting · locks', 'Controle de concorrência e de limites em APIs e processos críticos.'],
      ['PHPUnit · Pest', 'Testes automatizados das regras de negócio.'],
      ['OpenAPI · Swagger', 'Documentação de APIs para times e parceiros.'],
      ['SOLID · DDD', 'Código organizado por domínio, fácil de evoluir e de discutir em arquitetura.'],
    ],
  },
];
