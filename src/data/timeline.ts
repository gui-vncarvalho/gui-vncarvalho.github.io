export const AXIS = { from: 2020, to: 2027 };

export const YEAR_WEIGHT: Record<number, number> = { 2022: 0.85, 2023: 0.85, 2026: 3 };

const month = (year: number, m: number) => year + (m - 1) / 12;

export const timeline = [
  {
    start: 2020,
    end: 2022,
    period: '2020 — 2022',
    hash: '0000a1b',
    label: 'Técnico de TI → Dev Web',
    title: 'Técnico de TI → Desenvolvedor Web',
    body: 'Ajudou a empresa a crescer de 2 para 30 contratos; sites e e-commerce; infraestrutura física (cabeamento, racks, servidores, load balancers, CFTV).',
    stat: '2 → 30',
    statLabel: 'contratos na empresa',
    tags: ['Cabeamento', 'Racks', 'Servidores', 'Load balancers', 'CFTV', 'Sites', 'E-commerce'],
  },
  {
    start: 2022,
    end: 2024,
    period: '2022 — 2024',
    hash: '3c9d7e8',
    label: 'Junior Software Engineer',
    title: 'Junior Software Engineer',
    body: 'Evolução de plataformas educacionais legadas (Laravel, CodeIgniter, Vue.js) em vários projetos simultâneos.',
    stat: 'Vários',
    statLabel: 'projetos em paralelo',
    tags: ['Laravel', 'CodeIgniter', 'Vue.js'],
  },
  {
    start: 2024,
    end: 2026,
    period: '2024 — 2025',
    hash: '7be03d1',
    label: 'Software Engineer',
    title: 'Software Engineer · software house',
    body: 'Construiu do zero a primeira versão de uma plataforma multi-tenant de educação (arquitetura de tenancy, schema, APIs centrais) e entregou sites institucionais para clientes de saúde e educação.',
    stat: 'Vários',
    statLabel: 'projetos, da plataforma SaaS aos sites institucionais',
    tags: ['Multi-tenancy', 'Schema', 'APIs centrais', 'Sites para saúde e educação'],
  },
  {
    start: month(2026, 2),
    end: month(2026, 8),
    period: 'fev — jul 2026',
    hash: 'a41f9c2',
    label: 'Senior · SaaS',
    title: 'Senior Software Engineer · plataforma SaaS de educação online',
    body: 'Liderou a evolução da plataforma multi-tenant: APIs de pagamentos, matrículas e afiliados; reestruturação do cálculo de receita (valor do produto, taxas da plataforma, comissões e custos do gateway); CI/CD mais confiável e refatoração do legado.',
    stat: '250+',
    statLabel: 'tenants em produção quando saí',
    tags: ['Pagamentos', 'Split e comissões', 'Webhooks', 'CI/CD', 'AWS'],
  },
  {
    start: month(2026, 6),
    end: AXIS.to,
    period: 'jun 2026 — atual',
    hash: 'c0ffee1',
    label: 'Senior · Full Stack',
    title: 'Senior Full Stack Engineer · empresa do mercado financeiro',
    body: 'Integrações e automações para operações críticas: APIs da Serasa com os dados do cliente direto no CRM, integração do CRM com a plataforma de voz e o discador, fichas de atendimento automáticas, discagem automática, validação de leads, gestão de convênios e integrações de API com o Função Sistemas. Participa das discussões e da estruturação de arquitetura.',
    stat: 'CRM + voz',
    statLabel: 'discador integrado em tempo real',
    tags: ['Serasa', 'Discador', 'Swoole · WebSocket', 'Convênios', 'Função Sistemas', 'Arquitetura'],
  },
];
