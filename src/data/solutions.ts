export const solutions = [
  {
    title: 'Streaming de vídeo',
    text: 'Aulas em vídeo que se adaptam à conexão de cada aluno, sem travar.',
    flow: 'upload → S3 → CloudFront → player',
    tags: ['HLS', 'S3', 'CloudFront'],
  },
  {
    title: 'Conversão de vídeo',
    text: 'Vídeos enviados em qualquer formato, convertidos e preparados para streaming automaticamente.',
    flow: 'upload → fila → MediaConvert → HLS',
    tags: ['AWS MediaConvert', 'Filas'],
  },
  {
    title: 'Gateways de pagamento',
    text: 'Checkout customizado, assinaturas recorrentes, estornos e reconciliação automática por webhook.',
    flow: 'checkout → gateway → webhook → conciliação',
    tags: ['Pagar.me', 'Stripe', 'Webhooks'],
  },
  {
    title: 'Múltiplos splits',
    text: 'Cada venda dividida automaticamente entre vários recebedores, com comissões de afiliados.',
    flow: 'R$ 100 → 70 · 20 · 10',
    tags: ['Split de pagamento', 'Afiliados'],
  },
  {
    title: 'Encurtador de URL',
    text: 'Links curtos com redirecionamento próprio, criados e gerenciados pelo sistema.',
    flow: '/x7k2 → 301 → destino',
    tags: ['Redirecionamento', 'API'],
  },
  {
    title: 'Integração fiscal',
    text: 'Vendas conectadas ao processamento fiscal, sem digitação manual.',
    flow: 'venda → Speedy → fiscal',
    tags: ['Speedy', 'API'],
  },
  {
    title: 'Dados e validação',
    text: 'Consultas de crédito e cadastro pelas APIs da Serasa, com os dados do cliente direto no CRM.',
    flow: 'lote → Serasa → CRM',
    tags: ['Serasa', 'CRM'],
  },
  {
    title: 'Discador em tempo real',
    text: 'CRM integrado à plataforma de voz: discagem automática, validação de leads e a ficha do cliente pronta na tela do operador.',
    flow: 'chamada → Swoole → ficha na tela',
    tags: ['Swoole', 'WebSocket', 'Discador'],
  },
  {
    title: 'Convênios e sistemas legados',
    text: 'Gestão de convênios e integrações de API com o Função Sistemas, referência no mercado financeiro.',
    flow: 'convênio → API → Função Sistemas',
    tags: ['Convênios', 'Função Sistemas', 'APIs'],
  },
];
